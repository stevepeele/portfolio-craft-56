import { z } from "zod";

export const signalRequestSchema = z.object({
  name: z.string().trim().min(2, "Enter your name.").max(100),
  email: z.string().trim().email("Enter a valid email address.").max(254),
  company: z.string().trim().min(1, "Enter your company.").max(120),
  role: z.string().trim().min(1, "Enter your role.").max(100),
});
export const spiixAccessKey = "spiix-monolith-access-v1";
export function hasMonolithAccess() {
  try { return window.localStorage.getItem(spiixAccessKey) === "unlocked"; }
  catch { return false; }
}
export function unlockMonolith() {
  try { window.localStorage.setItem(spiixAccessKey, "unlocked"); return true; }
  catch { return false; }
}