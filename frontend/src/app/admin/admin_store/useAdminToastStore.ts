// RESPONSIBILITY: Global store for Admin Toast notifications, enforcing deduplication via stable IDs.
import { create } from 'zustand';
import type { ToastType } from '@/app/admin/admin_components/AdminFeedback/AdminToast';

interface ToastState {
  toast: { id: string; message: string; type: ToastType } | null;
  showToast: (message: string, type: ToastType, id?: string) => void;
  hideToast: () => void;
}

export const useAdminToastStore = create<ToastState>((set) => ({
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
