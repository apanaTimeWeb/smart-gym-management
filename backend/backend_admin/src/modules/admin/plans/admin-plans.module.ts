// RESPONSIBILITY: Registers the isolated Admin plans feature slice only.
// FLOW: Nest module -> controllers -> micro-services -> repository/mapper.

import { Module } from '@nestjs/common';
import { AdminPlansQueryController } from '@/modules/admin/plans/controllers/admin-plans-query.controller';
import { AdminPlansQueryService } from '@/modules/admin/plans/services/admin-plans-query.service';
import { AdminPlansRepository } from '@/modules/admin/plans/repositories/admin-plans-repository';
import { AdminPlansMapper } from '@/modules/admin/plans/mappers/admin-plans.mapper';
import { AdminPlansCommandController } from '@/modules/admin/plans/controllers/admin-plans-command.controller';
import { AdminPlansCommandService } from '@/modules/admin/plans/services/admin-plans-command.service';

@Module({
  controllers: [AdminPlansQueryController, AdminPlansCommandController],
  providers: [AdminPlansQueryService, AdminPlansRepository, AdminPlansMapper, AdminPlansCommandService],
  exports: [],
})
export class AdminPlansModule {}
