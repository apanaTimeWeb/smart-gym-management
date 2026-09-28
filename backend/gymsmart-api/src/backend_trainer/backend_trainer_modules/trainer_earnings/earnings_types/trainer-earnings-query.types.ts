// RESPONSIBILITY: Defines typed inputs and response result contracts used by Trainer earnings query services.
// FLOW: Controller DTO/query → typed service input → repository data → frontend-facing result contract.

import type { CorePaginationMeta } from '@/backend_trainer/backend_core/core_utils/core-pagination.utils';

export interface TrainerEarningsQueryInput {
  page: number;
  limit: number;
  startDate?: string;
  endDate?: string;
  search?: string;
  sortBy: string;
  sortDirection: string;
}

export type TrainerEarningsKpiResult = {
  totalEarnings: number;
  pendingPayouts: number;
  sessionsCompleted: number;
  commissionRate: number;
  taxDeduction: number;
  bankAccount?: string;
  commissionTier: string;
  currency: string;
};

export type TrainerEarningsPendingPayoutResult = {
  id: string;
  period: string;
  amount: number;
  status: string;
  dueDate: string;
  currency: string;
};

export type TrainerEarningsHistoryResult = {
  id: string;
  date: string;
  type: string;
  description: string;
  amount: number;
  status: string;
  sessionId?: string;
  tdsDeducted?: number;
  netPayout?: number;
  invoiceNumber?: string;
  currency: string;
};


/**
 * Intent: Defines the complete earnings overview result consumed by the Trainer earnings page.
 * Edge Cases: History pagination remains authoritative and pending payouts may be empty.
 * AI Note: Keep every UI-required field explicit so the frozen API contract remains reconstructable.
 */
export type TrainerEarningsOverviewResult = {
  kpis: TrainerEarningsKpiResult;
  pendingPayouts: TrainerEarningsPendingPayoutResult[];
  history: TrainerEarningsHistoryResult[];
  historyTotal: number;
  historyPage: number;
  historyLimit: number;
  pagination: CorePaginationMeta;
};

/**
 * Intent: Defines the paginated earnings-history service result before controller serialization.
 * Edge Cases: Empty history still returns canonical pagination metadata.
 * AI Note: Do not replace this contract with an ORM result shape.
 */
export type TrainerEarningsHistoryPageResult = {
  history: TrainerEarningsHistoryResult[];
  historyTotal: number;
  pagination: CorePaginationMeta;
};
