import { describe, expect, test } from "bun:test";
import { weakestRung, rungTotals, type Score } from "../src/lib/growth-ladders-diagnostic";
import { growthLadderPayload } from "../src/lib/growth-ladders-leads";

describe("Growth Ladder diagnostic", () => {
  test("all zeros resolves to Signal", () => {
    expect(weakestRung([0, 0, 0, 0, 0, 0, 0, 0])).toBe("signal");
  });
  test("finds the lowest rung", () => {
    const s: Score[] = [2, 2, 2, 2, 0, 1, 2, 2];
    expect(rungTotals(s).systems).toBe(1);
    expect(weakestRung(s)).toBe("systems");
  });
  test("ties go to the lower rung", () => {
    expect(weakestRung([2, 2, 1, 0, 2, 2, 0, 1])).toBe("strategy");
  });
  test("payload carries rung and hides nothing extra", () => {
    const p = growthLadderPayload({ id: crypto.randomUUID(), name: "A B", email: "a@b.co", company: "C", role: "R", weakestRung: "scale", scores: [2, 2, 2, 2, 2, 2, 1, 1] });
    expect(p._subject).toBe("New Growth Ladders signup");
    expect(p.weakest_rung).toBe("scale");
  });
});
