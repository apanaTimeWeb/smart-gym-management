// RESPONSIBILITY: Translates the immutable core audit entity into the exact Admin audit-log response contract.
// FLOW: AdminCoreAuditLogEntity â†’ AdminAuditLogsMapper â†’ domain/response object.
import { Injectable } from '@nestjs/common';

import { AdminCoreAuditLogEntity } from '@/backend_admin/admin_core/admin_core_audit/admin-core-audit-log.entity.js';

import { AdminAuditLogsDomainModel } from '@/backend_admin/admin_modules/admin_audit_logs/audit_logs_domain/admin-audit-logs.domain.js';

import type { AdminAuditLogsKpiDto } from '@/backend_admin/admin_modules/admin_audit_logs/audit_logs_dtos/admin-audit-logs-response.dto.js';

/**
 * @description Owns the ORM-to-domain translation boundary for AdminAuditLogs.
 * @remarks This persistence mapper is called only by the owning repository; response presentation belongs to the paired presenter.
 */
export class AdminAuditLogsMapper {
/** @description Converts one core audit row into the frontend audit-log contract. @param entity Immutable audit row. @returns ORM-independent domain model. */
  toDomain(entity: AdminCoreAuditLogEntity): AdminAuditLogsDomainModel {
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
      userAgent: entity.userAgent ?? undefined,
      affectedRecordId: entity.entityId ?? undefined,
    } as any;
  }

/** @description Normalizes an audit severity to the finite frontend contract. @param value Persisted severity. @returns Allowed severity value. */
  private normalizeSeverity(value: string): AdminAuditLogsDomainModel['severity'] {
    const normalized = String(value ?? '').toUpperCase();
    return normalized === 'HIGH' ? 'high' : normalized === 'MEDIUM' ? 'medium' : 'low';
  }

/** @description Normalizes an audit module to the finite frontend contract. @param value Persisted module name. @returns Allowed module value. */
  private normalizeModule(value: string | null): AdminAuditLogsDomainModel['module'] {
    const labels: Record<string, AdminAuditLogsDomainModel['module']> = {
      finance: 'Finance', members: 'Members', hr: 'HR', plans: 'Plans', auth: 'Auth', settings: 'Settings',
      branches: 'Branches', store: 'Store', attendance: 'Attendance', 'data-export': 'Settings',
    };
    return value ? labels[value.toLowerCase()] ?? 'Settings' : 'Settings';
  }
}
