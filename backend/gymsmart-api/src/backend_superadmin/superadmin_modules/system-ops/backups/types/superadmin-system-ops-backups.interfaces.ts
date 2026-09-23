// RESPONSIBILITY: Defines domain/data transfer shapes for the backups feature without ORM leakage.
// FLOW: DTO -> BackupsInput -> service -> repository; entity -> mapper -> response DTO.
import type { SuperadminRole } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-auth.types';

export interface SuperadminBackupsListQuery { page: number; limit: number; sortBy: string; sortOrder: 'ASC' | 'DESC'; search?: string;  status?: string;}
export interface SuperadminBackupsCreateInput {
  tenantName?: string;
  databaseName?: string;
  sizeMB?: number;
  status?: string;
  timestamp?: Date;
}
export interface SuperadminBackupsUpdateInput extends SuperadminBackupsCreateInput {}

export interface SuperadminBackupsDomainModel { id: string; createdAt: Date; updatedAt: Date; deletedAt: Date | null;
  tenantName: string;
  databaseName: string;
  sizeMB: number;
  status: string;
  timestamp: Date;
}
