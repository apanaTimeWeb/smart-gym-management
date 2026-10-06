// RESPONSIBILITY: Provides a non-React Admin toast API for feature hooks and global adapters without coupling them to react-hot-toast.
import { useAdminLayoutToastStore } from '@/app/frontend_admin/admin_layout/admin_layout_store/useAdminLayoutToastStore';
import type { AdminToastType } from '@/app/frontend_admin/admin_layout/admin_layout_feedback/admin_layout_feedback_types/AdminLayoutToastTypes';

export const adminToast = {
  show(message: string, type: AdminToastType, id?: string) {
    useAdminLayoutToastStore.getState().showToast(message, type, id);
  },
  success(message: string, id?: string) {
    this.show(message, 'success', id);
  },
  error(message: string, id?: string) {
    this.show(message, 'error', id);
  },
  info(message: string, id?: string) {
    this.show(message, 'info', id);
  },
  warning(message: string, id?: string) {
    this.show(message, 'warning', id);
  },
};
