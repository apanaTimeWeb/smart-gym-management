// RESPONSIBILITY: Provides hardcoded fixture data for the Manager Sales module to simulate backend responses.
import type { SalesMemberSnapshot } from '@/app/manager/sales/sales_types/ManagerSalesMemberSnapshot';
import type { OverviewDataPoint, MembershipReportItem, PendingPaymentMember } from '@/app/manager/sales/sales_types/ManagerSalesTypes';


export const MOCK_SALES_OVERVIEW: OverviewDataPoint[] = [
  { month: 'Jan', revenue: 4500000, storeRevenue: 500000, newMembers: 12 },
  { month: 'Feb', revenue: 5200000, storeRevenue: 600000, newMembers: 18 },
  { month: 'Mar', revenue: 4800000, storeRevenue: 400000, newMembers: 10 },
  { month: 'Apr', revenue: 6100000, storeRevenue: 800000, newMembers: 22 },
  { month: 'May', revenue: 5900000, storeRevenue: 750000, newMembers: 20 },
  { month: 'Jun', revenue: 6500000, storeRevenue: 900000, newMembers: 25 },
];

export const MOCK_MEMBERSHIP_REPORT: MembershipReportItem[] = [
  { id: 1, name: 'Rahul Sharma', plan: 'Annual', revenue: 1500000, receivable: 1500000, received: 1500000, remaining: 0, refund: 0 },
  { id: 2, name: 'Priya Singh', plan: 'Monthly', revenue: 150000, receivable: 150000, received: 150000, remaining: 0, refund: 0 },
  { id: 3, name: 'Amit Kumar', plan: 'Quarterly', revenue: 400000, receivable: 400000, received: 200000, remaining: 200000, refund: 0 },
  { id: 4, name: 'Neha Gupta', plan: 'Annual', revenue: 1500000, receivable: 1500000, received: 1500000, remaining: 0, refund: 0 },
];

export const MOCK_PENDING_PAYMENTS: PendingPaymentMember[] = [
  {
    id: '3',
    name: 'Amit Kumar',
    phone: '9876543210',
    plan: 'Quarterly',
    daysOverdue: 15,
    pendingAmount: 200000,
    status: 'pending',
    avatar: undefined } as unknown as PendingPaymentMember,
  {
    id: '4',
    name: 'Neha Gupta',
    phone: '8765432109',
    plan: 'Annual',
    daysOverdue: 10,
    pendingAmount: 500000,
    status: 'pending',
    avatar: undefined } as unknown as PendingPaymentMember,
];

export const MOCK_ALL_MEMBERSHIPS: SalesMemberSnapshot[] = [
  {
    id: '1',
    memberId: 'MEM001',
    name: 'Rahul Sharma',
    phone: '9876543210',
    email: 'rahul@example.com',
    status: 'active',
    plan: 'Annual',
    joinDate: '2023-01-10',
    expiryDate: '2024-01-10',
    avatar: undefined,
    branch: 'Main' } as unknown as SalesMemberSnapshot,
  {
    id: '2',
    memberId: 'MEM002',
    name: 'Priya Singh',
    phone: '8765432109',
    email: 'priya@example.com',
    status: 'active',
    plan: 'Monthly',
    joinDate: '2023-10-15',
    expiryDate: '2023-11-15',
    avatar: undefined,
    branch: 'Main' } as unknown as SalesMemberSnapshot,
  {
    id: '3',
    memberId: 'MEM003',
    name: 'Amit Kumar',
    phone: '7654321098',
    email: 'amit@example.com',
    status: 'inactive',
    plan: 'Quarterly',
    joinDate: '2023-08-01',
    expiryDate: '2023-11-01',
    avatar: undefined,
    branch: 'Main' } as unknown as SalesMemberSnapshot,
  {
    id: '4',
    memberId: 'MEM004',
    name: 'Neha Gupta',
    phone: '6543210987',
    email: 'neha@example.com',
    status: 'active',
    plan: 'Annual',
    joinDate: '2023-05-20',
    expiryDate: '2024-05-20',
    avatar: undefined,
    branch: 'Main' } as unknown as SalesMemberSnapshot,
];
