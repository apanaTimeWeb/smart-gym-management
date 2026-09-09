// RESPONSIBILITY: TypeScript types for the Superadmin Settings module.

export type SettingDataType = 'STRING' | 'NUMBER' | 'BOOLEAN' | 'JSON';
export type SettingCategory = 'GENERAL' | 'BILLING' | 'SECURITY' | 'NOTIFICATIONS' | 'INTEGRATIONS';

export interface PlatformSetting {
  id: string;
  key: string;
  value: string;
  dataType: SettingDataType;
  category: SettingCategory;
  label: string;
  description: string;
  isPublic: boolean;
  isReadOnly?: boolean;
  updatedAt: string;
  updatedBy?: string;
}

/** Tracks who changed what setting and when — used for Settings changelog view */
export interface SettingChangelogEntry {
  settingKey: string;
  oldValue: string;
  newValue: string;
  changedBy: string;
  changedAt: string;
}

export interface UpdateSettingPayload {
  value: string;
}

export type SettingsFetchState = 'idle' | 'loading' | 'success' | 'error';
