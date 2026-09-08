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
  updatedAt: string;
}

export interface UpdateSettingPayload {
  value: string;
}

export type SettingsFetchState = 'idle' | 'loading' | 'success' | 'error';
