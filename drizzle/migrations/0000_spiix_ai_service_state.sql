CREATE TABLE public.spiix_ai_service_state (
 service text PRIMARY KEY,
 status integer NOT NULL DEFAULT 403,
 message text NOT NULL,
 updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.spiix_ai_service_state TO service_role;
REVOKE ALL ON public.spiix_ai_service_state FROM anon, authenticated;
ALTER TABLE public.spiix_ai_service_state ENABLE ROW LEVEL SECURITY;
COMMENT ON TABLE public.spiix_ai_service_state IS 'Server-only AI access circuit breaker; contains no visitor challenges. Clear only after provider access is restored.';