import { describe, expect, it } from 'vitest';
import * as moduleUnderTest from "@/app/frontend_manager/manager_pt/manager_pt_hooks/useManagerPtQueries";

describe("useManagerPtQueries co-located hook contract", () => {
  it("exports the expected callable hook", () => {
    expect(typeof moduleUnderTest.useManagerPtQueries).toBe("function");
  });
});
