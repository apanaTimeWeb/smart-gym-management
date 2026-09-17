// RESPONSIBILITY: Core data logic hook for the admin module.
// DATA FLOW: Centralized store/hook logic mapping API mutations and query state to UI props.
import { create } from 'zustand';
import { EMPTY_PLAN_FORM, type PlanFormValues } from '@/app/admin/plans/plans_utils/AdminPlansSharedConstants';

interface AdminPlansStore {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  editId: string | null;
  setEditId: (id: string | null) => void;
  form: PlanFormValues;
  setForm: (form: PlanFormValues) => void;
}

export const useAdminPlansStore = create<AdminPlansStore>((set) => ({
  showModal: false,
  setShowModal: (show) => set({ showModal: show }),
  editId: null,
  setEditId: (id) => set({ editId: id }),
  form: EMPTY_PLAN_FORM,
  setForm: (form) => set({ form }),
}));

