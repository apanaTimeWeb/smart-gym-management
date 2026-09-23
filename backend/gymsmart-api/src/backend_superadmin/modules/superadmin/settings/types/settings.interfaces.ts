// RESPONSIBILITY: Defines domain/data transfer shapes for the settings feature without ORM leakage.
// FLOW: DTO -> SettingsInput -> service -> repository; entity -> mapper -> response DTO.
import type { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';

export interface SettingsListQuery { page: number; limit: number; sortBy: string; sortOrder: 'ASC' | 'DESC'; search?: string; }
export interface SettingsCreateInput {
  key?: string;
  value?: string;
  description?: string;
  category?: string;
  dataType?: string;
}
export interface SettingsUpdateInput extends SettingsCreateInput {}

export interface SettingsDomainModel { id: string; createdAt: Date; updatedAt: Date; deletedAt: Date | null;
  key: string;
  value: string;
  description: string;
  category: string;
  dataType: string;
}
