// RESPONSIBILITY: Registers the isolated Admin branches feature slice only.
// FLOW: Nest module -> controllers -> micro-services -> repository/mapper.

import { Module } from '@nestjs/common';
import { AdminBranchesQueryController } from '@/modules/admin/branches/controllers/admin-branches-query.controller';
import { AdminBranchesQueryService } from '@/modules/admin/branches/services/admin-branches-query.service';
import { AdminBranchesRepository } from '@/modules/admin/branches/repositories/admin-branches-repository';
import { AdminBranchesMapper } from '@/modules/admin/branches/mappers/admin-branches.mapper';

@Module({
  controllers: [AdminBranchesQueryController],
  providers: [AdminBranchesQueryService, AdminBranchesRepository, AdminBranchesMapper],
  exports: [],
})
export class AdminBranchesModule {}
