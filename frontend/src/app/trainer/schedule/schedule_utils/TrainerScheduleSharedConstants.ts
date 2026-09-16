// RESPONSIBILITY: Defines static Schedule UI configuration and status presentation tokens.
export const TRAINER_SCHEDULE_STATUS_STYLES = {
  PENDING: { bg: 'bg-warning/10', text: 'text-warning' },
  APPROVED: { bg: 'bg-success/10', text: 'text-success' },
  REJECTED: { bg: 'bg-danger/10', text: 'text-danger' },
} as const;

export const TRAINER_SCHEDULE_DEFAULT_STATUS_STYLE = {
  bg: 'bg-input',
  text: 'text-secondary',
} as const;

export const TRAINER_DEFAULT_AVAILABILITY_TIMES = {
  startTime: '06:00',
  endTime: '18:00',
} as const;
