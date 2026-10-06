import { describe, expect, it, vi } from "vitest";
import React from "react";
import { renderHook } from "@testing-library/react";

vi.mock("@/app/frontend_admin/admin_hr/admin_hr_hooks/useAdminHrLogic", () => ({ useAdminHrLogic: () => ({ staff: [], totalStaff: 0, payrolls: [], totalPayrolls: 0, summary: null, status: "success", error: "", saving: false }) }));
vi.mock("@/app/frontend_admin/admin_hr/admin_hr_hooks/useAdminHrUrlState", () => ({ useAdminHrUrlState: () => ({ search:"", roleFilter:"All", branchFilter:"All", currentPage:1, payrollMonth:"2026-10", debouncedSearch:"", staffSortKey:"name", staffSortDir:"asc", payrollSortKey:"month", payrollSortDir:"asc" }) }));
vi.mock("@/app/frontend_admin/admin_hr/admin_hr_store/useAdminHrStore", () => ({ useAdminHrStore: () => ({ editId:null, showModal:false, showProfileModal:false, setShowModal:vi.fn(), setShowPayrollModal:vi.fn() }) }));
vi.mock("@/app/frontend_admin/admin_layout/admin_layout_store/useAdminLayoutToastStore", () => ({ useAdminLayoutToastStore: () => ({ showToast: vi.fn() }) }));
import { useAdminHrViewModel } from "@/app/frontend_admin/admin_hr/admin_hr_hooks/useAdminHrViewModel";

describe("useAdminHrViewModel", () => {
  it("composes UI and server state without a business React Context", () => {
    const { result } = renderHook(() => useAdminHrViewModel());
    expect(result.current.staff).toEqual([]);
    expect(result.current.showModal).toBe(false);
  });
});
