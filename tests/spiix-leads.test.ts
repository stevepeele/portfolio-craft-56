import { describe, expect, it } from "bun:test";
import { hubspotSignalPayload, signalSubmissionSchema } from "../src/lib/spiix-leads";
const input={id:"3d406d9c-b3db-4135-8c91-cd7072f28e4d",name:"  Ada  Marie Lovelace ",email:"ada@example.com",company:"Example",role:"Founder",pageUrl:"https://stevepeeleii.com/spiix/signal",pageName:"Signal"};
describe("Signal delivery",()=>{
  it("splits names and sends field/context mappings",()=>{const p=hubspotSignalPayload(input);expect(p.get("firstname")).toBe("Ada");expect(p.get("lastname")).toBe("Marie Lovelace");expect(p.get("jobtitle")).toBe("Founder");expect(JSON.parse(p.get("hs_context")??"{}").pageName).toBe("Signal");});
  it("supports a single name without inventing a surname",()=>{expect(hubspotSignalPayload({...input,name:"Ada"}).get("lastname")).toBe("");});
  it("rejects malformed input",()=>{expect(signalSubmissionSchema.safeParse({...input,email:"bad"}).success).toBe(false);});
});