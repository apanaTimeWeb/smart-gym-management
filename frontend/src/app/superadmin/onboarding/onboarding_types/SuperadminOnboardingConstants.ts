// RESPONSIBILITY: Static hardcoded data and constants for the Tenant Onboarding module.

/** Premium gold gradient applied to all KPI stat cards. Design §5a. */
export const KPI_CARD_GRADIENT = 'linear-gradient(180deg, rgba(250,204,21,0.08), rgba(255,255,255,0.02))';

export const ONBOARDING_STATUS_STYLES: Record<string, string> = {
  COMPLETED: 'bg-success/10 text-success border border-success/30',
  IN_PROGRESS: 'bg-primary/10 text-primary border border-primary/30',
  PENDING: 'bg-warning/10 text-warning border border-warning/30',
  STALLED: 'bg-danger/10 text-danger border border-danger/30',
};

export const TRIAL_STATUS_STYLES: Record<string, string> = {
  TRIAL: 'bg-primary/10 text-primary border border-primary/30',
  ACTIVE: 'bg-success/10 text-success border border-success/30',
  EXPIRED: 'bg-danger/10 text-danger border border-danger/30',
  CONVERTED: 'bg-purple-bg text-purple border border-purple/30',
};

