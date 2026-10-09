CREATE TABLE public.spiix_signal_submissions (id uuid PRIMARY KEY, created_at timestamptz NOT NULL DEFAULT now(), name text NOT NULL, email text NOT NULL, company text NOT NULL, role text NOT NULL, page_url text NOT NULL, page_name text NOT NULL);
GRANT ALL ON public.spiix_signal_submissions TO service_role;
ALTER TABLE public.spiix_signal_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY service_only_signal_submissions ON public.spiix_signal_submissions FOR ALL TO service_role USING (true) WITH CHECK (true);