import { describe, expect, it } from 'vitest';
import * as moduleUnderTest from "@/app/frontend_manager/manager_finance/manager_finance_hooks/useManagerFinancePaymentForm";

describe("useManagerFinancePaymentForm co-located hook contract", () => {
  it("exports the expected callable hook", () => {
    expect(typeof moduleUnderTest.useManagerFinancePaymentForm).toBe("function");
  });
});
