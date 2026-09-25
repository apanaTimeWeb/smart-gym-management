// RESPONSIBILITY: Registers the isolated Admin data-export feature slice only.
// FLOW: Nest module -> controllers -> micro-services -> repository/mapper.
import { Module } from '@nestjs/common';

import { AdminDataExportCommandController } from '@/backend_admin/admin_modules/admin_data-export/data-export_controllers/admin-data-export-command.controller'
import { AdminDataExportQueryController } from '@/backend_admin/admin_modules/admin_data-export/data-export_controllers/admin-data-export-query.controller'
import { AdminDataExportMapper } from '@/backend_admin/admin_modules/admin_data-export/data-export_mappers/admin-data-export.mapper'
import { AdminDataExportResponsePresenter } from '@/backend_admin/admin_modules/admin_data-export/data-export_mappers/admin-data-export.response.presenter'
import { AdminDataExportRepository } from '@/backend_admin/admin_modules/admin_data-export/data-export_repositories/admin-data-export-repository'
import { AdminDataExportRetentionRepository } from '@/backend_admin/admin_modules/admin_data-export/data-export_repositories/admin-data-export-retention.repository'
import { AdminDataExportCommandService } from '@/backend_admin/admin_modules/admin_data-export/data-export_services/admin-data-export-command.service'
import { AdminDataExportQueryService } from '@/backend_admin/admin_modules/admin_data-export/data-export_services/admin-data-export-query.service'
import { AdminDataExportWorker } from '@/backend_admin/admin_modules/admin_data-export/data-export_workers/admin-data-export.worker'

@Module({
  controllers: [AdminDataExportQueryController, AdminDataExportCommandController],
  providers: [AdminDataExportQueryService, AdminDataExportRepository, AdminDataExportRetentionRepository, AdminDataExportMapper, AdminDataExportResponsePresenter, AdminDataExportCommandService, AdminDataExportWorker],
  exports: [],
})
/**
 * @description Defines the AdminDataExportModule boundary for the admin_data-export backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminDataExportModule {}
