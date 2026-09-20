import type { TrainerEarningsData } from '@/app/trainer/earnings/earnings_types/TrainerEarningsTypes';

export const MOCK_EARNINGS_DATA: TrainerEarningsData = {
  kpis: {
    totalEarnings: 4550000,
    pendingPayouts: 1250000,
    sessionsCompleted: 142,
    commissionRate: 15,
    taxDeduction: 227500,
    bankAccount: '**** 4589',
    commissionTier: 'Gold',
  },
  pendingPayouts: [
    { id: '1', period: 'Sep 01 - Sep 15, 2026', amount: 1250000, status: 'processing', dueDate: 'Sep 20, 2026' },
    { id: '2', period: 'Sep 16 - Sep 30, 2026', amount: 840000, status: 'pending', dueDate: 'Oct 05, 2026' },
  ],
  history: [
    { id: 'INV-001', date: '2026-08-31', type: 'Commission', description: 'August PT Commission', amount: 2500000, status: 'settled', tdsDeducted: 125000, netPayout: 2375000, invoiceNumber: 'INV-2026-001' },
    { id: 'INV-002', date: '2026-07-31', type: 'Commission', description: 'July PT Commission', amount: 2200000, status: 'settled', tdsDeducted: 110000, netPayout: 2090000, invoiceNumber: 'INV-2026-002' },
    { id: 'BON-001', date: '2026-07-15', type: 'Bonus', description: 'Performance Bonus Q2', amount: 500000, status: 'settled', tdsDeducted: 25000, netPayout: 475000, invoiceNumber: 'INV-2026-003' },
    { id: 'INV-003', date: '2026-06-30', type: 'Commission', description: 'June PT Commission', amount: 1800000, status: 'settled', tdsDeducted: 90000, netPayout: 1710000, invoiceNumber: 'INV-2026-004' },
    { id: 'INV-004', date: '2026-05-31', type: 'Commission', description: 'May PT Commission', amount: 1950000, status: 'settled', tdsDeducted: 97500, netPayout: 1852500, invoiceNumber: 'INV-2026-005' },
  ],
};
