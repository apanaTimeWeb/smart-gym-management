// RESPONSIBILITY: Defines domain/data transfer shapes for the jobs feature without ORM leakage.
// FLOW: DTO -> JobsInput -> service -> repository; entity -> mapper -> response DTO.
import type { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';

export interface JobsListQuery { page: number; limit: number; sortBy: string; sortOrder: 'ASC' | 'DESC'; search?: string;  status?: string; tenantId?: string;}
export interface JobsCreateInput {
  queueName?: string;
  jobName?: string;
  status?: string;
  attempts?: number;
  error?: string;
  tenantId?: string;
}
export interface JobsUpdateInput extends JobsCreateInput {}

export interface JobsDomainModel { id: string; createdAt: Date; updatedAt: Date; deletedAt: Date | null;
  queueName: string;
  jobName: string;
  status: string;
  attempts: number;
  error: string;
  tenantId: string;
}
