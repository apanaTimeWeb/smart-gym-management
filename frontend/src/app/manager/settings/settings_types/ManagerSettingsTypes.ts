// RESPONSIBILITY: TypeScript types for the Manager Settings module.
// Covers all tabs: Region/Notifications, Gym Profile, Operating Hours,
// Membership Settings, and Notification Templates.

// ─── Enums & Literal Types ────────────────────────────────────────────────────
export type ManagerSettingsFetchState = 'idle' | 'loading' | 'success' | 'error';
export type SettingsTab = 'region' | 'gym_profile' | 'operating_hours' | 'membership' | 'notification_templates';
export type NotificationTemplateType = 'renewal_reminder' | 'payment_receipt' | 'welcome_message' | 'expiry_alert' | 'payment_due';
export type RecurringFrequency = 'Daily' | 'Weekly' | 'Monthly';

// ─── Region & Notifications ───────────────────────────────────────────────────
export interface ManagerSettingsPreferences {
  language: string;
  timezone: string;
  pushNotificationsEnabled: boolean;
  emailDailyReports: boolean;
}

export interface UpdateManagerSettingsPayload {
  language?: string;
  timezone?: string;
  pushNotificationsEnabled?: boolean;
  emailDailyReports?: boolean;
}

// ─── Gym Profile ──────────────────────────────────────────────────────────────
export interface GymProfile {
  gymName: string;
  logoUrl?: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  email: string;
  website?: string;
  gstin?: string;
}

export interface UpdateGymProfilePayload extends Partial<GymProfile> {}

// ─── Operating Hours ─────────────────────────────────────────────────────────
export type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

export interface OperatingHoursDay {
  day: DayOfWeek;
  isOpen: boolean;
  openTime: string;   // HH:mm
  closeTime: string;  // HH:mm
}

export type OperatingHours = OperatingHoursDay[];

// ─── Membership Settings ─────────────────────────────────────────────────────
export interface MembershipSettings {
  gracePeriodDays: number;
  autoSuspendOnExpiry: boolean;
  autoSuspendAfterDays: number;
  allowFreeze: boolean;
  maxFreezeDaysPerYear: number;
  reminderDaysBefore: number;
}

export interface UpdateMembershipSettingsPayload extends Partial<MembershipSettings> {}

// ─── Notification Templates ───────────────────────────────────────────────────
export interface NotificationTemplate {
  id: string;
  type: NotificationTemplateType;
  channel: 'whatsapp' | 'email' | 'both';
  subject?: string;
  body: string;
  variables: string[];   // e.g. ['{{member_name}}', '{{expiry_date}}']
  isActive: boolean;
  updatedAt: string;
}

export interface UpdateNotificationTemplatePayload {
  channel?: NotificationTemplate['channel'];
  subject?: string;
  body?: string;
  isActive?: boolean;
}

// ─── Aggregated Settings (fetched together) ───────────────────────────────────
export interface ManagerAllSettings {
  preferences: ManagerSettingsPreferences;
  gymProfile: GymProfile;
  operatingHours: OperatingHours;
  membershipSettings: MembershipSettings;
  notificationTemplates: NotificationTemplate[];
}

// ─── Dropdown Options (centralized per Rule 3B) ───────────────────────────────
export const LANGUAGE_OPTIONS = [
  { label: 'English (US)', value: 'en-US' },
  { label: 'Hindi (IN)', value: 'hi-IN' },
] as const;

export const TIMEZONE_OPTIONS = [
  { label: 'Asia/Kolkata (IST)', value: 'Asia/Kolkata' },
  { label: 'America/New_York (EST)', value: 'America/New_York' },
  { label: 'Europe/London (GMT)', value: 'Europe/London' },
] as const;

export const SETTINGS_TABS: { id: SettingsTab; label: string }[] = [
  { id: 'region', label: 'Region & Notifications' },
  { id: 'gym_profile', label: 'Gym Profile' },
  { id: 'operating_hours', label: 'Operating Hours' },
  { id: 'membership', label: 'Membership Settings' },
  { id: 'notification_templates', label: 'Notification Templates' },
];

export const DAYS_OF_WEEK: DayOfWeek[] = [
  'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday',
];

export const NOTIFICATION_TEMPLATE_LABELS: Record<NotificationTemplateType, string> = {
  renewal_reminder: 'Renewal Reminder',
  payment_receipt: 'Payment Receipt',
  welcome_message: 'Welcome Message',
  expiry_alert: 'Expiry Alert',
  payment_due: 'Payment Due Reminder',
};
