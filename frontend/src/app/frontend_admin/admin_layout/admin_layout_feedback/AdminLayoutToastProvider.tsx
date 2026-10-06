// RESPONSIBILITY: Renders/orchestrates AdminLayoutToastProvider for the admin module; UI composition stays here and business/API logic remains in dedicated hooks and APIs.
"use client";
// DATA FLOW: Admin module UI → local UI state / feature hooks → approved global infrastructure or module-owned APIs.
import AdminLayoutToast from '@/app/frontend_admin/admin_layout/admin_layout_feedback/AdminLayoutToast';
import { useAdminLayoutToastStore } from '@/app/frontend_admin/admin_layout/admin_layout_store/useAdminLayoutToastStore';

/**
 * AdminLayoutToastProvider renders the admin toast provider UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 */
export function AdminLayoutToastProvider() {
  const { toast, hideToast } = useAdminLayoutToastStore();

  if (!toast) return null;

  return (
    <AdminLayoutToast
      id={toast.id}
      message={toast.message}
      type={toast.type}
      onClose={hideToast}
    />
  );
}
