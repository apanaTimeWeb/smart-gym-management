// RESPONSIBILITY: Defines domain/data transfer shapes for the global-audit feature without ORM leakage.
// FLOW: DTO -> GlobalAuditInput -> service -> repository; entity -> mapper -> response DTO.
import type { SuperadminRole } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-auth.types';

export interface SuperadminGlobalAuditListQuery { page: number; limit: number; sortBy: string; sortOrder: 'ASC' | 'DESC'; search?: string;  tenantId?: string;}
export interface SuperadminGlobalAuditCreateInput {
  actorId?: string;
  actorRole?: string;
  action?: string;
  entityType?: string;
  entityId?: string;
  oldValue?: unknown;
  newValue?: unknown;
  ipAddress?: string;
  tenantId?: string;
}
export interface SuperadminGlobalAuditUpdateInput extends SuperadminGlobalAuditCreateInput {}

export interface SuperadminGlobalAuditDomainModel { id: string; createdAt: Date; updatedAt: Date; deletedAt: Date | null;
  actorId: string;
  actorRole: string;
  action: string;
  entityType: string;
  entityId: string;
  oldValue: unknown;
  newValue: unknown;
  ipAddress: string;
  tenantId: string;
}
