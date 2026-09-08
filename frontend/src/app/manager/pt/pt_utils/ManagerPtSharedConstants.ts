// RESPONSIBILITY: Centralized constants for the Manager PT (Personal Training) module.

export const PT_SESSION_STATUS = {
  UPCOMING: 'Upcoming',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled',
} as const;

export type PtSessionStatus = typeof PT_SESSION_STATUS[keyof typeof PT_SESSION_STATUS];

export const PT_SESSION_STATUS_STYLES: Record<PtSessionStatus, string> = {
  Upcoming: 'bg-warning-bg text-warning',
  Completed: 'bg-success-bg text-success',
  Cancelled: 'bg-danger-bg text-danger',
};

export const PT_DURATION_OPTIONS = [
  { value: '30m', label: '30 Minutes' },
  { value: '45m', label: '45 Minutes' },
  { value: '60m', label: '60 Minutes' },
  { value: '90m', label: '90 Minutes' },
] as const;
