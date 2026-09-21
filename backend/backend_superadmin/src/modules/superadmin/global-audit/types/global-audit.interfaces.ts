// RESPONSIBILITY: Defines domain/data transfer shapes for the global-audit feature without ORM leakage.
// FLOW: DTO -> GlobalAuditInput -> service -> repository; entity -> mapper -> response DTO.
import type { SuperadminRole } from '@/core/auth/auth.types';

export interface GlobalAuditListQuery { page: number; limit: number; sortBy: string; sortOrder: 'ASC' | 'DESC'; search?: string;  tenantId?: string;}
export interface GlobalAuditCreateInput {
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
export interface GlobalAuditUpdateInput extends GlobalAuditCreateInput {}

export interface GlobalAuditDomainModel { id: string; createdAt: Date; updatedAt: Date; deletedAt: Date | null;
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
