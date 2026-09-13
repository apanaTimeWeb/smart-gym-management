// RESPONSIBILITY: Provides hardcoded fixture data for the Manager Sales module to simulate backend responses.
import type { OverviewDataPoint, MembershipReportItem, PendingPaymentMember } from '@/app/manager/sales/sales_types/ManagerSalesTypes';
import type { Member } from '@/app/manager/members/members_types/ManagerMembersTypes';

export const MOCK_SALES_OVERVIEW: OverviewDataPoint[] = [
  { month: 'Jan', revenue: 45000, storeRevenue: 5000, newMembers: 12 },
  { month: 'Feb', revenue: 52000, storeRevenue: 6000, newMembers: 18 },
  { month: 'Mar', revenue: 48000, storeRevenue: 4000, newMembers: 10 },
  { month: 'Apr', revenue: 61000, storeRevenue: 8000, newMembers: 22 },
  { month: 'May', revenue: 59000, storeRevenue: 7500, newMembers: 20 },
  { month: 'Jun', revenue: 65000, storeRevenue: 9000, newMembers: 25 },
];

export const MOCK_MEMBERSHIP_REPORT: MembershipReportItem[] = [
  { id: 1, name: 'Rahul Sharma', plan: 'Annual', revenue: 15000, receivable: 15000, received: 15000, remaining: 0, refund: 0 },
  { id: 2, name: 'Priya Singh', plan: 'Monthly', revenue: 1500, receivable: 1500, received: 1500, remaining: 0, refund: 0 },
  { id: 3, name: 'Amit Kumar', plan: 'Quarterly', revenue: 4000, receivable: 4000, received: 2000, remaining: 2000, refund: 0 },
  { id: 4, name: 'Neha Gupta', plan: 'Annual', revenue: 15000, receivable: 15000, received: 15000, remaining: 0, refund: 0 },
];

export const MOCK_PENDING_PAYMENTS: PendingPaymentMember[] = [
  {
    id: '3',
    name: 'Amit Kumar',
    phone: '9876543210',
    plan: 'Quarterly',
    daysOverdue: 15,
    pendingAmount: 2000,
    status: 'pending',
    avatar: undefined,
  } as unknown as PendingPaymentMember,
  {
    id: '4',
    name: 'Neha Gupta',
    phone: '8765432109',
    plan: 'Annual',
    daysOverdue: 10,
    pendingAmount: 5000,
    status: 'pending',
    avatar: undefined,
  } as unknown as PendingPaymentMember,
];

export const MOCK_ALL_MEMBERSHIPS: Member[] = [
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
    branch: 'Main',
  } as unknown as Member,
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
    branch: 'Main',
  } as unknown as Member,
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
    branch: 'Main',
  } as unknown as Member,
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
    branch: 'Main',
  } as unknown as Member,
];
