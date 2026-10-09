import { describe, expect, test } from "bun:test";
import { velocityScenario, impactScenario } from "./spiix-models";
import { signalRequestSchema } from "./spiix-access";
describe("SPIIX instruments", () => {
  test("zero lift preserves baseline", () => {
    expect(velocityScenario(0, 100).total).toBe(24_000_000);
    expect(velocityScenario(100, 0).uplift).toBe(0);
    expect(impactScenario(100_000, 0, 12).incremental).toBe(0);
  });
  test("velocity uses adoption-weighted lift", () => {
    const model=velocityScenario(20,100);
    expect(model.total).toBe(26_600_000);
    expect(model.adoptionValues[12]).toBe(100);
  });
  test("24 month uplift excludes month zero", () => {
    const model=impactScenario(100_000,20,12);
    expect(model.final).toBe(120_000);
    expect(model.incremental).toBeCloseTo(370_000);
    expect(model.monthly).toHaveLength(25);
  });
  test("faster ramp realizes more value without changing final revenue", () => {
    const fast=impactScenario(100_000,20,3),slow=impactScenario(100_000,20,12);
    expect(fast.incremental).toBeGreaterThan(slow.incremental);
    expect(fast.final).toBe(slow.final);
  });
  test("gate trims input and rejects invalid values", () => {
    expect(signalRequestSchema.safeParse({name:" ",email:"invalid",company:"X",role:"Y"}).success).toBe(false);
    expect(signalRequestSchema.parse({name:" Steve ",email:"steve@example.com",company:"Team",role:"Founder"}).name).toBe("Steve");
    expect(signalRequestSchema.safeParse({name:"A".repeat(101),email:"steve@example.com",company:"Team",role:"Founder"}).success).toBe(false);
  });
});