// RESPONSIBILITY: Defines domain/data transfer shapes for the settings feature without ORM leakage.
// FLOW: DTO -> SettingsInput -> service -> repository; entity -> mapper -> response DTO.
import type { SuperadminRole } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-auth.types';

export interface SuperadminSettingsListQuery { page: number; limit: number; sortBy: string; sortOrder: 'ASC' | 'DESC'; search?: string; }
export interface SuperadminSettingsCreateInput {
  key?: string;
  value?: string;
  description?: string;
  category?: string;
  dataType?: string;
}
export interface SuperadminSettingsUpdateInput extends SuperadminSettingsCreateInput {}

export interface SuperadminSettingsDomainModel { id: string; createdAt: Date; updatedAt: Date; deletedAt: Date | null;
  key: string;
  value: string;
  description: string;
  category: string;
  dataType: string;
}
