// RESPONSIBILITY: Presents ORM-independent AdminAuditLogs domain data as the frontend response contract.
// FLOW: Domain object -> AdminAuditLogsResponsePresenter -> typed response DTO -> canonical response envelope.
import { Injectable } from '@nestjs/common';

import { AdminAuditLogsDomainModel } from '@/backend_admin/admin_modules/admin_audit_logs/audit_logs_domain/admin-audit-logs.domain.js';

import type { AdminAuditLogsKpiDto } from '@/backend_admin/admin_modules/admin_audit_logs/audit_logs_dtos/admin-audit-logs-response.dto.js';


/**
 * @description Owns frontend response presentation for the AdminAuditLogs feature.
 * @remarks This class must receive domain objects only and must never import or expose ORM entities.
 */
export class AdminAuditLogsResponsePresenter {
/** @description Returns the exact frontend response object. @param domain Domain audit model. @returns API response data. */
  toResponse(domain: AdminAuditLogsDomainModel): Record<string, unknown> {
    return { ...domain };
  }

/** @description Converts repository KPI counters into the exact typed response contract. @param source KPI counters. @returns Audit KPI response. */
  toKpiResponse(source: Record<string, number>): AdminAuditLogsKpiDto {
    return {
      totalEvents: Number(source.totalEvents ?? 0),
      highSeverity: Number(source.highSeverity ?? 0),
      mediumSeverity: Number(source.mediumSeverity ?? 0),
      lowSeverity: Number(source.lowSeverity ?? 0),
      eventsToday: Number(source.eventsToday ?? 0),
      uniqueUsers: Number(source.uniqueUsers ?? 0),
    };
  }
}
