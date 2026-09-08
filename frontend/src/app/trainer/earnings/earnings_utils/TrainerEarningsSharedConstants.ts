import type { TrainerEarningsKPIsData, TrainerPendingPayout, TrainerEarningsHistoryRow } from '@/app/trainer/earnings/earnings_types/TrainerEarningsTypes';

export const EARNINGS_ITEMS_PER_PAGE = 10;

export const MOCK_EARNINGS_KPIS: TrainerEarningsKPIsData = {
  totalEarnings: 45000,
  pendingPayouts: 12500,
  sessionsCompleted: 42,
  commissionRate: 35,
};

export const MOCK_PENDING_PAYOUTS: TrainerPendingPayout[] = [
  { id: 'p_1', period: 'Sep 01 - Sep 15, 2024', amount: 12500, status: 'pending', dueDate: '2024-09-20' },
];

export const MOCK_EARNINGS_HISTORY: TrainerEarningsHistoryRow[] = [
  { id: 'h_1', date: '2024-09-08T10:00:00Z', type: 'Session', description: 'PT Session - John Doe', amount: 500, status: 'settled' },
  { id: 'h_2', date: '2024-09-07T14:00:00Z', type: 'Session', description: 'PT Session - Jane Smith', amount: 500, status: 'settled' },
  { id: 'h_3', date: '2024-09-01T00:00:00Z', type: 'Bonus', description: 'Monthly Target Bonus', amount: 5000, status: 'settled' },
  { id: 'h_4', date: '2024-08-30T10:00:00Z', type: 'Session', description: 'PT Session - John Doe', amount: 500, status: 'settled' },
  { id: 'h_5', date: '2024-08-29T10:00:00Z', type: 'Session', description: 'PT Session - John Doe', amount: 500, status: 'settled' },
  { id: 'h_6', date: '2024-08-28T10:00:00Z', type: 'Session', description: 'PT Session - John Doe', amount: 500, status: 'settled' },
  { id: 'h_7', date: '2024-08-27T10:00:00Z', type: 'Session', description: 'PT Session - John Doe', amount: 500, status: 'settled' },
];

export const PAYOUT_STATUS_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  pending: { bg: 'bg-warning/10', text: 'text-warning', label: 'Pending' },
  processing: { bg: 'bg-info/10', text: 'text-info', label: 'Processing' },
  settled: { bg: 'bg-success/10', text: 'text-success', label: 'Settled' },
};
