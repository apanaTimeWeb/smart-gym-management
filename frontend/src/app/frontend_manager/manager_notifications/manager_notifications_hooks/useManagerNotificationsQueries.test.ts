import { describe, expect, it } from 'vitest';
import * as moduleUnderTest from "@/app/frontend_manager/manager_notifications/manager_notifications_hooks/useManagerNotificationsQueries";

describe("useManagerNotificationsQueries co-located hook contract", () => {
  it("exports the expected callable hook", () => {
    expect(typeof moduleUnderTest.useManagerNotificationsQueries).toBe("function");
  });
});
