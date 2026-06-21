
CREATE OR REPLACE FUNCTION public.generate_join_code() RETURNS TEXT
LANGUAGE plpgsql SET search_path = public AS $$
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
LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  IF NEW.join_code IS NULL THEN NEW.join_code := public.generate_join_code(); END IF;
  RETURN NEW;
END $$;
