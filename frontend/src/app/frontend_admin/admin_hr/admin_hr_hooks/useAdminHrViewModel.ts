// RESPONSIBILITY: Composes Admin HR URL-backed UI state, transient Zustand UI state, TanStack Query server state, and mutation actions for views.
"use client";
import { useAdminHrLogic } from '@/app/frontend_admin/admin_hr/admin_hr_hooks/useAdminHrLogic';
import { useAdminHrUrlState } from '@/app/frontend_admin/admin_hr/admin_hr_hooks/useAdminHrUrlState';
import { useAdminHrStore } from '@/app/frontend_admin/admin_hr/admin_hr_store/useAdminHrStore';
import { useAdminLayoutToastStore } from '@/app/frontend_admin/admin_layout/admin_layout_store/useAdminLayoutToastStore';
import type { HrContextType, Staff } from '@/app/frontend_admin/admin_hr/admin_hr_types/AdminHrTypes';
import { EMPTY_STAFF } from '@/app/frontend_admin/admin_hr/admin_hr_constants/AdminHrConstants';
/**
 * @description useAdminHrViewModel composes feature UI state with server state without using React Context for business state.
 * @dependencies Consumes the owning Admin HR store, URL state, server-state logic, and approved admin layout toast infrastructure.
 * @edge-case Multiple consumers remain cache-consistent through TanStack Query while transient modal state remains shared through Zustand.
 */
export function useAdminHrViewModel(): HrContextType {
  const ui = useAdminHrStore();
  const urlState = useAdminHrUrlState();
  const { showToast } = useAdminLayoutToastStore();
  const serverState = useAdminHrLogic({ editId: ui.editId, setShowModal: ui.setShowModal, setShowPayrollModal: ui.setShowPayrollModal });
  const selectedStaff = ui.editId ? serverState.staff.find((staff: Staff) => staff.id === ui.editId) ?? null : null;
  const editData = ui.showModal ? (selectedStaff ? { ...selectedStaff, joinDate: new Date(selectedStaff.joinDate).toISOString().split('T')[0] } : { ...EMPTY_STAFF }) : null;
  const viewProfileData = ui.showProfileModal ? selectedStaff : null;
  return { ...ui, ...urlState, ...serverState, editData, viewProfileData, showToast };
}
