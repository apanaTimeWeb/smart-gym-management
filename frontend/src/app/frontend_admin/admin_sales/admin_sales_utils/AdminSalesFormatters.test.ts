import { describe, expect, it } from "vitest";
import { formatDate, formatKPI, formatNumber } from "@/app/frontend_admin/admin_sales/admin_sales_utils/AdminSalesFormatters";

describe("AdminSalesFormatters", () => {
  it("formats numbers with the supplied locale", () => { expect(formatNumber(123456, "en-IN")).toBe("1,23,456"); });
  it("formats KPI values compactly", () => { expect(formatKPI(125000, "en-IN")).toMatch(/125/); });
});

it('formats dates using the requested locale', () => { expect(formatDate('2026-01-05T00:00:00Z', 'en-IN')).toMatch(/05 Jan 2026|5 Jan 2026/); });
