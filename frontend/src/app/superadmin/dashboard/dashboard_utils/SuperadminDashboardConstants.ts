// RESPONSIBILITY: Centralizes Dashboard UI constants, chart colors, and plan badge mapping.

export const DASHBOARD_CHART_COLORS = {
  PRIMARY: '#FACC15',
  SUCCESS: '#22C55E',
  WARNING: '#F59E0B',
  DANGER: '#EF4444',
  INFO: '#3B82F6',
  PURPLE: '#C084FC',
  TEXT_SECONDARY: '#A1A1AA',
  BORDER: '#27272A',
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
