import { z } from "zod";
import { signalRequestSchema } from "./spiix-access";

export const signalSubmissionSchema = signalRequestSchema.extend({
  id: z.string().uuid(),
  pageUrl: z.string().url().max(2048),
  pageName: z.string().trim().min(1).max(200),
  // Spam-guard fields (PLX-76): verified server-side in recordSignalSubmission.
  // Optional so older cached clients still validate; a missing formStartedAt
  // is treated as spam by the server check.
  honeypot: z.string().max(200).optional().default(""),
  formStartedAt: z.number().int().positive().optional(),
});
export type SignalSubmission = z.infer<typeof signalSubmissionSchema>;
export const formsubmitSignalEndpoint = "https://formsubmit.co/ajax/3d3ff26bdc6ac727ee48ee558c9efc12";
// Auto-fire autoresponse (SPIIX-632): every Signal entry fires its respective
// email back to the submitter via FormSubmit's _autoresponse.
export const signalAutoresponse = [
  "You're in — Get the Signal is open:",
  "https://stevepeeleii.com/spiix/signal",
  "",
  "Eight chapters, worked examples, illustrated frameworks, PDF included.",
  "Define the measure, read the constraint, choose the intervention, check the result.",
  "",
  "Your access is saved on the browser where you signed up. If you want to talk",
  "through what the framework says about your number, reply here — it comes straight to me.",
  "",
  "— Steve Peele II",
].join("\n");
export function formsubmitSignalPayload(input: SignalSubmission) {
  const data = signalSubmissionSchema.parse(input);
  return { name: data.name, email: data.email, company: data.company, role: data.role,
    _subject: "New SPIIX Signal request", _template: "table",
    _autoresponse: signalAutoresponse };
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