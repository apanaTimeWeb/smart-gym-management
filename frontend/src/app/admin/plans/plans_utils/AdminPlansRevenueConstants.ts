// RESPONSIBILITY: Holds mock data, period options, and table headers for the Plan Revenue dashboard.
import type { PlanRevenueRecord, RevenuePeriod } from '@/app/admin/plans/plans_types/AdminPlansRevenueTypes';

export const REVENUE_PERIOD_OPTIONS: { label: string; value: RevenuePeriod }[] = [
  { label: 'This Month', value: 'THIS_MONTH' },
  { label: 'Last Month', value: 'LAST_MONTH' },
  { label: 'This Quarter', value: 'THIS_QUARTER' },
  { label: 'This Year', value: 'THIS_YEAR' },
];

export const REVENUE_TABLE_HEADERS = [
  { key: 'planName', label: 'Plan Name', sortable: true },
  { key: 'tier', label: 'Tier', sortable: true },
  { key: 'activeSubscriptions', label: 'Active Subs', sortable: true },
  { key: 'newSignups', label: 'New Signups', sortable: true },
  { key: 'renewalRate', label: 'Renewal Rate', sortable: true },
  { key: 'totalRevenue', label: 'Total Revenue', sortable: true },
];
