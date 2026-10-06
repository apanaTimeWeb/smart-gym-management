import { create } from 'zustand';
import type { AdminSubscriptionsStore } from '@/app/frontend_admin/admin_subscriptions/admin_subscriptions_types/AdminSubscriptionsStoreTypes';
// RESPONSIBILITY: Zustand store for Subscriptions UI state.
/**
 * @description useAdminSubscriptionsStore: Zustand store for Subscriptions UI state.
 * @dependencies Consumes AdminSubscriptionsStoreTypes, AdminSubscriptionsUiTypes.
 * @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation.
 */
export const useAdminSubscriptionsStore = create<AdminSubscriptionsStore>((set) => ({
  activeTab: 'overview',
  setActiveTab: (t) => set({ activeTab: t }),
  showUpgradeConfirm: null,
  setShowUpgradeConfirm: (planId) => set({ showUpgradeConfirm: planId }),
  currentInvoicePage: 1,
  setCurrentInvoicePage: (page) => set({ currentInvoicePage: Math.max(1, page) }),
}));
