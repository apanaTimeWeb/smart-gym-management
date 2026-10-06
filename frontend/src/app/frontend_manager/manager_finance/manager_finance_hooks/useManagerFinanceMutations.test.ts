import { describe, expect, it } from 'vitest';
import * as moduleUnderTest from "@/app/frontend_manager/manager_finance/manager_finance_hooks/useManagerFinanceMutations";

describe("useManagerFinanceMutations co-located hook contract", () => {
  it("exports the expected callable hook", () => {
    expect(typeof moduleUnderTest.useManagerFinanceMutations).toBe("function");
  });
});
