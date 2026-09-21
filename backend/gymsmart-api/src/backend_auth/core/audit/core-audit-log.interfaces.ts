// RESPONSIBILITY: Defines the persistence-neutral audit event contract consumed by CoreAuditService.
// FLOW: Feature service/orchestrator -> CoreAuditService -> CoreAuditLogInput -> CoreAuditLogRepository.

import type { CoreAuditActorRole } from '@/backend_auth/core/audit/core-audit.constants';

export interface CoreAuditLogInput {
  actorId: string | null;
  actorRole: CoreAuditActorRole | null;
  action: string;
  entityType: string;
  entityId: string | null;
  oldValue: Record<string, unknown> | null;
  newValue: Record<string, unknown> | null;
  ipAddress: string | null;
}
