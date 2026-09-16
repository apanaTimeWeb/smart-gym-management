// RESPONSIBILITY: Owns module-specific MSW fixture data for the Admin sales feature.
import type { OverviewDataPoint } from '@/app/admin/sales/sales_types/AdminSalesTypes';
import type { MembershipReportItem } from '@/app/admin/sales/sales_types/AdminSalesTypes';
import type { MembershipTotals } from '@/app/admin/sales/sales_types/AdminSalesTypes';
import type { PendingPaymentMember } from '@/app/admin/sales/sales_types/AdminSalesTypes';
import type { Member } from '@/app/admin/sales/sales_types/AdminSalesTypes';

// RESPONSIBILITY: Owns module-specific MSW fixture data for the Admin sales feature.

// RESPONSIBILITY: Owns module-specific MSW fixture data for the Admin sales feature.

export const MOCK_ADMIN_SALES_OVERVIEW: OverviewDataPoint[] = [
  { date: '2026-10-01', newMembers: 12, revenue: 15000 },
  { date: '2026-10-02', newMembers: 19, revenue: 25000 },
  { date: '2026-10-03', newMembers: 15, revenue: 18000 },
  { date: '2026-10-04', newMembers: 26, revenue: 32000 },
  { date: '2026-10-05', newMembers: 18, revenue: 22000 },
  { date: '2026-10-06', newMembers: 34, revenue: 45000 },
  { date: '2026-10-07', newMembers: 29, revenue: 38000 },
];

export const MOCK_ADMIN_MEMBERSHIP_REPORT: MembershipReportItem[] = [
  { id: 1, name: 'Downtown Main', totalMembers: 4500, activeMembers: 3800, revenue: 1200000, receivable: 150000, received: 1050000, remaining: 150000 },
  { id: 2, name: 'Westside Gym', totalMembers: 3200, activeMembers: 2800, revenue: 850000, receivable: 100000, received: 750000, remaining: 100000 },
];

export const MOCK_ADMIN_MEMBERSHIP_TOTALS: MembershipTotals = {
  activeCount: 6600,
  revenue: 2050000,
  totalReceivable: 250000,
  totalReceived: 1800000,
  remaining: 250000,
  refunds: 15000,
};

export const MOCK_ADMIN_PENDING_PAYMENTS: PendingPaymentMember[] = [
  {
    id: 'm1', name: 'Ravi Verma', email: 'ravi@example.com', phone: '9876543210', gender: 'Male',
    branch: 'Downtown Main', planId: 'p1', plan: 'Annual Pro', billingCycle: 'annual', status: 'pending',
    joinDate: '2026-01-15', expiryDate: '2026-01-15', paidAmount: 0, pendingAmount: 18000,
    daysOverdue: 15, createdAt: '2026-01-15T10:00:00Z',
  },
];

export const MOCK_ADMIN_ALL_MEMBERSHIPS: Member[] = [
  {
    id: 'm2', name: 'Neha Gupta', email: 'neha@example.com', phone: '9876543211', gender: 'Female',
    branch: 'Westside Gym', planId: 'p2', plan: { id: 'p2', name: 'Quarterly Classic', tier: 'Silver' },
    billingCycle: 'quarterly', status: 'active', joinDate: '2026-08-01', expiryDate: '2026-11-01',
    paidAmount: 4000, pendingAmount: 0, createdAt: '2026-08-01T10:00:00Z',
  }
];


// --- From AdminSettingsMockData.ts ---

export const MOCK_ADMIN_SALES_REFERRALS = [
  { source: 'Instagram', revenue: 45000 },
  { source: 'Google Ads', revenue: 65000 },
  { source: 'Word of Mouth', revenue: 25000 },
  { source: 'Walk-in', revenue: 15000 },
] as const;
