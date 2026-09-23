// RESPONSIBILITY: Defines domain/data transfer shapes for the jobs feature without ORM leakage.
// FLOW: DTO -> JobsInput -> service -> repository; entity -> mapper -> response DTO.
import type { SuperadminRole } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-auth.types';

export interface SuperadminJobsListQuery { page: number; limit: number; sortBy: string; sortOrder: 'ASC' | 'DESC'; search?: string;  status?: string; tenantId?: string;}
export interface SuperadminJobsCreateInput {
  queueName?: string;
  jobName?: string;
  status?: string;
  attempts?: number;
  error?: string;
  tenantId?: string;
}
export interface SuperadminJobsUpdateInput extends SuperadminJobsCreateInput {}

export interface SuperadminJobsDomainModel { id: string; createdAt: Date; updatedAt: Date; deletedAt: Date | null;
  queueName: string;
  jobName: string;
  status: string;
  attempts: number;
  error: string;
  tenantId: string;
}
