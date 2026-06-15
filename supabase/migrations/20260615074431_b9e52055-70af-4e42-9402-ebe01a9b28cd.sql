
-- 1. Teacher subjects (what each teacher teaches: subject + grade pairs)
CREATE TABLE public.teacher_subjects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  subject TEXT NOT NULL,
  grade INT NOT NULL CHECK (grade BETWEEN 6 AND 12),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (teacher_id, subject, grade)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.teacher_subjects TO authenticated;
GRANT ALL ON public.teacher_subjects TO service_role;
ALTER TABLE public.teacher_subjects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Teachers manage their subjects" ON public.teacher_subjects FOR ALL TO authenticated
  USING (teacher_id = auth.uid()) WITH CHECK (teacher_id = auth.uid());
CREATE POLICY "Anyone authenticated can view teacher subjects" ON public.teacher_subjects FOR SELECT TO authenticated USING (true);

-- 2. Add join code to teacher_courses
ALTER TABLE public.teacher_courses ADD COLUMN IF NOT EXISTS join_code TEXT UNIQUE;

CREATE OR REPLACE FUNCTION public.generate_join_code() RETURNS TEXT
LANGUAGE plpgsql AS $$
DECLARE code TEXT; exists_check INT;
BEGIN
  LOOP
    code := upper(substr(md5(random()::text || clock_timestamp()::text), 1, 6));
    SELECT count(*) INTO exists_check FROM public.teacher_courses WHERE join_code = code;
    EXIT WHEN exists_check = 0;
  END LOOP;
  RETURN code;
END $$;

CREATE OR REPLACE FUNCTION public.set_course_join_code() RETURNS TRIGGER
LANGUAGE plpgsql AS $$
BEGIN
  IF NEW.join_code IS NULL THEN NEW.join_code := public.generate_join_code(); END IF;
  RETURN NEW;
END $$;

CREATE TRIGGER trg_set_course_join_code BEFORE INSERT ON public.teacher_courses
  FOR EACH ROW EXECUTE FUNCTION public.set_course_join_code();

-- Backfill existing courses
UPDATE public.teacher_courses SET join_code = public.generate_join_code() WHERE join_code IS NULL;

-- 3. Modules (a course has many modules; modules contain lessons)
CREATE TABLE public.teacher_modules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID NOT NULL REFERENCES public.teacher_courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  position INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.teacher_modules TO authenticated;
GRANT ALL ON public.teacher_modules TO service_role;
ALTER TABLE public.teacher_modules ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Teachers manage own course modules" ON public.teacher_modules FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM public.teacher_courses c WHERE c.id = course_id AND c.teacher_id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM public.teacher_courses c WHERE c.id = course_id AND c.teacher_id = auth.uid()));
CREATE POLICY "Enrolled students view modules" ON public.teacher_modules FOR SELECT TO authenticated
  USING (
    EXISTS (SELECT 1 FROM public.course_enrollments e WHERE e.course_id = teacher_modules.course_id AND e.student_id = auth.uid())
    OR EXISTS (SELECT 1 FROM public.teacher_courses c WHERE c.id = teacher_modules.course_id AND c.published = true)
  );

-- 4. Add module_id to lessons (nullable for backwards compat)
ALTER TABLE public.teacher_lessons ADD COLUMN IF NOT EXISTS module_id UUID REFERENCES public.teacher_modules(id) ON DELETE SET NULL;

-- 5. Practice questions (curated subject question bank, public to all authenticated students)
CREATE TABLE public.practice_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subject TEXT NOT NULL,
  grade INT NOT NULL CHECK (grade BETWEEN 6 AND 12),
  topic TEXT,
  difficulty TEXT NOT NULL DEFAULT 'medium',
  question TEXT NOT NULL,
  options JSONB NOT NULL,
  correct_index INT NOT NULL,
  explanation TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.practice_questions TO authenticated, anon;
GRANT ALL ON public.practice_questions TO service_role;
ALTER TABLE public.practice_questions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read practice questions" ON public.practice_questions FOR SELECT USING (true);

-- 6. Practice attempts (track student practice)
CREATE TABLE public.practice_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  subject TEXT NOT NULL,
  grade INT NOT NULL,
  score INT NOT NULL,
  total INT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.practice_attempts TO authenticated;
GRANT ALL ON public.practice_attempts TO service_role;
ALTER TABLE public.practice_attempts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Students manage own attempts" ON public.practice_attempts FOR ALL TO authenticated
  USING (student_id = auth.uid()) WITH CHECK (student_id = auth.uid());
