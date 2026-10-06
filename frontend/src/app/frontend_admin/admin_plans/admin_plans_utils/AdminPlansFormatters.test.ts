import { describe, expect, it } from "vitest";
import { formatKPI, formatNumber, formatPercent1dp } from "@/app/frontend_admin/admin_plans/admin_plans_utils/AdminPlansFormatters";

describe("AdminPlansFormatters", () => {
  it("formats numbers with the supplied locale", () => { expect(formatNumber(123456, "en-IN")).toBe("1,23,456"); });
  it("formats one-decimal percentages without inventing a symbol", () => { expect(formatPercent1dp(12.34, "en-IN")).toBe("12.3"); });
  it("formats KPI values compactly", () => { expect(formatKPI(125000, "en-IN")).toMatch(/125/); });
});
