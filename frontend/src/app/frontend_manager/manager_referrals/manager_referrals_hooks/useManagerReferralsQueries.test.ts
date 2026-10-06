import { describe, expect, it } from 'vitest';
import * as moduleUnderTest from "@/app/frontend_manager/manager_referrals/manager_referrals_hooks/useManagerReferralsQueries";

describe("useManagerReferralsQueries co-located hook contract", () => {
  it("exports the expected callable hook", () => {
    expect(typeof moduleUnderTest.useManagerReferralsQueries).toBe("function");
  });
});
