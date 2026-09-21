// RESPONSIBILITY: Defines domain/data transfer shapes for the integrations feature without ORM leakage.
// FLOW: DTO -> IntegrationsInput -> service -> repository; entity -> mapper -> response DTO.
import type { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';

export interface IntegrationsListQuery { page: number; limit: number; sortBy: string; sortOrder: 'ASC' | 'DESC'; search?: string;  status?: string; tenantId?: string;}
export interface IntegrationsCreateInput {
  tenantId?: string;
  label?: string;
  status?: string;
  lastUsed?: Date | null;
  rateLimit?: number;
  secretHash?: string;
}
export interface IntegrationsUpdateInput extends IntegrationsCreateInput {}

export interface IntegrationsDomainModel { id: string; createdAt: Date; updatedAt: Date; deletedAt: Date | null;
  tenantId: string;
  label: string;
  status: string;
  lastUsed: Date | null;
  rateLimit: number;
  secretHash: string;
}
