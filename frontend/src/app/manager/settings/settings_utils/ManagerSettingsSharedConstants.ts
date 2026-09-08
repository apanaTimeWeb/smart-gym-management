// RESPONSIBILITY: Centralized constants for the Manager Settings module.

export const SETTINGS_TABS = [
  { id: 'general' as const, label: 'General' },
  { id: 'notifications' as const, label: 'Notifications' },
  { id: 'security' as const, label: 'Security' },
  { id: 'integrations' as const, label: 'Integrations' },
] as const;

export type SettingsTabId = typeof SETTINGS_TABS[number]['id'];

export const TIMEZONE_OPTIONS = [
  { value: 'Asia/Kolkata', label: 'IST — Asia/Kolkata (UTC+5:30)' },
  { value: 'UTC', label: 'UTC' },
  { value: 'America/New_York', label: 'EST — America/New_York' },
] as const;

export const CURRENCY_OPTIONS = [
  { value: 'INR', label: '₹ Indian Rupee (INR)' },
  { value: 'USD', label: '$ US Dollar (USD)' },
  { value: 'EUR', label: '€ Euro (EUR)' },
] as const;
