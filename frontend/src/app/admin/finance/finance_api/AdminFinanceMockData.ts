import type { Payment, FinanceSummary, BranchPnlRecord } from '@/app/admin/finance/finance_types/finance_types';

export const MOCK_ADMIN_FINANCE_SUMMARY: FinanceSummary = {
  totalRevenue: 5400000,
  monthlyRevenue: 1200000,
  pendingAmount: 350000,
  totalPayments: 850,
  totalExpenses: 2800000,
  netProfit: 2600000,
  revenueByMethod: {
    UPI: 3200000,
    Cash: 500000,
    Card: 1200000,
    NetBanking: 500000
  },
  monthlyData: [
    { month: 'Jan', revenue: 1000000 },
    { month: 'Feb', revenue: 1100000 },
    { month: 'Mar', revenue: 1050000 },
    { month: 'Apr', revenue: 1150000 },
    { month: 'May', revenue: 1250000 },
    { month: 'Jun', revenue: 1200000 }
  ]
};

export const MOCK_ADMIN_PAYMENTS: Payment[] = [
  {
    id: 'p1',
    memberId: 'm1',
    amount: 15000,
    method: 'UPI',
    paymentMode: 'UPI',
    status: 'COMPLETED',
    invoiceNo: 'INV-2023-001',
    paidAt: '2023-10-15T10:30:00Z',
    member: { name: 'Rahul Sharma', email: 'rahul@example.com', phone: '9876543210', plan: { name: 'Annual Pro' } }
  },
  {
    id: 'p2',
    memberId: 'm2',
    amount: 5000,
    method: 'Cash',
    paymentMode: 'CASH',
    status: 'COMPLETED',
    invoiceNo: 'INV-2023-002',
    paidAt: '2023-10-16T11:45:00Z',
    member: { name: 'Priya Singh', email: 'priya@example.com', phone: '9876543211', plan: { name: 'Quarterly' } }
  },
];

export const MOCK_ADMIN_BRANCH_PNL: BranchPnlRecord[] = [
  {
    branchId: 'b1',
    branchName: 'Downtown Main',
    location: 'City Center',
    revenue: 1200000,
    expenses: 700000,
    netProfit: 500000,
    marginPct: 41.6,
    status: 'PROFITABLE',
    momDelta: 5.2,
    revenueBreakdown: { memberships: 900000, ptSessions: 200000, products: 50000, other: 50000 },
    expenseBreakdown: { rent: 300000, salaries: 250000, utilities: 50000, maintenance: 30000, marketing: 70000 }
  },
  {
    branchId: 'b2',
    branchName: 'Westside Gym',
    location: 'Westside Mall',
    revenue: 800000,
    expenses: 850000,
    netProfit: -50000,
    marginPct: -6.2,
    status: 'LOSS',
    momDelta: -2.1,
    revenueBreakdown: { memberships: 600000, ptSessions: 100000, products: 80000, other: 20000 },
    expenseBreakdown: { rent: 400000, salaries: 250000, utilities: 80000, maintenance: 50000, marketing: 70000 }
  }
];
