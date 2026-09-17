// DATA FLOW: feature API/schema → hook/context → useAdminSubscriptionsStore consumers.
// RESPONSIBILITY: Zustand store for Subscriptions UI state.
import { create } from 'zustand';
import type { AdminSubscriptionsTab } from '@/app/admin/subscriptions/subscriptions_types/AdminSubscriptionsUiTypes';

interface AdminSubscriptionsStore {
  activeTab: AdminSubscriptionsTab;
  setActiveTab: (t: AdminSubscriptionsTab) => void;
  showUpgradeConfirm: string | null;
  setShowUpgradeConfirm: (planId: string | null) => void;
}

export const useAdminSubscriptionsStore = create<AdminSubscriptionsStore>((set) => ({
  activeTab: 'overview',
  setActiveTab: (t) => set({ activeTab: t }),
  showUpgradeConfirm: null,
  setShowUpgradeConfirm: (planId) => set({ showUpgradeConfirm: planId }),
}));
