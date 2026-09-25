// RESPONSIBILITY: Registers the isolated Admin reports feature slice only.
// FLOW: Nest module -> controllers -> micro-services -> repository/mapper.
import { Module } from '@nestjs/common';

import { AdminReportsCommandController } from '@/backend_admin/admin_modules/admin_reports/reports_controllers/admin-reports-command.controller.js';
import { AdminReportsQueryController } from '@/backend_admin/admin_modules/admin_reports/reports_controllers/admin-reports-query.controller.js';
import { AdminReportsMapper } from '@/backend_admin/admin_modules/admin_reports/reports_mappers/admin-reports.mapper.js';
import { AdminReportsResponsePresenter } from '@/backend_admin/admin_modules/admin_reports/reports_mappers/admin-reports.response.presenter.js';
import { AdminReportsRepository } from '@/backend_admin/admin_modules/admin_reports/reports_repositories/admin-reports-repository.js';
import { AdminReportsCommandService } from '@/backend_admin/admin_modules/admin_reports/reports_services/admin-reports-command.service.js';
import { AdminReportsQueryService } from '@/backend_admin/admin_modules/admin_reports/reports_services/admin-reports-query.service.js';
import { AdminReportsWorker } from '@/backend_admin/admin_modules/admin_reports/reports_workers/admin-reports.worker.js';

@Module({
  controllers: [AdminReportsQueryController, AdminReportsCommandController],
  providers: [AdminReportsQueryService, AdminReportsRepository, AdminReportsMapper, AdminReportsResponsePresenter, AdminReportsCommandService, AdminReportsWorker],
  exports: [],
})
/**
 * @description Defines the AdminReportsModule boundary for the admin_reports backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminReportsModule {}
