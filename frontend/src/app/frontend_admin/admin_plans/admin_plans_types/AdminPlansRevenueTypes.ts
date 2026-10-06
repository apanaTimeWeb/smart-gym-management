// RESPONSIBILITY: Defines the data shapes for the Membership Plan Revenue Attribution dashboard.
export type RevenuePeriod = 'THIS_MONTH' | 'LAST_MONTH' | 'THIS_QUARTER' | 'THIS_YEAR';

export interface PlanRevenueRecord {
  id: string;
  planName: string;
  tier: string;
  totalRevenue: number;
  activeSubscriptions: number;
  newSignups: number;
  renewalRate: number; // Percentage (e.g. 85.5)
}

export type RevenueSortKey = keyof PlanRevenueRecord;
export type RevenueSortDirection = 'asc' | 'desc';

export interface RevenueAggregates {
  totalRevenue: number;
  totalSubscriptions: number;
  avgRenewalRate: number;
  topPerformingPlanName: string;
}
