import { TRAINER_EARNINGS_LEDGER_ENTRY_TYPES, TRAINER_EARNINGS_PAYOUT_STATUS_VALUES } from '@/app/frontend_trainer/trainer_earnings/trainer_earnings_constants/TrainerEarningsConstants';

import type { TrainerEarningsData } from '@/app/frontend_trainer/trainer_earnings/trainer_earnings_types/TrainerEarningsTypes';




export const TRAINER_EARNINGS_MOCK_EARNINGS_DATA: TrainerEarningsData = {
  kpis: {
    totalEarnings: 4550000,
    currency: 'INR',
    pendingPayouts: 1250000,
    sessionsCompleted: 142,
    commissionRate: 15,
    taxDeduction: 227500,
    bankAccount: '**** 4589',
    commissionTier: 'Gold',
  },
  pendingPayouts: [
    { id: '1', period: 'Sep 01 - Sep 15, 2026', amount: 1250000, currency: 'INR', status: TRAINER_EARNINGS_PAYOUT_STATUS_VALUES[1], dueDate: 'Sep 20, 2026' },
    { id: '2', period: 'Sep 16 - Sep 30, 2026', amount: 840000, currency: 'INR', status: TRAINER_EARNINGS_PAYOUT_STATUS_VALUES[0], dueDate: 'Oct 05, 2026' },
  ],
  history: [
    { id: 'INV-001', date: '2026-08-31', type: TRAINER_EARNINGS_LEDGER_ENTRY_TYPES[2], description: 'August PT Commission', amount: 2500000, currency: 'INR', status: TRAINER_EARNINGS_PAYOUT_STATUS_VALUES[2], tdsDeducted: 125000, netPayout: 2375000, invoiceNumber: 'INV-2026-001' },
    { id: 'INV-002', date: '2026-07-31', type: TRAINER_EARNINGS_LEDGER_ENTRY_TYPES[2], description: 'July PT Commission', amount: 2200000, currency: 'INR', status: TRAINER_EARNINGS_PAYOUT_STATUS_VALUES[2], tdsDeducted: 110000, netPayout: 2090000, invoiceNumber: 'INV-2026-002' },
    { id: 'BON-001', date: '2026-07-15', type: TRAINER_EARNINGS_LEDGER_ENTRY_TYPES[1], description: 'Performance Bonus Q2', amount: 500000, currency: 'INR', status: TRAINER_EARNINGS_PAYOUT_STATUS_VALUES[2], tdsDeducted: 25000, netPayout: 475000, invoiceNumber: 'INV-2026-003' },
    { id: 'INV-003', date: '2026-06-30', type: TRAINER_EARNINGS_LEDGER_ENTRY_TYPES[2], description: 'June PT Commission', amount: 1800000, currency: 'INR', status: TRAINER_EARNINGS_PAYOUT_STATUS_VALUES[2], tdsDeducted: 90000, netPayout: 1710000, invoiceNumber: 'INV-2026-004' },
    { id: 'INV-004', date: '2026-05-31', type: TRAINER_EARNINGS_LEDGER_ENTRY_TYPES[2], description: 'May PT Commission', amount: 1950000, currency: 'INR', status: TRAINER_EARNINGS_PAYOUT_STATUS_VALUES[2], tdsDeducted: 97500, netPayout: 1852500, invoiceNumber: 'INV-2026-005' },
  ],
};
