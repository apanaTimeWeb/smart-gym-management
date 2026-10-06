import { describe, expect, it } from "vitest";
import { formatDate, formatNumber } from "@/app/frontend_admin/admin_announcements/admin_announcements_utils/AdminAnnouncementsFormatters";

describe("AdminAnnouncementsFormatters", () => {
  it("formats numbers with the supplied locale", () => { expect(formatNumber(123456, "en-IN")).toBe("1,23,456"); });
});

it('formats dates using the requested locale', () => { expect(formatDate('2026-01-05T00:00:00Z', 'en-IN')).toMatch(/05 Jan|5 Jan/); });
