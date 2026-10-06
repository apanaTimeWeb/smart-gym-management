// RESPONSIBILITY: Global store for Admin Toast notifications, enforcing deduplication via stable IDs.
"use client";
import type { ToastState } from '@/app/frontend_admin/admin_layout/admin_layout_types/AdminLayoutToastStoreTypes';

// DATA FLOW: feature API/schema → hook/context → useAdminLayoutToastStore consumers.
import { create } from 'zustand';
import type { AdminToastType } from '@/app/frontend_admin/admin_layout/admin_layout_feedback/admin_layout_feedback_types/AdminLayoutToastTypes';
/**
 * @description useAdminLayoutToastStore: Global store for Admin Toast notifications, enforcing deduplication via stable IDs.
 * @dependencies Consumes AdminLayoutToastStoreTypes, AdminLayoutToastTypes.
 * @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation.
 */
export const useAdminLayoutToastStore = create<ToastState>((set) => ({
  toast: null,
  showToast: (message, type, id) => set((state) => {
    const stableId = id || message; // Use message as stable ID if none provided
    if (state.toast && state.toast.id === stableId) {
      return state; // Deduplicate: do not update state if identical toast is already showing
    }
    return { toast: { id: stableId, message, type } };
  }),
  hideToast: () => set({ toast: null }),
}));
