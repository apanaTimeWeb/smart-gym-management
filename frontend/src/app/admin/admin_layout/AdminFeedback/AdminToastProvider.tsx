"use client";
// DATA FLOW: Admin module UI → local UI state / feature hooks → approved global infrastructure or module-owned APIs.
// RESPONSIBILITY: Renders/orchestrates AdminToastProvider for the admin module; UI composition stays here and business/API logic remains in dedicated hooks and APIs.
import AdminToast from '@/app/admin/admin_layout/AdminFeedback/AdminToast';
import { useAdminToastStore } from '@/app/admin/admin_layout/admin_store/useAdminToastStore';

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
