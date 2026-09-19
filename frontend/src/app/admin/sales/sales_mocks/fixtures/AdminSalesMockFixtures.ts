// RESPONSIBILITY: Owns module-specific MSW fixture data for the Admin sales feature.
import type { OverviewDataPoint } from '@/app/admin/sales/sales_types/AdminSalesTypes';
import type { MembershipReportItem } from '@/app/admin/sales/sales_types/AdminSalesTypes';
import type { MembershipTotals } from '@/app/admin/sales/sales_types/AdminSalesTypes';
import type { PendingPaymentMember } from '@/app/admin/sales/sales_types/AdminSalesTypes';
import type { Member, StoreProduct, StoreOrder } from '@/app/admin/sales/sales_types/AdminSalesTypes';

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

export const MOCK_ADMIN_STORE_PRODUCTS: StoreProduct[] = [
  { id: 'sp-1', name: 'Protein Shaker', category: 'Accessories', price: 499, stock: 22, isActive: true },
  { id: 'sp-2', name: 'Gym Towel', category: 'Accessories', price: 299, stock: 45, isActive: true },
  { id: 'sp-3', name: 'Whey Protein 1kg', category: 'Supplements', price: 2499, stock: 8, isActive: true },
  { id: 'sp-4', name: 'Resistance Band', category: 'Equipment', price: 799, stock: 16, isActive: true },
];

export const MOCK_ADMIN_STORE_ORDERS: StoreOrder[] = [
  { id: 'ord-1001', total: 2798, method: 'UPI', status: 'paid', createdAt: '2026-09-18T10:30:00Z', items: [
    { id: 'ord-1001-1', qty: 1, price: 2499, product: { name: 'Whey Protein 1kg' } },
    { id: 'ord-1001-2', qty: 1, price: 299, product: { name: 'Gym Towel' } },
  ] },
  { id: 'ord-1002', total: 1298, method: 'Card', status: 'paid', createdAt: '2026-09-17T14:15:00Z', items: [
    { id: 'ord-1002-1', qty: 1, price: 499, product: { name: 'Protein Shaker' } },
    { id: 'ord-1002-2', qty: 1, price: 799, product: { name: 'Resistance Band' } },
  ] },
  { id: 'ord-1003', total: 998, method: 'Cash', status: 'paid', createdAt: '2026-09-16T18:00:00Z', items: [
    { id: 'ord-1003-1', qty: 2, price: 499, product: { name: 'Protein Shaker' } },
  ] },
  { id: 'ord-1004', total: 299, method: 'UPI', status: 'paid', createdAt: '2026-09-15T08:40:00Z', items: [
    { id: 'ord-1004-1', qty: 1, price: 299, product: { name: 'Gym Towel' } },
  ] },
  { id: 'ord-1005', total: 1598, method: 'Card', status: 'paid', createdAt: '2026-09-13T12:20:00Z', items: [
    { id: 'ord-1005-1', qty: 2, price: 799, product: { name: 'Resistance Band' } },
  ] },
  { id: 'ord-1006', total: 4998, method: 'UPI', status: 'paid', createdAt: '2026-09-10T16:45:00Z', items: [
    { id: 'ord-1006-1', qty: 2, price: 2499, product: { name: 'Whey Protein 1kg' } },
  ] },
];
