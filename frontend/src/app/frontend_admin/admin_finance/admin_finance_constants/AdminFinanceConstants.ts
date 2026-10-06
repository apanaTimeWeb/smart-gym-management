// RESPONSIBILITY: Canonical feature-owned static constants and business UI configuration for this Admin feature.
import type {
  BranchPnlRecord,
  BranchPnlStatus,
  PnlPeriod,
} from '@/app/frontend_admin/admin_finance/admin_finance_types/AdminFinanceTypes';


// period labels, and table headers. Replace with API calls here when backend is ready.
// DATA FLOW: AdminFinanceConstants → useAdminFinancePnlLogic → P&L components


// ─── Period Options ────────────────────────────────────────────────────────────


export const PNL_PERIOD_OPTIONS: { value: PnlPeriod; labelKey: string }[] = [
  { value: 'THIS_MONTH', labelKey: 'finance.static.this_month' },
  { value: 'LAST_MONTH', labelKey: 'finance.static.last_month' },
  { value: 'Q1', labelKey: 'finance.static.q1_jan_mar' },
  { value: 'Q2', labelKey: 'finance.static.q2_apr_jun' },
  { value: 'Q3', labelKey: 'finance.static.q3_jul_sep' },
  { value: 'Q4', labelKey: 'finance.static.q4_oct_dec' },
  { value: 'THIS_YEAR', labelKey: 'finance.static.this_year_fy' },
];

// ─── Status Badge Config ───────────────────────────────────────────────────────

export const PNL_STATUS_CONFIG: Record<BranchPnlStatus, { labelKey: string; textClass: string; bgClass: string }> = {
  PROFITABLE: { labelKey: 'finance.static.profitable', textClass: 'text-success', bgClass: 'bg-success-bg' },
  BREAKEVEN:  { labelKey: 'finance.static.break_even', textClass: 'text-warning',  bgClass: 'bg-warning-bg'  },
  LOSS:       { labelKey: 'finance.static.loss_making', textClass: 'text-danger',  bgClass: 'bg-danger-bg'   },
};

// ─── Table Headers ─────────────────────────────────────────────────────────────

export const PNL_TABLE_HEADERS = [
  { key: 'branchName', labelKey: 'finance.static.branch',     sortable: true  },
  { key: 'revenue',    labelKey: 'finance.static.revenue',    sortable: true  },
  { key: 'expenses',   labelKey: 'finance.static.expenses',   sortable: true  },
  { key: 'netProfit',  labelKey: 'finance.static.net_profit', sortable: true  },
  { key: 'marginPct',  labelKey: 'finance.static.margin',   sortable: true  },
  { key: 'momDelta',   labelKey: 'finance.static.mom',      sortable: false },
  { key: 'status',     labelKey: 'finance.static.status',     sortable: false },
  { key: 'expand',     labelKey: 'finance.static.empty',           sortable: false },
] as const;

// ─── Hardcoded P&L Data Per Period ────────────────────────────────────────────
// Tomorrow: replace this map with a single GET /admin/finance/pnl?period=THIS_MONTH call.



export const FINANCE_REVENUE_BREAKDOWN_ITEMS = [
  { key: 'memberships', labelKey: 'finance.AdminAuditRepair.memberships' },
  { key: 'ptSessions', labelKey: 'finance.AdminAuditRepair.ptSessions' },
  { key: 'products', labelKey: 'finance.AdminAuditRepair.products' },
  { key: 'other', labelKey: 'finance.AdminAuditRepair.other' },
] as const;

export const FINANCE_EXPENSE_BREAKDOWN_ITEMS = [
  { key: 'rent', labelKey: 'finance.AdminAuditRepair.rent' },
  { key: 'salaries', labelKey: 'finance.AdminAuditRepair.salaries' },
  { key: 'utilities', labelKey: 'finance.AdminAuditRepair.utilities' },
  { key: 'maintenance', labelKey: 'finance.AdminAuditRepair.maintenance' },
  { key: 'marketing', labelKey: 'finance.AdminAuditRepair.marketing' },
] as const;

export const FINANCE_METHOD_STYLES: Record<string, { bg: string; text: string }> = {
  UPI: { bg: 'bg-pay-upi-bg', text: 'text-pay-upi-text' },
  Cash: { bg: 'bg-pay-cash-bg', text: 'text-pay-cash-text' },
  Card: { bg: 'bg-pay-card-bg', text: 'text-pay-card-text' },
  NetBanking: { bg: 'bg-pay-bank-bg', text: 'text-pay-bank-text' },
};

export const FINANCE_PAYMENT_STATUS_LABEL_KEYS: Record<string, string> = { PAID: 'finance.AdminAuditRepair.paid', DUE: 'finance.AdminAuditRepair.due', REFUNDED: 'finance.AdminAuditRepair.refunded' };

export const FINANCE_PAYMENT_METHOD_LABEL_KEYS: Record<string, string> = { UPI: 'finance.AdminAuditRepair.upi', Cash: 'finance.AdminAuditRepair.cash', Card: 'finance.AdminAuditRepair.card', NetBanking: 'finance.AdminAuditRepair.netBanking' };

export const FINANCE_STATUS_STYLES: Record<string, { bg: string; text: string }> = {
  PAID: { bg: 'bg-success-bg', text: 'text-success' },
  DUE: { bg: 'bg-danger-bg', text: 'text-danger' },
  REFUNDED: { bg: 'bg-warning-bg', text: 'text-warning' },
};


export const FINANCE_PNL_STATUS_FILTERS = { ALL: 'ALL', PROFITABLE: 'PROFITABLE', BREAKEVEN: 'BREAKEVEN', LOSS: 'LOSS' } as const;
export const FINANCE_BRANCH_PNL_STATUSES = { PROFITABLE: 'PROFITABLE', BREAKEVEN: 'BREAKEVEN', LOSS: 'LOSS' } as const;

export const FINANCE_RECORD_STATUSES = { COMPLETED: 'COMPLETED', PENDING: 'PENDING' } as const;

export const FINANCE_PAYMENT_METHODS = ['UPI', 'Cash', 'Card', 'NetBanking'] as const;

export const FINANCE_PAYMENT_STATUSES = ['PAID', 'DUE', 'REFUNDED'] as const;

export const PAYMENTS_TABLE_HEADERS = ['invoiceNo', 'member', 'amount', 'method', 'status', 'paidAt'] as const;
export const FINANCE_PAYMENT_TABLE_HEADER_LABEL_KEYS: Record<(typeof PAYMENTS_TABLE_HEADERS)[number], string> = {
  invoiceNo: 'finance.AdminAuditRepair.invoiceNo',
  member: 'finance.AdminAuditRepair.member',
  amount: 'finance.AdminAuditRepair.amount',
  method: 'finance.AdminAuditRepair.method',
  status: 'finance.AdminAuditRepair.status',
  paidAt: 'finance.AdminAuditRepair.paidAt',
};
export const FINANCE_TABS = ['Payments', 'Expenses', 'Summary'] as const;

export const EXPENSE_CATEGORIES = ['Rent', 'Salaries', 'Utilities', 'Equipment', 'Marketing', 'Maintenance', 'Supplies', 'Other'] as const;

export const FINANCE_ITEMS_PER_PAGE = 10;
