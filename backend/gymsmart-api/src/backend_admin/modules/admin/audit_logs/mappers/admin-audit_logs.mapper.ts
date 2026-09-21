// RESPONSIBILITY: Translates the immutable core audit entity into the exact Admin audit-log response contract.
// FLOW: CoreAuditLogEntity â†’ AdminAuditLogsMapper â†’ domain/response object.

import { Injectable } from '@nestjs/common';
import { CoreAuditLogEntity } from '@/backend_admin/core/audit/core-audit-log.entity';
import { AdminAuditLogsDomainModel } from '@/backend_admin/modules/admin/audit_logs/domain/admin-audit_logs.domain';

@Injectable()
export class AdminAuditLogsMapper {
  /** @description Converts one core audit row into the frontend audit-log contract. @param entity Immutable audit row. @returns ORM-independent domain model. */
  toDomain(entity: CoreAuditLogEntity): AdminAuditLogsDomainModel {
    const newValue = entity.newValue && typeof entity.newValue === 'object' ? entity.newValue as Record<string, unknown> : {};
    const oldValue = entity.oldValue && typeof entity.oldValue === 'object' ? entity.oldValue as Record<string, unknown> : {};
    return {
      id: entity.id,
      timestamp: entity.timestamp.toISOString(),
      action: entity.action,
      user: entity.actorId ?? entity.actorRole ?? 'system',
      branchId: typeof newValue.branchId === 'string' ? newValue.branchId : typeof oldValue.branchId === 'string' ? oldValue.branchId : '',
      details: JSON.stringify(newValue || oldValue || {}),
      severity: this.normalizeSeverity(entity.severity),
      ip: entity.ipAddress ?? '',
      module: this.normalizeModule(entity.module),
      affectedRecordId: entity.entityId ?? undefined,
    };
  }

  /** @description Returns the exact frontend response object. @param domain Domain audit model. @returns API response data. */
  toResponse(domain: AdminAuditLogsDomainModel): Record<string, unknown> {
    return { ...domain };
  }

  private normalizeSeverity(value: string): AdminAuditLogsDomainModel['severity'] {
    return value === 'high' || value === 'medium' ? value : 'low';
  }

  private normalizeModule(value: string | null): AdminAuditLogsDomainModel['module'] {
    const allowed: AdminAuditLogsDomainModel['module'][] = ['Finance', 'Members', 'HR', 'Plans', 'Auth', 'Settings', 'Branches', 'Store', 'Attendance'];
    return value && allowed.includes(value as AdminAuditLogsDomainModel['module']) ? value as AdminAuditLogsDomainModel['module'] : 'Settings';
  }
}
