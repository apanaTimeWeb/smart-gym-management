// RESPONSIBILITY: Registers the isolated Admin audit_logs feature slice only.
// FLOW: Nest module -> controllers -> micro-services -> repository/mapper.

import { Module } from '@nestjs/common';
import { AdminAuditLogsQueryController } from '@/backend_admin/modules/admin/audit_logs/controllers/admin-audit_logs-query.controller';
import { AdminAuditLogsQueryService } from '@/backend_admin/modules/admin/audit_logs/services/admin-audit_logs-query.service';
import { AdminAuditLogsRepository } from '@/backend_admin/modules/admin/audit_logs/repositories/admin-audit_logs-repository';
import { AdminAuditLogsMapper } from '@/backend_admin/modules/admin/audit_logs/mappers/admin-audit_logs.mapper';

@Module({
  controllers: [AdminAuditLogsQueryController],
  providers: [AdminAuditLogsQueryService, AdminAuditLogsRepository, AdminAuditLogsMapper],
  exports: [],
})
export class AdminAuditLogsModule {}
