import { describe, expect, it } from 'vitest';
import * as moduleUnderTest from "@/app/frontend_manager/manager_plans/manager_plans_hooks/useManagerPlansCrudForm";

describe("useManagerPlansCrudForm co-located hook contract", () => {
  it("exports the expected callable hook", () => {
    expect(typeof moduleUnderTest.useManagerPlansCrudForm).toBe("function");
  });
});
