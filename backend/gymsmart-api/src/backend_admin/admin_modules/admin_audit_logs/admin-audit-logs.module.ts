// RESPONSIBILITY: Registers the isolated Admin audit_logs feature slice only.
// FLOW: Nest module -> controllers -> micro-services -> repository/mapper.
import { Module } from '@nestjs/common';

import { AdminAuditLogsQueryController } from '@/backend_admin/admin_modules/admin_audit_logs/audit_logs_controllers/admin-audit-logs-query.controller'
import { AdminAuditLogsMapper } from '@/backend_admin/admin_modules/admin_audit_logs/audit_logs_mappers/admin-audit-logs.mapper'
import { AdminAuditLogsResponsePresenter } from '@/backend_admin/admin_modules/admin_audit_logs/audit_logs_mappers/admin-audit-logs.response.presenter'
import { AdminAuditLogsRepository } from '@/backend_admin/admin_modules/admin_audit_logs/audit_logs_repositories/admin-audit-logs-repository'
import { AdminAuditLogsQueryService } from '@/backend_admin/admin_modules/admin_audit_logs/audit_logs_services/admin-audit-logs-query.service'

@Module({
  controllers: [AdminAuditLogsQueryController],
  providers: [AdminAuditLogsQueryService, AdminAuditLogsRepository, AdminAuditLogsMapper, AdminAuditLogsResponsePresenter],
  exports: [],
})
/**
 * @description Defines the AdminAuditLogsModule boundary for the admin_audit_logs backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminAuditLogsModule {}
