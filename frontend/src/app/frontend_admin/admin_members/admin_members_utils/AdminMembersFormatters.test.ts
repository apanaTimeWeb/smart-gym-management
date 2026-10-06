import { describe, expect, it } from "vitest";
import { formatDate, formatNumber } from "@/app/frontend_admin/admin_members/admin_members_utils/AdminMembersFormatters";

describe("AdminMembersFormatters", () => {
  it("formats numbers with the supplied locale", () => { expect(formatNumber(123456, "en-IN")).toBe("1,23,456"); });
  it("formats dates deterministically for the supplied locale", () => { expect(formatDate("2026-01-05", "en-IN")).toContain("Jan"); });
});
