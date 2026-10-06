// Type contract owned by this module; kept outside implementation files for AI isolation.

import type { PayoutTab } from '@/app/frontend_admin/admin_payouts/admin_payouts_types/AdminPayoutsTypes';
export interface AdminPayoutsStore {
  activeTab: PayoutTab;
  setActiveTab: (t: PayoutTab) => void;
  monthFilter: string;
  setMonthFilter: (m: string) => void;
  gymFilter: string;
  setGymFilter: (g: string) => void;
  statusFilter: string;
  setStatusFilter: (s: string) => void;
  currentPage: number;
  setCurrentPage: (p: number) => void;
}
