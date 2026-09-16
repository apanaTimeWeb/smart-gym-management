// RESPONSIBILITY: Defines the minimal role permission contract consumed by Admin Settings.
export type AdminSettingsRole = 'manager' | 'trainer';
export interface AdminSettingsRolePermission { role: AdminSettingsRole; permissions: Record<string, boolean>; }
