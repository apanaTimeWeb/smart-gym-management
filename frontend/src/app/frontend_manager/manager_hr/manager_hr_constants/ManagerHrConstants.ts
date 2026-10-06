/** Canonical module-level constant registry for manager_hr; child constant files remain the source of individual entries. */
export const ManagerHrConstants = {} as const;

export const MANAGER_HR_STATUS_VALUES = {
  PRESENT: 'PRESENT',
  PRESENT_DISPLAY: 'Present',
  PENDING: 'PENDING',
  ABSENT: 'ABSENT',
  ABSENT_DISPLAY: 'Absent',
  LEAVE: 'Leave',
  PAID: 'PAID',
  PAID_DISPLAY: 'Paid',
} as const;

export const MANAGER_HR_STATUS_PRESENT = 'PRESENT' as const;
