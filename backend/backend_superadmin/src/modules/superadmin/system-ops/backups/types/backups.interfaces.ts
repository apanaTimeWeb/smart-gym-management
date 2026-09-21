// RESPONSIBILITY: Defines domain/data transfer shapes for the backups feature without ORM leakage.
// FLOW: DTO -> BackupsInput -> service -> repository; entity -> mapper -> response DTO.
import type { SuperadminRole } from '@/core/auth/auth.types';

export interface BackupsListQuery { page: number; limit: number; sortBy: string; sortOrder: 'ASC' | 'DESC'; search?: string;  status?: string;}
export interface BackupsCreateInput {
  tenantName?: string;
  databaseName?: string;
  sizeMB?: number;
  status?: string;
  timestamp?: Date;
}
export interface BackupsUpdateInput extends BackupsCreateInput {}

export interface BackupsDomainModel { id: string; createdAt: Date; updatedAt: Date; deletedAt: Date | null;
  tenantName: string;
  databaseName: string;
  sizeMB: number;
  status: string;
  timestamp: Date;
}
