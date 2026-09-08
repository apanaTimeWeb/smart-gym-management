// RESPONSIBILITY: Centralized constants for the Admin Profile module.

export const ADMIN_PROFILE_TABS = [
  { id: 'personal' as const, label: 'Personal Info' },
  { id: 'security' as const, label: 'Security' },
] as const;

export type AdminProfileTabId = typeof ADMIN_PROFILE_TABS[number]['id'];
