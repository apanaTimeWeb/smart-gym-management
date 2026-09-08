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

export const REVENUE_MOCK_DATA: Record<RevenuePeriod, PlanRevenueRecord[]> = {
  THIS_MONTH: [
    { id: '1', planName: 'Gold Annual', tier: 'Premium', totalRevenue: 300000, activeSubscriptions: 150, newSignups: 20, renewalRate: 92.5 },
    { id: '2', planName: 'Silver Half-Year', tier: 'Standard', totalRevenue: 150000, activeSubscriptions: 210, newSignups: 45, renewalRate: 85.0 },
    { id: '3', planName: 'Bronze Quarterly', tier: 'Basic', totalRevenue: 75000, activeSubscriptions: 120, newSignups: 30, renewalRate: 70.2 },
    { id: '4', planName: 'Platinum Elite', tier: 'Premium', totalRevenue: 450000, activeSubscriptions: 80, newSignups: 5, renewalRate: 98.0 },
  ],
  LAST_MONTH: [
    { id: '1', planName: 'Gold Annual', tier: 'Premium', totalRevenue: 280000, activeSubscriptions: 145, newSignups: 15, renewalRate: 91.0 },
    { id: '2', planName: 'Silver Half-Year', tier: 'Standard', totalRevenue: 160000, activeSubscriptions: 215, newSignups: 50, renewalRate: 84.5 },
    { id: '3', planName: 'Bronze Quarterly', tier: 'Basic', totalRevenue: 70000, activeSubscriptions: 115, newSignups: 25, renewalRate: 69.5 },
    { id: '4', planName: 'Platinum Elite', tier: 'Premium', totalRevenue: 420000, activeSubscriptions: 78, newSignups: 4, renewalRate: 97.5 },
  ],
  THIS_QUARTER: [
    { id: '1', planName: 'Gold Annual', tier: 'Premium', totalRevenue: 900000, activeSubscriptions: 160, newSignups: 55, renewalRate: 93.0 },
    { id: '2', planName: 'Silver Half-Year', tier: 'Standard', totalRevenue: 480000, activeSubscriptions: 230, newSignups: 120, renewalRate: 86.0 },
    { id: '3', planName: 'Bronze Quarterly', tier: 'Basic', totalRevenue: 220000, activeSubscriptions: 140, newSignups: 80, renewalRate: 72.0 },
    { id: '4', planName: 'Platinum Elite', tier: 'Premium', totalRevenue: 1350000, activeSubscriptions: 85, newSignups: 12, renewalRate: 98.5 },
  ],
  THIS_YEAR: [
    { id: '1', planName: 'Gold Annual', tier: 'Premium', totalRevenue: 3600000, activeSubscriptions: 180, newSignups: 210, renewalRate: 94.0 },
    { id: '2', planName: 'Silver Half-Year', tier: 'Standard', totalRevenue: 1950000, activeSubscriptions: 250, newSignups: 450, renewalRate: 87.5 },
    { id: '3', planName: 'Bronze Quarterly', tier: 'Basic', totalRevenue: 900000, activeSubscriptions: 160, newSignups: 320, renewalRate: 74.0 },
    { id: '4', planName: 'Platinum Elite', tier: 'Premium', totalRevenue: 5400000, activeSubscriptions: 95, newSignups: 40, renewalRate: 99.0 },
  ],
};
