import { describe, expect, it } from "vitest";
import { formatNumber } from "@/app/frontend_admin/admin_coupons/admin_coupons_utils/AdminCouponsFormatters";

describe("AdminCouponsFormatters", () => {
  it("formats numbers with the supplied locale", () => { expect(formatNumber(123456, "en-IN")).toBe("1,23,456"); });
});
