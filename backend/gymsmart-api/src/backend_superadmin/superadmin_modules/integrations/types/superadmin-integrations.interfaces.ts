// RESPONSIBILITY: Defines domain/data transfer shapes for the integrations feature without ORM leakage.
// FLOW: DTO -> IntegrationsInput -> service -> repository; entity -> mapper -> response DTO.
import type { SuperadminRole } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-auth.types';
import type { IntegrationKeyScope } from '@/backend_superadmin/superadmin_modules/integrations/superadmin-integrations.constants';

export interface SuperadminIntegrationsListQuery { page: number; limit: number; sortBy: string; sortOrder: 'ASC' | 'DESC'; search?: string;  status?: string; tenantId?: string;}
export interface SuperadminIntegrationsCreateInput {
  tenantId?: string;
  label?: string;
  status?: string;
  lastUsed?: Date | null;
  rateLimit?: number;
  secretHash?: string;
  scopes?: IntegrationKeyScope[];
}
export interface SuperadminIntegrationsUpdateInput extends SuperadminIntegrationsCreateInput {}

export interface SuperadminIntegrationsDomainModel { id: string; createdAt: Date; updatedAt: Date; deletedAt: Date | null;
  tenantId: string;
  label: string;
  status: string;
  lastUsed: Date | null;
  rateLimit: number;
  secretHash: string;
  scopes: IntegrationKeyScope[];
}
