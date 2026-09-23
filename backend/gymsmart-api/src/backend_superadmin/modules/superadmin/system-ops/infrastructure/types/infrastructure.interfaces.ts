// RESPONSIBILITY: Defines domain/data transfer shapes for the infrastructure feature without ORM leakage.
// FLOW: DTO -> InfrastructureInput -> service -> repository; entity -> mapper -> response DTO.
import type { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';

export interface InfrastructureListQuery { page: number; limit: number; sortBy: string; sortOrder: 'ASC' | 'DESC'; search?: string;  status?: string;}
export interface InfrastructureCreateInput {
  name?: string;
  region?: string;
  status?: string;
  cpuPercent?: number;
  memoryPercent?: number;
  diskPercent?: number;
  uptime?: string;
  lastChecked?: Date;
}
export interface InfrastructureUpdateInput extends InfrastructureCreateInput {}

export interface InfrastructureDomainModel { id: string; createdAt: Date; updatedAt: Date; deletedAt: Date | null;
  name: string;
  region: string;
  status: string;
  cpuPercent: number;
  memoryPercent: number;
  diskPercent: number;
  uptime: string;
  lastChecked: Date;
}
