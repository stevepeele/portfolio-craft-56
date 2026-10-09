import { z } from "zod";
import { signalRequestSchema } from "./spiix-access";

export const signalSubmissionSchema = signalRequestSchema.extend({
  id: z.string().uuid(),
  pageUrl: z.string().url().max(2048),
  pageName: z.string().trim().min(1).max(200),
});
export type SignalSubmission = z.infer<typeof signalSubmissionSchema>;
export const formsubmitSignalEndpoint = "https://formsubmit.co/ajax/3d3ff26bdc6ac727ee48ee558c9efc12";
export function formsubmitSignalPayload(input: SignalSubmission) {
  const data = signalSubmissionSchema.parse(input);
  return { name: data.name, email: data.email, company: data.company, role: data.role,
    _subject: "New SPIIX Signal request", _template: "table" };
}
export async function deliverSignalToFormsubmit(input: SignalSubmission) {
  const payload = JSON.stringify(formsubmitSignalPayload(input));
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const response = await fetch(formsubmitSignalEndpoint, {
        method: "POST", body: payload, keepalive: true,
        headers: { "Content-Type": "application/json", Accept: "application/json" },
      });
      if (response.ok) {
        const result: unknown = await response.json().catch(() => null);
        if (result && typeof result === "object" && "success" in result &&
          (result.success === false || result.success === "false")) continue;
        return true;
      }
    } catch { /* Reading access never depends on delivery. */ }
  }
  return false;
}