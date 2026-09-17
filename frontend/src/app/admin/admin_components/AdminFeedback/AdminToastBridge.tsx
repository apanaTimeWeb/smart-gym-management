"use client";
// RESPONSIBILITY: Adapts application-level react-hot-toast success/error calls to the Admin toast surface while the Admin shell is mounted.
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { adminToast } from '@/app/admin/admin_components/AdminFeedback/AdminToastService';

type ToastBridgeApi = {
  success: typeof toast.success;
  error: typeof toast.error;
};

export default function AdminToastBridge() {
  useEffect(() => {
    const toastApi = toast as unknown as ToastBridgeApi;
    const originalSuccess = toastApi.success;
    const originalError = toastApi.error;

    toastApi.success = ((message: unknown, options?: { id?: string }) => {
      adminToast.success(typeof message === 'string' ? message : 'Action completed.', options?.id);
      return options?.id ?? 'admin-success';
    }) as typeof toast.success;

    toastApi.error = ((message: unknown, options?: { id?: string }) => {
      adminToast.error(typeof message === 'string' ? message : 'Something went wrong.', options?.id);
      return options?.id ?? 'admin-error';
    }) as typeof toast.error;

    return () => {
      toastApi.success = originalSuccess;
      toastApi.error = originalError;
    };
  }, []);

  return null;
}
