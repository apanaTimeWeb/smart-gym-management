// RESPONSIBILITY: TypeScript types for the Manager Settings module.

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

export type ManagerSettingsFetchState = 'idle' | 'loading' | 'success' | 'error';

export const LANGUAGE_OPTIONS = [
  { label: 'English (US)', value: 'en-US' },
  { label: 'Hindi (IN)', value: 'hi-IN' },
] as const;

export const TIMEZONE_OPTIONS = [
  { label: 'Asia/Kolkata (IST)', value: 'Asia/Kolkata' },
  { label: 'America/New_York (EST)', value: 'America/New_York' },
  { label: 'Europe/London (GMT)', value: 'Europe/London' },
] as const;
