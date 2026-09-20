// RESPONSIBILITY: Owns module-specific MSW fixture data for the Admin finance feature.
import type { FinanceSummary } from '@/app/admin/finance/finance_types/AdminFinanceTypes';
import type { Payment, Expense, BranchPnlRecord } from '@/app/admin/finance/finance_types/AdminFinanceTypes';

// RESPONSIBILITY: Owns module-specific MSW fixture data for the Admin finance feature.

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
    paidAt: '2026-10-15T10:30:00Z',
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
    paidAt: '2026-10-16T11:45:00Z',
    member: { name: 'Priya Singh', email: 'priya@example.com', phone: '9876543211', plan: { name: 'Quarterly' } }
  },
];

export const MOCK_ADMIN_PAYMENTS_EXPANDED: Payment[] = [
  ...MOCK_ADMIN_PAYMENTS,
  ...Array.from({ length: 16 }, (_, index) => {
    const n = index + 3;
    return {
      id: `pay${n}`,
      memberId: `m${n}`,
      amount: 1200 + (index % 8) * 950,
      method: ['UPI', 'Cash', 'Card', 'NetBanking'][index % 4]!,
      paymentMode: ['UPI', 'CASH', 'CARD', 'ONLINE'][index % 4]!,
      status: (index % 7 === 0 ? 'PENDING' : 'COMPLETED') as Payment['status'],
      invoiceNo: `INV-2026-${String(n).padStart(3, '0')}`,
      paidAt: `2026-09-${String((index % 15) + 1).padStart(2, '0')}T${String(9 + (index % 8)).padStart(2, '0')}:30:00Z`,
      member: { name: ['Neha Kapoor', 'Vikram Patel', 'Sana Khan', 'Arjun Nair'][index % 4]! + ` ${n}`, email: `member${n}@example.com`, phone: `987654${(3210 + n).toString().slice(-4)}`, plan: { name: ['Annual Pro', 'Quarterly', 'Monthly Basic'][index % 3]! } },
    };
  }),
] as Payment[];

export const MOCK_ADMIN_EXPENSES: Expense[] = [
  { id: 'e1', category: 'Rent', amount: 85000, branchId: 'b1', date: '2026-09-01', notes: 'Monthly branch rent', recordedBy: 'Admin' },
  { id: 'e2', category: 'Utilities', amount: 21000, branchId: 'b2', date: '2026-09-05', notes: 'Utility bills', recordedBy: 'Admin' },
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


// --- From AdminHrMockData.ts ---


export const MOCK_ADMIN_BRANCH_PNL_BY_PERIOD: Record<string, BranchPnlRecord[]> = {
  THIS_MONTH: MOCK_ADMIN_BRANCH_PNL,
  LAST_MONTH: MOCK_ADMIN_BRANCH_PNL.map((row) => ({ ...row, revenue: Math.round(row.revenue * 0.94), expenses: Math.round(row.expenses * 0.91), netProfit: Math.round(row.netProfit * 0.97) })),
  Q1: MOCK_ADMIN_BRANCH_PNL.map((row) => ({ ...row, revenue: Math.round(row.revenue * 0.86), expenses: Math.round(row.expenses * 0.88), netProfit: Math.round(row.netProfit * 0.83) })),
  Q2: MOCK_ADMIN_BRANCH_PNL.map((row) => ({ ...row, revenue: Math.round(row.revenue * 1.03), expenses: Math.round(row.expenses * 1.01), netProfit: Math.round(row.netProfit * 1.06) })),
  Q3: MOCK_ADMIN_BRANCH_PNL.map((row) => ({ ...row, revenue: Math.round(row.revenue * 1.09), expenses: Math.round(row.expenses * 1.07), netProfit: Math.round(row.netProfit * 1.12) })),
  Q4: MOCK_ADMIN_BRANCH_PNL.map((row) => ({ ...row, revenue: Math.round(row.revenue * 1.15), expenses: Math.round(row.expenses * 1.11), netProfit: Math.round(row.netProfit * 1.21) })),
  THIS_YEAR: MOCK_ADMIN_BRANCH_PNL.map((row) => ({ ...row, revenue: Math.round(row.revenue * 1.18), expenses: Math.round(row.expenses * 1.13), netProfit: Math.round(row.netProfit * 1.25) })),
};
