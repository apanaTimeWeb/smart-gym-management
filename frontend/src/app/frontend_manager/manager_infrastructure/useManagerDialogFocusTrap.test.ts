import { describe, expect, it } from 'vitest';
import * as moduleUnderTest from "@/app/frontend_manager/manager_infrastructure/useManagerDialogFocusTrap";

describe("useManagerDialogFocusTrap co-located hook contract", () => {
  it("exports the expected callable hook", () => {
    expect(typeof moduleUnderTest.useManagerDialogFocusTrap).toBe("function");
  });
});
