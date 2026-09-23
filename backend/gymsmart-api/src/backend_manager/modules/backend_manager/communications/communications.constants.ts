// RESPONSIBILITY: Centralized runtime enum/configuration for Manager communications.
// FLOW: DTO/entity/query allowlists -> Communications feature behavior.

export enum CommActiveTab {
  COMPOSE = 'compose',
  HISTORY = 'history',
  AUTOMATIONS = 'automations',
  CHURN_RECOVERY = 'churn_recovery',
}

export enum CommChannel {
  WHATSAPP = 'whatsapp',
  EMAIL = 'email',
}

export enum CommStatus {
  SENT = 'sent',
  FAILED = 'failed',
  PARTIAL = 'partial',
  SCHEDULED = 'scheduled',
}

export enum CommAutomationType {
  BIRTHDAY = 'birthday',
  ANNIVERSARY = 'anniversary',
}

export enum WinBackTemplateTier {
  DAYS_7 = '7_days',
  DAYS_30 = '30_days',
  DAYS_90 = '90_days',
  CUSTOM = 'custom',
}

export enum CommunicationsRecordStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  ARCHIVED = 'ARCHIVED',
}

export const CommunicationsAllowedSortFields = ['createdAt', 'updatedAt', 'id'] as const;

export enum CommSegment {
  ALL_ACTIVE = 'all_active',
  EXPIRING_7_DAYS = 'expiring_7_days',
  EXPIRING_30_DAYS = 'expiring_30_days',
  EXPIRED = 'expired',
  PENDING_PAYMENT = 'pending_payment',
  CUSTOM = 'custom',
}

export enum ChurnReasonType {
  PRICE = 'price',
  RELOCATION = 'relocation',
  SCHEDULE = 'schedule',
  PERSONAL = 'personal',
  DISSATISFIED = 'dissatisfied',
  UNKNOWN = 'unknown',
}
