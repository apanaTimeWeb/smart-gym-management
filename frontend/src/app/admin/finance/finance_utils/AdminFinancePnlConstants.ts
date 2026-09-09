// RESPONSIBILITY: Single source of truth for all Branch P&L hardcoded data, badge config,
// period labels, and table headers. Replace with API calls here when backend is ready.
// DATA FLOW: AdminFinancePnlConstants → useAdminFinancePnlLogic → P&L components

import type {
  BranchPnlRecord,
  BranchPnlStatus,
  PnlPeriod,
} from '@/app/admin/finance/finance_types/finance_types';

// ─── Period Options ────────────────────────────────────────────────────────────

export interface PnlPeriodOption {
  value: PnlPeriod;
  label: string;
}

export const PNL_PERIOD_OPTIONS: PnlPeriodOption[] = [
  { value: 'THIS_MONTH', label: 'This Month' },
  { value: 'LAST_MONTH', label: 'Last Month' },
  { value: 'Q1', label: 'Q1 (Jan–Mar)' },
  { value: 'Q2', label: 'Q2 (Apr–Jun)' },
  { value: 'Q3', label: 'Q3 (Jul–Sep)' },
  { value: 'Q4', label: 'Q4 (Oct–Dec)' },
  { value: 'THIS_YEAR', label: 'This Year (FY)' },
];

// ─── Status Badge Config ───────────────────────────────────────────────────────

export const PNL_STATUS_CONFIG: Record<BranchPnlStatus, { label: string; textClass: string; bgClass: string }> = {
  PROFITABLE: { label: 'Profitable', textClass: 'text-success', bgClass: 'bg-success/10' },
  BREAKEVEN:  { label: 'Break-even', textClass: 'text-warning',  bgClass: 'bg-warning/10'  },
  LOSS:       { label: 'Loss-making', textClass: 'text-danger',  bgClass: 'bg-danger/10'   },
};

// ─── Table Headers ─────────────────────────────────────────────────────────────

export const PNL_TABLE_HEADERS = [
  { key: 'branchName', label: 'Branch',     sortable: true  },
  { key: 'revenue',    label: 'Revenue',    sortable: true  },
  { key: 'expenses',   label: 'Expenses',   sortable: true  },
  { key: 'netProfit',  label: 'Net Profit', sortable: true  },
  { key: 'marginPct',  label: 'Margin %',   sortable: true  },
  { key: 'momDelta',   label: 'MoM Δ',      sortable: false },
  { key: 'status',     label: 'Status',     sortable: false },
  { key: 'expand',     label: '',           sortable: false },
] as const;

// ─── Hardcoded P&L Data Per Period ────────────────────────────────────────────
// Tomorrow: replace this map with a single GET /admin/finance/pnl?period=THIS_MONTH call.


