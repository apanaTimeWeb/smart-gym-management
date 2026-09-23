// RESPONSIBILITY: Defines domain/data transfer shapes for the migrations feature without ORM leakage.
// FLOW: DTO -> MigrationsInput -> service -> repository; entity -> mapper -> response DTO.
import type { SuperadminRole } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-auth.types';

export interface SuperadminMigrationsListQuery { page: number; limit: number; sortBy: string; sortOrder: 'ASC' | 'DESC'; search?: string;  status?: string;}
export interface SuperadminMigrationsCreateInput {
  version?: string;
  description?: string;
  appliedAt?: Date | null;
  status?: string;
  targetTenants?: unknown;
  durationMs?: number;
  errorLog?: string | null;
  executedAt?: Date | null;
  executedBy?: string;
  errorDetails?: string | null;
}
export interface SuperadminMigrationsUpdateInput extends SuperadminMigrationsCreateInput {}

export interface SuperadminMigrationsDomainModel { id: string; createdAt: Date; updatedAt: Date; deletedAt: Date | null;
  version: string;
  description: string;
  appliedAt: Date | null;
  status: string;
  targetTenants: unknown;
  durationMs: number;
  errorLog: string;
  executedAt: Date | null;
  executedBy: string;
  errorDetails: string;
}
