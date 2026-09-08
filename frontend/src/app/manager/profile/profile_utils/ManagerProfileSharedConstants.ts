// RESPONSIBILITY: Centralized constants for the Manager Profile module.

export const MANAGER_PROFILE_TABS = [
  { id: 'personal' as const, label: 'Personal Info' },
  { id: 'security' as const, label: 'Security' },
] as const;

export type ManagerProfileTabId = typeof MANAGER_PROFILE_TABS[number]['id'];
