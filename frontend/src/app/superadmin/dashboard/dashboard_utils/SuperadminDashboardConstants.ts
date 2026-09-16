// RESPONSIBILITY: Centralizes Dashboard UI constants, chart colors, and plan badge mapping.

import { CHART_COLORS } from '@/app/superadmin/superadmin_utils/SuperadminChartConstants';

export const DASHBOARD_CHART_COLORS = {
  PRIMARY: CHART_COLORS.PRIMARY,
  SUCCESS: CHART_COLORS.SUCCESS,
  WARNING: CHART_COLORS.WARNING,
  DANGER: CHART_COLORS.DANGER,
  INFO: CHART_COLORS.INFO,
  PURPLE: CHART_COLORS.PURPLE,
  TEXT_SECONDARY: CHART_COLORS.TEXT_SECONDARY,
  BORDER: CHART_COLORS.BORDER,
} as const;

/** Maps time range keys to human-readable suffix labels. */
export const DASHBOARD_TIME_RANGE_LABELS: Record<string, string> = {
  this_month: 'this month',
  last_month: 'last month',
  last_3_months: 'last 3 months',
  last_6_months: 'last 6 months',
  this_year: 'this year',
  monthly: 'all time (monthly)',
  yearly: 'all time (yearly)',
};

/** Maps plan names to Tailwind token class strings for the Recent Onboards list. */
export const DASHBOARD_PLAN_BADGE_CLASSES: Record<string, string> = {
  ENTERPRISE: 'bg-purple-bg text-purple border border-purple/20',
  PRO: 'bg-primary-subtle text-primary border border-primary/20',
  STARTER: 'bg-success-bg text-success border border-success/20',
  BASIC: 'bg-success-bg text-success border border-success/20',
};

export const DASHBOARD_PLAN_BADGE_FALLBACK_CLASS =
  'bg-input text-secondary border border-border';
