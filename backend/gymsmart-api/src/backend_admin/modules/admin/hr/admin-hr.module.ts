// RESPONSIBILITY: Registers the isolated Admin hr feature slice only.
// FLOW: Nest module -> controllers -> micro-services -> repository/mapper.

import { Module } from '@nestjs/common';
import { AdminHrQueryController } from '@/backend_admin/modules/admin/hr/controllers/admin-hr-query.controller';
import { AdminHrQueryService } from '@/backend_admin/modules/admin/hr/services/admin-hr-query.service';
import { AdminHrRepository } from '@/backend_admin/modules/admin/hr/repositories/admin-hr-repository';
import { AdminHrMapper } from '@/backend_admin/modules/admin/hr/mappers/admin-hr.mapper';
import { AdminHrCommandController } from '@/backend_admin/modules/admin/hr/controllers/admin-hr-command.controller';
import { AdminHrCommandService } from '@/backend_admin/modules/admin/hr/services/admin-hr-command.service';

@Module({
  controllers: [AdminHrQueryController, AdminHrCommandController],
  providers: [AdminHrQueryService, AdminHrRepository, AdminHrMapper, AdminHrCommandService],
  exports: [],
})
export class AdminHrModule {}
