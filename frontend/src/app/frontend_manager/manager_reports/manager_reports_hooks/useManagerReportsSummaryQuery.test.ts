import { describe, expect, it } from 'vitest';
import * as moduleUnderTest from "@/app/frontend_manager/manager_reports/manager_reports_hooks/useManagerReportsSummaryQuery";

describe("useManagerReportsSummaryQuery co-located hook contract", () => {
  it("exports the expected callable hook", () => {
    expect(typeof moduleUnderTest.useManagerReportsSummaryQuery).toBe("function");
  });
});
