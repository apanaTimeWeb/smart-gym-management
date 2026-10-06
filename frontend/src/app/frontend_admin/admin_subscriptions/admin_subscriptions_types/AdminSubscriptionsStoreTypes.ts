// Type contract owned by this module; kept outside implementation files for AI isolation.

import type { AdminSubscriptionsTab } from '@/app/frontend_admin/admin_subscriptions/admin_subscriptions_types/AdminSubscriptionsUiTypes';
export interface AdminSubscriptionsStore {
  activeTab: AdminSubscriptionsTab;
  setActiveTab: (t: AdminSubscriptionsTab) => void;
  showUpgradeConfirm: string | null;
  setShowUpgradeConfirm: (planId: string | null) => void;
  currentInvoicePage: number;
  setCurrentInvoicePage: (page: number) => void;
}
