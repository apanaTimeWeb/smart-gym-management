// RESPONSIBILITY: Defines static Schedule UI configuration and status presentation tokens.
export const TRAINER_SCHEDULE_STATUS_STYLES = {
  PENDING: { bg: 'bg-warning-bg', text: 'text-warning' },
  APPROVED: { bg: 'bg-success-bg', text: 'text-success' },
  REJECTED: { bg: 'bg-danger-bg', text: 'text-danger' },
} as const;

export const TRAINER_SCHEDULE_DEFAULT_STATUS_STYLE = {
  bg: 'bg-input',
  text: 'text-secondary',
} as const;

export const TRAINER_DEFAULT_AVAILABILITY_TIMES = {
  startTime: '06:00',
  endTime: '18:00',
} as const;

export const SCHEDULE_TAB_IDS = ['availability', 'leaves'] as const;
export type TrainerScheduleTab = (typeof SCHEDULE_TAB_IDS)[number];
export const LEAVE_TYPE_OPTIONS = ['Sick Leave', 'Casual Leave', 'Emergency', 'Personal', 'Other'] as const;
