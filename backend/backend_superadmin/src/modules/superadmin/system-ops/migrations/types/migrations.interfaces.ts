// RESPONSIBILITY: Defines domain/data transfer shapes for the migrations feature without ORM leakage.
// FLOW: DTO -> MigrationsInput -> service -> repository; entity -> mapper -> response DTO.
import type { SuperadminRole } from '@/core/auth/auth.types';

export interface MigrationsListQuery { page: number; limit: number; sortBy: string; sortOrder: 'ASC' | 'DESC'; search?: string;  status?: string;}
export interface MigrationsCreateInput {
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
export interface MigrationsUpdateInput extends MigrationsCreateInput {}

export interface MigrationsDomainModel { id: string; createdAt: Date; updatedAt: Date; deletedAt: Date | null;
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
