import { describe, expect, it, spyOn } from "bun:test";
import { deliverSignalToFormsubmit, formsubmitSignalEndpoint, formsubmitSignalPayload, signalSubmissionSchema } from "../src/lib/spiix-leads";
const input={id:"3d406d9c-b3db-4135-8c91-cd7072f28e4d",name:"  Ada  Marie Lovelace ",email:"ada@example.com",company:"Example",role:"Founder",pageUrl:"https://stevepeeleii.com/spiix/signal",pageName:"Signal"};
describe("Signal delivery",()=>{
  it("sends only the requested email fields and template",()=>{expect(formsubmitSignalPayload(input)).toEqual({name:"Ada  Marie Lovelace",email:"ada@example.com",company:"Example",role:"Founder",_subject:"New SPIIX Signal request",_template:"table"});});
  it("preserves a single name",()=>{expect(formsubmitSignalPayload({...input,name:"Ada"}).name).toBe("Ada");});
  it("rejects malformed input",()=>{expect(signalSubmissionSchema.safeParse({...input,email:"bad"}).success).toBe(false);});
  it("posts JSON without retrying a successful delivery",async()=>{
    const request=spyOn(globalThis,"fetch").mockResolvedValue(new Response(null,{status:200}));
    try{expect(await deliverSignalToFormsubmit(input)).toBe(true);expect(request).toHaveBeenCalledTimes(1);expect(request).toHaveBeenCalledWith(formsubmitSignalEndpoint,{method:"POST",body:JSON.stringify(formsubmitSignalPayload(input)),keepalive:true,headers:{"Content-Type":"application/json",Accept:"application/json"}});}finally{request.mockRestore();}
  });
  it("silently retries one HTTP failure",async()=>{
    const request=spyOn(globalThis,"fetch").mockResolvedValueOnce(new Response(null,{status:500})).mockResolvedValueOnce(new Response(null,{status:200}));
    try{expect(await deliverSignalToFormsubmit(input)).toBe(true);expect(request).toHaveBeenCalledTimes(2);}finally{request.mockRestore();}
  });
  it("stops silently after two network failures",async()=>{
    const request=spyOn(globalThis,"fetch").mockRejectedValue(new TypeError("Network unavailable"));
    try{expect(await deliverSignalToFormsubmit(input)).toBe(false);expect(request).toHaveBeenCalledTimes(2);}finally{request.mockRestore();}
  });
});