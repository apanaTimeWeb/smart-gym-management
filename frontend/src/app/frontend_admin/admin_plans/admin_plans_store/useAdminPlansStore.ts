import { create } from 'zustand';
import type { AdminPlansStore } from '@/app/frontend_admin/admin_plans/admin_plans_types/AdminPlansStoreTypes';
import { EMPTY_PLAN_FORM } from '@/app/frontend_admin/admin_plans/admin_plans_constants/AdminPlansConstants';
// RESPONSIBILITY: Core data logic hook for the admin module.
/**
 * @description useAdminPlansStore: Core data logic hook for the admin module.
 * @dependencies Consumes AdminPlansStoreTypes, AdminPlansConstants, AdminPlansTypes.
 * @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation.
 */
export const useAdminPlansStore = create<AdminPlansStore>((set) => ({
  showModal: false,
  setShowModal: (show) => set({ showModal: show }),
  editId: null,
  setEditId: (id) => set({ editId: id }),
  form: EMPTY_PLAN_FORM,
  setForm: (form) => set({ form }),
}));

