
-- ============ ROLES ============
CREATE TYPE public.app_role AS ENUM ('student', 'teacher', 'admin');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE OR REPLACE FUNCTION public.get_my_role()
RETURNS public.app_role LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT role FROM public.user_roles WHERE user_id = auth.uid() ORDER BY
    CASE role WHEN 'admin' THEN 1 WHEN 'teacher' THEN 2 ELSE 3 END LIMIT 1
$$;

CREATE POLICY "Users view own roles" ON public.user_roles FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Admins view all roles" ON public.user_roles FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Users insert own initial role" ON public.user_roles FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());
CREATE POLICY "Admins manage roles" ON public.user_roles FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- ============ PROFILE updates: add role column for convenience read ============
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS bio text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS school text;

-- update handle_new_user to also insert role from metadata
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  _role public.app_role;
BEGIN
  INSERT INTO public.profiles (id, full_name, grade)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    NULLIF(NEW.raw_user_meta_data->>'grade','')::INT
  );
  _role := COALESCE(NULLIF(NEW.raw_user_meta_data->>'role',''), 'student')::public.app_role;
  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, _role) ON CONFLICT DO NOTHING;
  RETURN NEW;
END;
$$;

-- ensure trigger exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============ TEACHER COURSES ============
CREATE TABLE public.teacher_courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  subject text NOT NULL,
  grade int NOT NULL,
  description text,
  cover_emoji text DEFAULT '📚',
  published boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.teacher_courses TO authenticated;
GRANT ALL ON public.teacher_courses TO service_role;
ALTER TABLE public.teacher_courses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone views published" ON public.teacher_courses FOR SELECT TO authenticated USING (published = true OR teacher_id = auth.uid() OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "Teachers create courses" ON public.teacher_courses FOR INSERT TO authenticated WITH CHECK (teacher_id = auth.uid() AND public.has_role(auth.uid(),'teacher'));
CREATE POLICY "Teachers update own" ON public.teacher_courses FOR UPDATE TO authenticated USING (teacher_id = auth.uid()) WITH CHECK (teacher_id = auth.uid());
CREATE POLICY "Teachers delete own" ON public.teacher_courses FOR DELETE TO authenticated USING (teacher_id = auth.uid());
CREATE POLICY "Admins manage all" ON public.teacher_courses FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- ============ COURSE LESSONS ============
CREATE TABLE public.teacher_lessons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid NOT NULL REFERENCES public.teacher_courses(id) ON DELETE CASCADE,
  title text NOT NULL,
  content text,
  video_url text,
  position int NOT NULL DEFAULT 0,
  duration_min int DEFAULT 10,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.teacher_lessons TO authenticated;
GRANT ALL ON public.teacher_lessons TO service_role;
ALTER TABLE public.teacher_lessons ENABLE ROW LEVEL SECURITY;
CREATE POLICY "View lessons of accessible courses" ON public.teacher_lessons FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.teacher_courses c WHERE c.id = course_id AND (c.published = true OR c.teacher_id = auth.uid() OR public.has_role(auth.uid(),'admin'))));
CREATE POLICY "Teachers manage own lessons" ON public.teacher_lessons FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM public.teacher_courses c WHERE c.id = course_id AND c.teacher_id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM public.teacher_courses c WHERE c.id = course_id AND c.teacher_id = auth.uid()));

-- ============ QUIZZES ============
CREATE TABLE public.teacher_quizzes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id uuid NOT NULL REFERENCES public.teacher_lessons(id) ON DELETE CASCADE,
  question text NOT NULL,
  options jsonb NOT NULL,
  correct_index int NOT NULL,
  explanation text,
  position int NOT NULL DEFAULT 0
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.teacher_quizzes TO authenticated;
GRANT ALL ON public.teacher_quizzes TO service_role;
ALTER TABLE public.teacher_quizzes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "View quizzes of accessible lessons" ON public.teacher_quizzes FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.teacher_lessons l JOIN public.teacher_courses c ON c.id = l.course_id WHERE l.id = lesson_id AND (c.published OR c.teacher_id = auth.uid() OR public.has_role(auth.uid(),'admin'))));
CREATE POLICY "Teachers manage own quizzes" ON public.teacher_quizzes FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM public.teacher_lessons l JOIN public.teacher_courses c ON c.id = l.course_id WHERE l.id = lesson_id AND c.teacher_id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM public.teacher_lessons l JOIN public.teacher_courses c ON c.id = l.course_id WHERE l.id = lesson_id AND c.teacher_id = auth.uid()));

-- ============ ENROLLMENTS (teacher courses) ============
CREATE TABLE public.course_enrollments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid NOT NULL REFERENCES public.teacher_courses(id) ON DELETE CASCADE,
  student_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (course_id, student_id)
);
GRANT SELECT, INSERT, DELETE ON public.course_enrollments TO authenticated;
GRANT ALL ON public.course_enrollments TO service_role;
ALTER TABLE public.course_enrollments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Students view own enrollments" ON public.course_enrollments FOR SELECT TO authenticated USING (student_id = auth.uid());
CREATE POLICY "Teachers view their course enrollments" ON public.course_enrollments FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.teacher_courses c WHERE c.id = course_id AND c.teacher_id = auth.uid()));
CREATE POLICY "Admins view all enrollments" ON public.course_enrollments FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Students enroll themselves" ON public.course_enrollments FOR INSERT TO authenticated WITH CHECK (student_id = auth.uid());
CREATE POLICY "Students unenroll themselves" ON public.course_enrollments FOR DELETE TO authenticated USING (student_id = auth.uid());

-- ============ QUIZ ATTEMPTS ============
CREATE TABLE public.quiz_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id uuid NOT NULL REFERENCES public.teacher_lessons(id) ON DELETE CASCADE,
  score int NOT NULL,
  total int NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.quiz_attempts TO authenticated;
GRANT ALL ON public.quiz_attempts TO service_role;
ALTER TABLE public.quiz_attempts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Students view own attempts" ON public.quiz_attempts FOR SELECT TO authenticated USING (student_id = auth.uid());
CREATE POLICY "Teachers view attempts on their lessons" ON public.quiz_attempts FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.teacher_lessons l JOIN public.teacher_courses c ON c.id = l.course_id WHERE l.id = lesson_id AND c.teacher_id = auth.uid()));
CREATE POLICY "Students insert own attempts" ON public.quiz_attempts FOR INSERT TO authenticated WITH CHECK (student_id = auth.uid());

-- ============ GAME SCORES ============
CREATE TABLE public.game_scores (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  game_slug text NOT NULL,
  score int NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.game_scores TO authenticated;
GRANT ALL ON public.game_scores TO service_role;
ALTER TABLE public.game_scores ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Everyone reads scores" ON public.game_scores FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users insert own scores" ON public.game_scores FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());

-- updated_at trigger for teacher_courses
CREATE OR REPLACE FUNCTION public.tg_set_updated_at() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;
CREATE TRIGGER trg_teacher_courses_updated BEFORE UPDATE ON public.teacher_courses
  FOR EACH ROW EXECUTE FUNCTION public.tg_set_updated_at();
