// RESPONSIBILITY: Registers the isolated Admin data-export feature slice only.
// FLOW: Nest module -> controllers -> micro-services -> repository/mapper.

import { Module } from '@nestjs/common';
import { AdminDataExportQueryController } from '@/backend_admin/modules/admin/data-export/controllers/admin-data_export-query.controller';
import { AdminDataExportQueryService } from '@/backend_admin/modules/admin/data-export/services/admin-data_export-query.service';
import { AdminDataExportRepository } from '@/backend_admin/modules/admin/data-export/repositories/admin-data_export-repository';
import { AdminDataExportMapper } from '@/backend_admin/modules/admin/data-export/mappers/admin-data_export.mapper';
import { AdminDataExportCommandController } from '@/backend_admin/modules/admin/data-export/controllers/admin-data_export-command.controller';
import { AdminDataExportCommandService } from '@/backend_admin/modules/admin/data-export/services/admin-data_export-command.service';

@Module({
  controllers: [AdminDataExportQueryController, AdminDataExportCommandController],
  providers: [AdminDataExportQueryService, AdminDataExportRepository, AdminDataExportMapper, AdminDataExportCommandService],
  exports: [],
})
export class AdminDataExportModule {}
