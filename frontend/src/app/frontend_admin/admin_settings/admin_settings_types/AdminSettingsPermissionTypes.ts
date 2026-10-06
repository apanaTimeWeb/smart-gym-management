// RESPONSIBILITY: Defines the minimal role permission contract consumed by Admin Settings.
export type AdminSettingsRole = 'manager' | 'trainer';
export interface AdminSettingsRolePermission { role: AdminSettingsRole; permissions: Record<string, boolean>; }
export interface AdminSettingsGymPermissionOverride { gymId: string; gymName: string; role: AdminSettingsRole; overrides: Record<string, boolean>; }
