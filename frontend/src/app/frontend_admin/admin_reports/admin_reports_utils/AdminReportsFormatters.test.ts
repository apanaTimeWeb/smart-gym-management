import { describe, expect, it } from "vitest";
import { formatNumber, formatPercent1dp } from "@/app/frontend_admin/admin_reports/admin_reports_utils/AdminReportsFormatters";

describe("AdminReportsFormatters", () => {
  it("formats numbers with the supplied locale", () => { expect(formatNumber(123456, "en-IN")).toBe("1,23,456"); });
  it("formats one-decimal percentages without inventing a symbol", () => { expect(formatPercent1dp(12.34, "en-IN")).toBe("12.3"); });
});
