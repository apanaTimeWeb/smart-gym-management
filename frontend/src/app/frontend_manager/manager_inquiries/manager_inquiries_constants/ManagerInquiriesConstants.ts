/** Canonical module-level constant registry for manager_inquiries; child constant files remain the source of individual entries. */
export const ManagerInquiriesConstants = {} as const;
export const MANAGER_INQUIRY_ACTIVE_STATUS = 'ACTIVE' as const;
export const MANAGER_INQUIRY_CONVERTED_STATUS = 'CONVERTED' as const;

export const MANAGER_INQUIRIES_STATUS_VALUES = {
  NEW: 'NEW',
  ALL_FILTER: 'All',
  FOLLOW_UP: 'FOLLOW_UP',
  CONVERTED: 'CONVERTED',
  LOST: 'LOST',
  ALL: 'ALL',
} as const;
