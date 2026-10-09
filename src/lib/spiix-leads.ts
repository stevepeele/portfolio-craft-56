import { z } from "zod";
import { signalRequestSchema } from "./spiix-access";

export const signalSubmissionSchema = signalRequestSchema.extend({
  id: z.string().uuid(),
  pageUrl: z.string().url().max(2048),
  pageName: z.string().trim().min(1).max(200),
});
export type SignalSubmission = z.infer<typeof signalSubmissionSchema>;
export const hubspotSignalEndpoint = "https://forms.hubspot.com/uploads/form/v2/22009185/22be66f6-4bd0-493e-8f01-a3d141f82297";
export function hubspotSignalPayload(input: SignalSubmission) {
  const data = signalSubmissionSchema.parse(input);
  const [firstname = "", ...rest] = data.name.split(/\s+/);
  return new URLSearchParams({ firstname, lastname: rest.join(" "), email: data.email,
    company: data.company, jobtitle: data.role,
    hs_context: JSON.stringify({ pageUrl: data.pageUrl, pageName: data.pageName }),
  });
}
export async function deliverSignalToHubspot(input: SignalSubmission) {
  const payload = hubspotSignalPayload(input);
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const response = await fetch(hubspotSignalEndpoint, {
        method: "POST", body: payload, keepalive: true,
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });
      if (response.ok) return true;
    } catch { /* Reading access never depends on delivery. */ }
  }
  return false;
}