// Type contract owned by this module; kept outside implementation files for AI isolation.

import type { AdminToastType } from '@/app/frontend_admin/admin_layout/admin_layout_feedback/admin_layout_feedback_types/AdminLayoutToastTypes';
export interface ToastState {
  toast: { id: string; message: string; type: AdminToastType } | null;
  showToast: (message: string, type: AdminToastType, id?: string) => void;
  hideToast: () => void;
}
