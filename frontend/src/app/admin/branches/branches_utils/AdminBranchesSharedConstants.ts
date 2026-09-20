// RESPONSIBILITY: Owns static UI configuration and feature-specific status/payment mappings for Admin Branches.
import type { AdminBranchStatus } from '@/app/admin/branches/branches_types/AdminBranchesTypes';
import type { AdminBranchesTimeRange } from '@/app/admin/branches/branches_types/AdminBranchesTimeRangeTypes';
import type { DetailView } from '@/app/admin/branches/branches_types/AdminBranchesUiTypes';

export const BRANCH_TIME_RANGE_OPTIONS: ReadonlyArray<{ value: AdminBranchesTimeRange; label: string }> = [
  { value: 'weekly', label: 'This Week' },
  { value: 'monthly', label: 'This Month' },
  { value: 'yearly', label: 'This Year' },
  { value: 'custom', label: 'Custom Range' },
];

export const BRANCH_STATUS_OPTIONS: ReadonlyArray<{ value: AdminBranchStatus | 'all'; label: string }> = [
  { value: 'all', label: 'All Statuses' },
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
];

export const BRANCH_STATUS_STYLES: Record<AdminBranchStatus, string> = {
  active: 'bg-success-bg text-success',
  inactive: 'bg-danger-bg text-danger',
};

export const BRANCH_PAYMENT_METHOD_STYLES: Readonly<Record<string, string>> = {
  UPI: 'bg-pay-upi-bg text-pay-upi',
  Cash: 'bg-pay-cash-bg text-pay-cash',
  Card: 'bg-pay-card-bg text-pay-card',
  Bank: 'bg-pay-bank-bg text-pay-bank',
};

export const BRANCH_DETAIL_TITLES: Record<DetailView, string> = {
  revenue: 'Revenue Breakdown',
  expenses: 'Expense Breakdown',
  staff: 'Staff List',
  students: 'Students',
};
