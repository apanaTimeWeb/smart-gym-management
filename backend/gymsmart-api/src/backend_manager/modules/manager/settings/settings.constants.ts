// RESPONSIBILITY: Centralized runtime enum/configuration for Manager settings.
// FLOW: DTO/entity/query allowlists -> Settings feature behavior.

export enum SettingsTab {
  REGION = 'region',
  GYM_PROFILE = 'gym_profile',
  OPERATING_HOURS = 'operating_hours',
}

export enum ManagerSettingsNotificationChannel {
  WHATSAPP = 'whatsapp',
  EMAIL = 'email',
  BOTH = 'both',
}

export enum NotificationTemplateType {
  RENEWAL_REMINDER = 'renewal_reminder',
  PAYMENT_RECEIPT = 'payment_receipt',
  WELCOME_MESSAGE = 'welcome_message',
  EXPIRY_ALERT = 'expiry_alert',
  PAYMENT_DUE = 'payment_due',
}

export enum RecurringFrequency {
  DAILY = 'Daily',
  WEEKLY = 'Weekly',
  MONTHLY = 'Monthly',
}

export enum DayOfWeek {
  MONDAY = 'Monday',
  TUESDAY = 'Tuesday',
  WEDNESDAY = 'Wednesday',
  THURSDAY = 'Thursday',
  FRIDAY = 'Friday',
  SATURDAY = 'Saturday',
  SUNDAY = 'Sunday',
}

export enum SettingsRecordStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  ARCHIVED = 'ARCHIVED',
}

export const SettingsAllowedSortFields = ['createdAt', 'updatedAt', 'id'] as const;

export enum SettingsDay {
  MONDAY = 'Monday',
  TUESDAY = 'Tuesday',
  WEDNESDAY = 'Wednesday',
  THURSDAY = 'Thursday',
  FRIDAY = 'Friday',
  SATURDAY = 'Saturday',
  SUNDAY = 'Sunday',
}

export enum SettingsTemplateType {
  RENEWAL_REMINDER = 'renewal_reminder',
  PAYMENT_RECEIPT = 'payment_receipt',
  WELCOME_MESSAGE = 'welcome_message',
  EXPIRY_ALERT = 'expiry_alert',
  PAYMENT_DUE = 'payment_due',
}

export enum SettingsTemplateChannel {
  WHATSAPP = 'whatsapp',
  EMAIL = 'email',
  BOTH = 'both',
}
