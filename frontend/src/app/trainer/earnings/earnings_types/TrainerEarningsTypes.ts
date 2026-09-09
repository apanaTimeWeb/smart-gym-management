export interface TrainerEarningsKPIsData {
  totalEarnings: number;
  pendingPayouts: number;
  sessionsCompleted: number;
  commissionRate: number;
  taxDeduction?: number;
  bankAccount?: string;
  commissionTier?: string;
}

export type PayoutStatus = 'pending' | 'processing' | 'settled';

export interface TrainerPendingPayout {
  id: string;
  period: string;
  amount: number;
  status: PayoutStatus;
  dueDate: string;
}

export interface TrainerEarningsHistoryRow {
  id: string;
  date: string;
  type: 'Session' | 'Bonus' | 'Commission';
  description: string;
  amount: number;
  status: PayoutStatus;
}

export interface TrainerEarningsContextType {
  kpis: TrainerEarningsKPIsData | null;
  pendingPayouts: TrainerPendingPayout[];
  paginatedHistory: TrainerEarningsHistoryRow[];
  fetchState: 'idle' | 'loading' | 'success' | 'error';
  error: string;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
  search: string;
  setSearch: (search: string) => void;
  loadAll: () => Promise<void>;
}
