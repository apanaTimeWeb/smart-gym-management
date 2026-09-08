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

export const PNL_MOCK_DATA: Record<PnlPeriod, BranchPnlRecord[]> = {

  THIS_MONTH: [
    {
      branchId: 'b1',
      branchName: 'Downtown Core',
      location: 'Connaught Place, Delhi',
      revenue:  245000,
      expenses:  83000,
      netProfit: 162000,
      marginPct: 66.1,
      status: 'PROFITABLE',
      momDelta: +12.4,
      revenueBreakdown:  { memberships: 180000, ptSessions: 38000, products: 18000, other: 9000 },
      expenseBreakdown:  { rent: 45000, salaries: 22000, utilities: 8500, maintenance: 3500, marketing: 4000 },
    },
    {
      branchId: 'b2',
      branchName: 'Uptown Plaza',
      location: 'Lajpat Nagar, Delhi',
      revenue:  142000,
      expenses: 139000,
      netProfit:   3000,
      marginPct:    2.1,
      status: 'BREAKEVEN',
      momDelta:  -8.2,
      revenueBreakdown:  { memberships: 105000, ptSessions: 22000, products: 10000, other: 5000 },
      expenseBreakdown:  { rent: 62000, salaries: 38000, utilities: 12000, maintenance: 9000, marketing: 18000 },
    },
    {
      branchId: 'b3',
      branchName: 'Westside Mall',
      location: 'Rajouri Garden, Delhi',
      revenue:  318000,
      expenses: 191000,
      netProfit: 127000,
      marginPct:  39.9,
      status: 'PROFITABLE',
      momDelta:  +5.7,
      revenueBreakdown:  { memberships: 240000, ptSessions: 45000, products: 22000, other: 11000 },
      expenseBreakdown:  { rent: 75000, salaries: 62000, utilities: 18000, maintenance: 12000, marketing: 24000 },
    },
    {
      branchId: 'b4',
      branchName: 'South City Hub',
      location: 'Saket, Delhi',
      revenue:   98000,
      expenses: 121000,
      netProfit: -23000,
      marginPct: -23.5,
      status: 'LOSS',
      momDelta: -31.2,
      revenueBreakdown:  { memberships:  72000, ptSessions: 14000, products:  8000, other: 4000 },
      expenseBreakdown:  { rent: 48000, salaries: 35000, utilities: 15000, maintenance: 14000, marketing: 9000 },
    },
    {
      branchId: 'b5',
      branchName: 'East Avenue',
      location: 'Laxmi Nagar, Delhi',
      revenue:  185000,
      expenses: 102000,
      netProfit:  83000,
      marginPct:  44.9,
      status: 'PROFITABLE',
      momDelta:  +18.3,
      revenueBreakdown:  { memberships: 138000, ptSessions: 28000, products: 12000, other: 7000 },
      expenseBreakdown:  { rent: 38000, salaries: 42000, utilities: 11000, maintenance: 5000, marketing: 6000 },
    },
  ],

  LAST_MONTH: [
    {
      branchId: 'b1',
      branchName: 'Downtown Core',
      location: 'Connaught Place, Delhi',
      revenue:  218000,
      expenses:  80000,
      netProfit: 138000,
      marginPct:  63.3,
      status: 'PROFITABLE',
      momDelta:  +8.1,
      revenueBreakdown:  { memberships: 162000, ptSessions: 34000, products: 15000, other: 7000 },
      expenseBreakdown:  { rent: 45000, salaries: 20000, utilities: 8000, maintenance: 3000, marketing: 4000 },
    },
    {
      branchId: 'b2',
      branchName: 'Uptown Plaza',
      location: 'Lajpat Nagar, Delhi',
      revenue:  155000,
      expenses: 137000,
      netProfit:  18000,
      marginPct:  11.6,
      status: 'PROFITABLE',
      momDelta:  +3.2,
      revenueBreakdown:  { memberships: 115000, ptSessions: 25000, products: 10000, other: 5000 },
      expenseBreakdown:  { rent: 62000, salaries: 35000, utilities: 11000, maintenance: 8000, marketing: 21000 },
    },
    {
      branchId: 'b3',
      branchName: 'Westside Mall',
      location: 'Rajouri Garden, Delhi',
      revenue:  301000,
      expenses: 186000,
      netProfit: 115000,
      marginPct:  38.2,
      status: 'PROFITABLE',
      momDelta:  +2.4,
      revenueBreakdown:  { memberships: 228000, ptSessions: 42000, products: 20000, other: 11000 },
      expenseBreakdown:  { rent: 75000, salaries: 60000, utilities: 17000, maintenance: 10000, marketing: 24000 },
    },
    {
      branchId: 'b4',
      branchName: 'South City Hub',
      location: 'Saket, Delhi',
      revenue:  134000,
      expenses: 118000,
      netProfit:  16000,
      marginPct:  11.9,
      status: 'PROFITABLE',
      momDelta:  +4.6,
      revenueBreakdown:  { memberships:  99000, ptSessions: 20000, products: 10000, other: 5000 },
      expenseBreakdown:  { rent: 48000, salaries: 32000, utilities: 14000, maintenance: 10000, marketing: 14000 },
    },
    {
      branchId: 'b5',
      branchName: 'East Avenue',
      location: 'Laxmi Nagar, Delhi',
      revenue:  157000,
      expenses:  99000,
      netProfit:  58000,
      marginPct:  36.9,
      status: 'PROFITABLE',
      momDelta:  +6.2,
      revenueBreakdown:  { memberships: 116000, ptSessions: 26000, products: 10000, other: 5000 },
      expenseBreakdown:  { rent: 38000, salaries: 40000, utilities: 10000, maintenance: 5000, marketing: 6000 },
    },
  ],

  Q3: [
    {
      branchId: 'b1',
      branchName: 'Downtown Core',
      location: 'Connaught Place, Delhi',
      revenue:  682000,
      expenses: 243000,
      netProfit: 439000,
      marginPct:  64.4,
      status: 'PROFITABLE',
      momDelta:  +10.2,
      revenueBreakdown:  { memberships: 510000, ptSessions: 108000, products: 44000, other: 20000 },
      expenseBreakdown:  { rent: 135000, salaries: 66000, utilities: 25000, maintenance: 9000, marketing: 8000 },
    },
    {
      branchId: 'b2',
      branchName: 'Uptown Plaza',
      location: 'Lajpat Nagar, Delhi',
      revenue:  432000,
      expenses: 408000,
      netProfit:  24000,
      marginPct:   5.6,
      status: 'BREAKEVEN',
      momDelta:  -5.1,
      revenueBreakdown:  { memberships: 318000, ptSessions: 67000, products: 30000, other: 17000 },
      expenseBreakdown:  { rent: 186000, salaries: 114000, utilities: 36000, maintenance: 27000, marketing: 45000 },
    },
    {
      branchId: 'b3',
      branchName: 'Westside Mall',
      location: 'Rajouri Garden, Delhi',
      revenue:  912000,
      expenses: 555000,
      netProfit: 357000,
      marginPct:  39.1,
      status: 'PROFITABLE',
      momDelta:   +4.8,
      revenueBreakdown:  { memberships: 685000, ptSessions: 135000, products: 65000, other: 27000 },
      expenseBreakdown:  { rent: 225000, salaries: 186000, utilities: 54000, maintenance: 36000, marketing: 54000 },
    },
    {
      branchId: 'b4',
      branchName: 'South City Hub',
      location: 'Saket, Delhi',
      revenue:  316000,
      expenses: 348000,
      netProfit: -32000,
      marginPct: -10.1,
      status: 'LOSS',
      momDelta:  -14.7,
      revenueBreakdown:  { memberships: 234000, ptSessions: 46000, products: 24000, other: 12000 },
      expenseBreakdown:  { rent: 144000, salaries: 105000, utilities: 45000, maintenance: 30000, marketing: 24000 },
    },
    {
      branchId: 'b5',
      branchName: 'East Avenue',
      location: 'Laxmi Nagar, Delhi',
      revenue:  528000,
      expenses: 297000,
      netProfit: 231000,
      marginPct:  43.8,
      status: 'PROFITABLE',
      momDelta:  +15.6,
      revenueBreakdown:  { memberships: 394000, ptSessions: 83000, products: 36000, other: 15000 },
      expenseBreakdown:  { rent: 114000, salaries: 126000, utilities: 33000, maintenance: 12000, marketing: 12000 },
    },
  ],

  Q1: [
    {
      branchId: 'b1', branchName: 'Downtown Core', location: 'Connaught Place, Delhi',
      revenue: 598000, expenses: 224000, netProfit: 374000, marginPct: 62.5, status: 'PROFITABLE', momDelta: +6.1,
      revenueBreakdown: { memberships: 445000, ptSessions: 95000, products: 38000, other: 20000 },
      expenseBreakdown: { rent: 135000, salaries: 58000, utilities: 20000, maintenance: 6000, marketing: 5000 },
    },
    {
      branchId: 'b2', branchName: 'Uptown Plaza', location: 'Lajpat Nagar, Delhi',
      revenue: 378000, expenses: 365000, netProfit: 13000, marginPct: 3.4, status: 'BREAKEVEN', momDelta: -2.3,
      revenueBreakdown: { memberships: 278000, ptSessions: 58000, products: 28000, other: 14000 },
      expenseBreakdown: { rent: 186000, salaries: 100000, utilities: 33000, maintenance: 22000, marketing: 24000 },
    },
    {
      branchId: 'b3', branchName: 'Westside Mall', location: 'Rajouri Garden, Delhi',
      revenue: 845000, expenses: 510000, netProfit: 335000, marginPct: 39.6, status: 'PROFITABLE', momDelta: +3.2,
      revenueBreakdown: { memberships: 635000, ptSessions: 125000, products: 60000, other: 25000 },
      expenseBreakdown: { rent: 225000, salaries: 170000, utilities: 50000, maintenance: 30000, marketing: 35000 },
    },
    {
      branchId: 'b4', branchName: 'South City Hub', location: 'Saket, Delhi',
      revenue: 421000, expenses: 389000, netProfit: 32000, marginPct: 7.6, status: 'PROFITABLE', momDelta: +4.1,
      revenueBreakdown: { memberships: 312000, ptSessions: 62000, products: 32000, other: 15000 },
      expenseBreakdown: { rent: 144000, salaries: 115000, utilities: 42000, maintenance: 28000, marketing: 60000 },
    },
    {
      branchId: 'b5', branchName: 'East Avenue', location: 'Laxmi Nagar, Delhi',
      revenue: 492000, expenses: 274000, netProfit: 218000, marginPct: 44.3, status: 'PROFITABLE', momDelta: +12.4,
      revenueBreakdown: { memberships: 366000, ptSessions: 77000, products: 34000, other: 15000 },
      expenseBreakdown: { rent: 114000, salaries: 116000, utilities: 30000, maintenance: 8000, marketing: 6000 },
    },
  ],

  Q2: [
    {
      branchId: 'b1', branchName: 'Downtown Core', location: 'Connaught Place, Delhi',
      revenue: 630000, expenses: 230000, netProfit: 400000, marginPct: 63.5, status: 'PROFITABLE', momDelta: +7.0,
      revenueBreakdown: { memberships: 470000, ptSessions: 100000, products: 40000, other: 20000 },
      expenseBreakdown: { rent: 135000, salaries: 60000, utilities: 22000, maintenance: 7000, marketing: 6000 },
    },
    {
      branchId: 'b2', branchName: 'Uptown Plaza', location: 'Lajpat Nagar, Delhi',
      revenue: 400000, expenses: 380000, netProfit: 20000, marginPct: 5.0, status: 'BREAKEVEN', momDelta: -1.5,
      revenueBreakdown: { memberships: 295000, ptSessions: 62000, products: 28000, other: 15000 },
      expenseBreakdown: { rent: 186000, salaries: 105000, utilities: 34000, maintenance: 20000, marketing: 35000 },
    },
    {
      branchId: 'b3', branchName: 'Westside Mall', location: 'Rajouri Garden, Delhi',
      revenue: 880000, expenses: 525000, netProfit: 355000, marginPct: 40.3, status: 'PROFITABLE', momDelta: +4.1,
      revenueBreakdown: { memberships: 660000, ptSessions: 130000, products: 62000, other: 28000 },
      expenseBreakdown: { rent: 225000, salaries: 178000, utilities: 52000, maintenance: 33000, marketing: 37000 },
    },
    {
      branchId: 'b4', branchName: 'South City Hub', location: 'Saket, Delhi',
      revenue: 358000, expenses: 342000, netProfit: 16000, marginPct: 4.5, status: 'BREAKEVEN', momDelta: -3.6,
      revenueBreakdown: { memberships: 266000, ptSessions: 55000, products: 27000, other: 10000 },
      expenseBreakdown: { rent: 144000, salaries: 110000, utilities: 43000, maintenance: 25000, marketing: 20000 },
    },
    {
      branchId: 'b5', branchName: 'East Avenue', location: 'Laxmi Nagar, Delhi',
      revenue: 510000, expenses: 282000, netProfit: 228000, marginPct: 44.7, status: 'PROFITABLE', momDelta: +14.2,
      revenueBreakdown: { memberships: 380000, ptSessions: 80000, products: 36000, other: 14000 },
      expenseBreakdown: { rent: 114000, salaries: 120000, utilities: 32000, maintenance: 10000, marketing: 6000 },
    },
  ],

  Q4: [
    {
      branchId: 'b1', branchName: 'Downtown Core', location: 'Connaught Place, Delhi',
      revenue: 710000, expenses: 248000, netProfit: 462000, marginPct: 65.1, status: 'PROFITABLE', momDelta: +13.5,
      revenueBreakdown: { memberships: 530000, ptSessions: 115000, products: 45000, other: 20000 },
      expenseBreakdown: { rent: 135000, salaries: 68000, utilities: 26000, maintenance: 11000, marketing: 8000 },
    },
    {
      branchId: 'b2', branchName: 'Uptown Plaza', location: 'Lajpat Nagar, Delhi',
      revenue: 462000, expenses: 415000, netProfit: 47000, marginPct: 10.2, status: 'PROFITABLE', momDelta: +5.8,
      revenueBreakdown: { memberships: 340000, ptSessions: 72000, products: 34000, other: 16000 },
      expenseBreakdown: { rent: 186000, salaries: 118000, utilities: 37000, maintenance: 28000, marketing: 46000 },
    },
    {
      branchId: 'b3', branchName: 'Westside Mall', location: 'Rajouri Garden, Delhi',
      revenue: 960000, expenses: 572000, netProfit: 388000, marginPct: 40.4, status: 'PROFITABLE', momDelta: +8.2,
      revenueBreakdown: { memberships: 720000, ptSessions: 145000, products: 68000, other: 27000 },
      expenseBreakdown: { rent: 225000, salaries: 195000, utilities: 58000, maintenance: 40000, marketing: 54000 },
    },
    {
      branchId: 'b4', branchName: 'South City Hub', location: 'Saket, Delhi',
      revenue: 388000, expenses: 360000, netProfit: 28000, marginPct: 7.2, status: 'PROFITABLE', momDelta: +10.4,
      revenueBreakdown: { memberships: 288000, ptSessions: 60000, products: 28000, other: 12000 },
      expenseBreakdown: { rent: 144000, salaries: 112000, utilities: 44000, maintenance: 30000, marketing: 30000 },
    },
    {
      branchId: 'b5', branchName: 'East Avenue', location: 'Laxmi Nagar, Delhi',
      revenue: 568000, expenses: 305000, netProfit: 263000, marginPct: 46.3, status: 'PROFITABLE', momDelta: +20.1,
      revenueBreakdown: { memberships: 424000, ptSessions: 90000, products: 38000, other: 16000 },
      expenseBreakdown: { rent: 114000, salaries: 130000, utilities: 35000, maintenance: 14000, marketing: 12000 },
    },
  ],

  THIS_YEAR: [
    {
      branchId: 'b1', branchName: 'Downtown Core', location: 'Connaught Place, Delhi',
      revenue: 2620000, expenses: 945000, netProfit: 1675000, marginPct: 63.9, status: 'PROFITABLE', momDelta: +9.2,
      revenueBreakdown: { memberships: 1955000, ptSessions: 418000, products: 167000, other: 80000 },
      expenseBreakdown: { rent: 540000, salaries: 252000, utilities: 93000, maintenance: 33000, marketing: 27000 },
    },
    {
      branchId: 'b2', branchName: 'Uptown Plaza', location: 'Lajpat Nagar, Delhi',
      revenue: 1672000, expenses: 1568000, netProfit: 104000, marginPct:  6.2, status: 'PROFITABLE', momDelta: -3.1,
      revenueBreakdown: { memberships: 1231000, ptSessions: 259000, products: 120000, other: 62000 },
      expenseBreakdown: { rent: 744000, salaries: 453000, utilities: 140000, maintenance: 97000, marketing: 134000 },
    },
    {
      branchId: 'b3', branchName: 'Westside Mall', location: 'Rajouri Garden, Delhi',
      revenue: 3597000, expenses: 2162000, netProfit: 1435000, marginPct: 39.9, status: 'PROFITABLE', momDelta: +5.1,
      revenueBreakdown: { memberships: 2700000, ptSessions: 535000, products: 255000, other: 107000 },
      expenseBreakdown: { rent: 900000, salaries: 729000, utilities: 214000, maintenance: 139000, marketing: 180000 },
    },
    {
      branchId: 'b4', branchName: 'South City Hub', location: 'Saket, Delhi',
      revenue: 1483000, expenses: 1595000, netProfit: -112000, marginPct: -7.6, status: 'LOSS', momDelta: -12.8,
      revenueBreakdown: { memberships: 1100000, ptSessions: 223000, products: 111000, other: 49000 },
      expenseBreakdown: { rent: 576000, salaries: 462000, utilities: 174000, maintenance: 117000, marketing: 266000 },
    },
    {
      branchId: 'b5', branchName: 'East Avenue', location: 'Laxmi Nagar, Delhi',
      revenue: 2098000, expenses: 1158000, netProfit: 940000, marginPct: 44.8, status: 'PROFITABLE', momDelta: +16.0,
      revenueBreakdown: { memberships: 1564000, ptSessions: 330000, products: 144000, other: 60000 },
      expenseBreakdown: { rent: 456000, salaries: 492000, utilities: 130000, maintenance: 49000, marketing: 31000 },
    },
  ],
};
