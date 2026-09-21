// RESPONSIBILITY: Registers the isolated Admin usage feature slice only.
// FLOW: Nest module -> controllers -> micro-services -> repository/mapper.

import { Module } from '@nestjs/common';
import { AdminUsageQueryController } from '@/backend_admin/modules/admin/usage/controllers/admin-usage-query.controller';
import { AdminUsageQueryService } from '@/backend_admin/modules/admin/usage/services/admin-usage-query.service';
import { AdminUsageRepository } from '@/backend_admin/modules/admin/usage/repositories/admin-usage-repository';
import { AdminUsageMapper } from '@/backend_admin/modules/admin/usage/mappers/admin-usage.mapper';
import { AdminUsageCommandController } from '@/backend_admin/modules/admin/usage/controllers/admin-usage-command.controller';
import { AdminUsageCommandService } from '@/backend_admin/modules/admin/usage/services/admin-usage-command.service';

@Module({
  controllers: [AdminUsageQueryController, AdminUsageCommandController],
  providers: [AdminUsageQueryService, AdminUsageRepository, AdminUsageMapper, AdminUsageCommandService],
  exports: [],
})
export class AdminUsageModule {}
