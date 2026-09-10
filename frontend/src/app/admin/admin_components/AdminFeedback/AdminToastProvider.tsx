'use client';

import AdminToast from '@/app/admin/admin_components/AdminFeedback/AdminToast';
import { useAdminToastStore } from '@/app/admin/admin_store/useAdminToastStore';

export function AdminToastProvider() {
  const { toast, hideToast } = useAdminToastStore();

  if (!toast) return null;

  return (
    <AdminToast
      id={toast.id}
      message={toast.message}
      type={toast.type}
      onClose={hideToast}
    />
  );
}
