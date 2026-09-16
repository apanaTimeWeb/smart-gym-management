// RESPONSIBILITY: Centralized constants and mock data for the Payouts module.
import type { GymPayout, PnLEntry, PayoutsKPIData } from '@/app/admin/payouts/payouts_types/AdminPayoutsTypes';

export const PAYOUT_MONTH_OPTIONS = [
  { value: 'all', label: 'All Months' },
  { value: '2025-06', label: 'June 2025' },
  { value: '2025-05', label: 'May 2025' },
  { value: '2025-04', label: 'April 2025' },
  { value: '2025-03', label: 'March 2025' },
];

export const PAYOUT_GYM_OPTIONS = [
  { value: 'all', label: 'All Gyms' },
  { value: 'g1', label: 'Andheri East' },
  { value: 'g2', label: 'Bandra West' },
  { value: 'g3', label: 'Powai' },
  { value: 'g4', label: 'Thane' },
];

export const PAYOUT_STATUS_OPTIONS = [
  { value: 'all', label: 'All Status' },
  { value: 'paid', label: 'Paid' },
  { value: 'pending', label: 'Pending' },
  { value: 'processing', label: 'Processing' },
];

export const PAYOUTS_ITEMS_PER_PAGE = 10;






export { MOCK_PAYOUTS, MOCK_PNL, MOCK_PAYOUTS_KPI } from '@/app/admin/admin_mocks/fixtures/AdminMockFixtures';
