import { describe, expect, it } from "vitest";
import { formatDate, formatKPI, formatNumber, formatWeekday } from "@/app/frontend_admin/admin_dashboard/admin_dashboard_utils/AdminDashboardFormatters";

describe("AdminDashboardFormatters", () => {
  it("formats numbers with the supplied locale", () => { expect(formatNumber(123456, "en-IN")).toBe("1,23,456"); });
  it("formats KPI values compactly", () => { expect(formatKPI(125000, "en-IN")).toMatch(/125/); });
});

it('formats dates and weekdays using the requested locale', () => { expect(formatDate('2026-01-05T00:00:00Z', 'en-IN')).toMatch(/05 Jan 2026|5 Jan 2026/); expect(formatWeekday('2026-01-05T00:00:00Z', 'en-IN')).toMatch(/[A-Za-z]{3}/); });
