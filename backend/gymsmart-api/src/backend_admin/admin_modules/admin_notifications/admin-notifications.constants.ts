// RESPONSIBILITY: Defines finite Admin domain values used by DTO, domain and persistence contracts.
// FLOW: DTO validation → domain logic → repository → database constraint.

export enum AdminNotificationsStatus {
  ACTIVE = 'ACTIVE',
}


export enum AdminNotificationsSeverity {
  CRITICAL = 'CRITICAL',
  INFO = 'INFO',
  WARNING = 'WARNING',
}

