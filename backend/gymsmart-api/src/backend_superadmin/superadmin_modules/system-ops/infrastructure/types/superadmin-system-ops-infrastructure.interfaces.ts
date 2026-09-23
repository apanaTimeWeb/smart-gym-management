// RESPONSIBILITY: Defines domain/data transfer shapes for the infrastructure feature without ORM leakage.
// FLOW: DTO -> InfrastructureInput -> service -> repository; entity -> mapper -> response DTO.
import type { SuperadminRole } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-auth.types';

export interface SuperadminInfrastructureListQuery { page: number; limit: number; sortBy: string; sortOrder: 'ASC' | 'DESC'; search?: string;  status?: string;}
export interface SuperadminInfrastructureCreateInput {
  name?: string;
  region?: string;
  status?: string;
  cpuPercent?: number;
  memoryPercent?: number;
  diskPercent?: number;
  uptime?: string;
  lastChecked?: Date;
}
export interface SuperadminInfrastructureUpdateInput extends SuperadminInfrastructureCreateInput {}

export interface SuperadminInfrastructureDomainModel { id: string; createdAt: Date; updatedAt: Date; deletedAt: Date | null;
  name: string;
  region: string;
  status: string;
  cpuPercent: number;
  memoryPercent: number;
  diskPercent: number;
  uptime: string;
  lastChecked: Date;
}
