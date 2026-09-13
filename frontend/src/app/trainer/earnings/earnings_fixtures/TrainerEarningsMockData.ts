import type { TrainerEarningsData } from '@/app/trainer/earnings/earnings_types/TrainerEarningsTypes';

export const MOCK_EARNINGS_DATA: TrainerEarningsData = {
  kpis: {
    totalEarnings: 45500,
    pendingPayouts: 12500,
    sessionsCompleted: 142,
    commissionRate: 15,
    taxDeduction: 2275,
    bankAccount: '**** 4589',
    commissionTier: 'Gold',
  },
  pendingPayouts: [
    { id: '1', period: 'Sep 01 - Sep 15, 2026', amount: 12500, status: 'processing', dueDate: 'Sep 20, 2026' },
    { id: '2', period: 'Sep 16 - Sep 30, 2026', amount: 8400, status: 'pending', dueDate: 'Oct 05, 2026' },
  ],
  history: [
    { id: 'INV-001', date: '2026-08-31', type: 'Commission', description: 'August PT Commission', amount: 25000, status: 'settled', tdsDeducted: 1250, netPayout: 23750, invoiceNumber: 'INV-2026-001' },
    { id: 'INV-002', date: '2026-07-31', type: 'Commission', description: 'July PT Commission', amount: 22000, status: 'settled', tdsDeducted: 1100, netPayout: 20900, invoiceNumber: 'INV-2026-002' },
    { id: 'BON-001', date: '2026-07-15', type: 'Bonus', description: 'Performance Bonus Q2', amount: 5000, status: 'settled', tdsDeducted: 250, netPayout: 4750, invoiceNumber: 'INV-2026-003' },
    { id: 'INV-003', date: '2026-06-30', type: 'Commission', description: 'June PT Commission', amount: 18000, status: 'settled', tdsDeducted: 900, netPayout: 17100, invoiceNumber: 'INV-2026-004' },
    { id: 'INV-004', date: '2026-05-31', type: 'Commission', description: 'May PT Commission', amount: 19500, status: 'settled', tdsDeducted: 975, netPayout: 18525, invoiceNumber: 'INV-2026-005' },
  ],
};
