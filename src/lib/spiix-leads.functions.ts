import { createServerFn } from "@tanstack/react-start";
import { setResponseHeader } from "@tanstack/react-start/server";
import { signalSubmissionSchema } from "./spiix-leads";

export const recordSignalSubmission = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => signalSubmissionSchema.parse(input))
  .handler(async ({ data }) => {
    setResponseHeader("Cache-Control", "no-store");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("spiix_signal_submissions").upsert({
      id: data.id, name: data.name, email: data.email, company: data.company,
      role: data.role, page_url: data.pageUrl, page_name: data.pageName,
    }, { onConflict: "id", ignoreDuplicates: true });
    if (error) { console.error("Signal record failed", error.code); return { stored: false }; }
    return { stored: true };
  });