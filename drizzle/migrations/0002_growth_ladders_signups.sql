CREATE TABLE public.growth_ladders_signups (
  id uuid PRIMARY KEY,
  created_at timestamptz NOT NULL DEFAULT now(),
  name text NOT NULL,
  email text NOT NULL,
  company text NOT NULL,
  role text NOT NULL,
  weakest_rung text,
  scores jsonb
);
GRANT ALL ON public.growth_ladders_signups TO service_role;
ALTER TABLE public.growth_ladders_signups ENABLE ROW LEVEL SECURITY;
CREATE POLICY service_only_growth_ladders_signups ON public.growth_ladders_signups FOR ALL TO service_role USING (true) WITH CHECK (true);