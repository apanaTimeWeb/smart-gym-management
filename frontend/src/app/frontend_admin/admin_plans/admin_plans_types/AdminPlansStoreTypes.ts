// Type contract owned by this module; kept outside implementation files for AI isolation.

import type { PlanFormValues } from '@/app/frontend_admin/admin_plans/admin_plans_types/AdminPlansTypes';
export interface AdminPlansStore {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  editId: string | null;
  setEditId: (id: string | null) => void;
  form: PlanFormValues;
  setForm: (form: PlanFormValues) => void;
}
