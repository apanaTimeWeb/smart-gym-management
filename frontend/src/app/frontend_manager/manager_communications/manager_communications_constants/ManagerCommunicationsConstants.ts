/** Canonical module-level constant registry for manager_communications; child constant files remain the source of individual entries. */
export const ManagerCommunicationsConstants = {} as const;

export const MANAGER_COMMUNICATIONS_STATUS_VALUES = {
  ACTIVE: 'ACTIVE',
  EXPIRED: 'EXPIRED',
  PENDING: 'PENDING',
  SENT: 'sent',
  PARTIAL: 'partial',
} as const;
