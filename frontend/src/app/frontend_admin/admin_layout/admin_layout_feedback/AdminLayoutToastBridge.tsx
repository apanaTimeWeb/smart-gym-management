"use client";
// RESPONSIBILITY: Adapts application-level react-hot-toast success/error calls to the Admin toast surface while the Admin shell is mounted.
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { adminToast } from '@/app/frontend_admin/admin_layout/admin_layout_feedback/AdminLayoutToastService';

import type { ToastBridgeApi } from '@/app/frontend_admin/admin_layout/admin_layout_feedback/admin_layout_feedback_types/AdminLayoutToastBridgeApiTypes';
import type { AdminLayoutToastOptions } from '@/app/frontend_admin/admin_layout/admin_layout_types/AdminLayoutTypes';

/**
 * AdminLayoutToastBridge renders the admin toast bridge UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 */
export default function AdminLayoutToastBridge() {
// EFFECT: Synchronizes this component effect with its declared React dependencies in admin_layout/admin_layout_feedback/AdminLayoutToastBridge.tsx.
  useEffect(() => {
    const toastApi = toast as unknown as ToastBridgeApi;
    const originalSuccess = toastApi.success;
    const originalError = toastApi.error;

    toastApi.success = ((message: unknown, options?: AdminLayoutToastOptions) => {
      if (typeof message === 'string' && message.trim()) adminToast.success(message, options?.id);
      return options?.id ?? 'admin-success';
    }) as typeof toast.success;

    toastApi.error = ((message: unknown, options?: AdminLayoutToastOptions) => {
      if (typeof message === 'string' && message.trim()) adminToast.error(message, options?.id);
      return options?.id ?? 'admin-error';
    }) as typeof toast.error;

    return () => {
      toastApi.success = originalSuccess;
      toastApi.error = originalError;
    };
  }, []);

  return null;
}
