// RESPONSIBILITY: Provides a non-React Admin toast API for feature hooks and global adapters without coupling them to react-hot-toast.
import { useAdminToastStore } from '@/app/admin/admin_layout/admin_store/useAdminToastStore';
import type { AdminToastType } from '@/app/admin/admin_layout/AdminFeedback/AdminToastTypes';

export const adminToast = {
  show(message: string, type: AdminToastType, id?: string) {
    useAdminToastStore.getState().showToast(message, type, id);
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
