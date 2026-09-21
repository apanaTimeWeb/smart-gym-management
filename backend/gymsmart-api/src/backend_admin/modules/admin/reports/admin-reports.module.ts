// RESPONSIBILITY: Registers the isolated Admin reports feature slice only.
// FLOW: Nest module -> controllers -> micro-services -> repository/mapper.

import { Module } from '@nestjs/common';
import { AdminReportsQueryController } from '@/backend_admin/modules/admin/reports/controllers/admin-reports-query.controller';
import { AdminReportsQueryService } from '@/backend_admin/modules/admin/reports/services/admin-reports-query.service';
import { AdminReportsRepository } from '@/backend_admin/modules/admin/reports/repositories/admin-reports-repository';
import { AdminReportsMapper } from '@/backend_admin/modules/admin/reports/mappers/admin-reports.mapper';
import { AdminReportsCommandController } from '@/backend_admin/modules/admin/reports/controllers/admin-reports-command.controller';
import { AdminReportsCommandService } from '@/backend_admin/modules/admin/reports/services/admin-reports-command.service';

@Module({
  controllers: [AdminReportsQueryController, AdminReportsCommandController],
  providers: [AdminReportsQueryService, AdminReportsRepository, AdminReportsMapper, AdminReportsCommandService],
  exports: [],
})
export class AdminReportsModule {}
