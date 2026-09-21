// RESPONSIBILITY: Registers the isolated Admin members feature slice only.
// FLOW: Nest module -> controllers -> micro-services -> repository/mapper.

import { Module } from '@nestjs/common';
import { AdminMembersQueryController } from '@/backend_admin/modules/admin/members/controllers/admin-members-query.controller';
import { AdminMembersQueryService } from '@/backend_admin/modules/admin/members/services/admin-members-query.service';
import { AdminMembersRepository } from '@/backend_admin/modules/admin/members/repositories/admin-members-repository';
import { AdminMembersMapper } from '@/backend_admin/modules/admin/members/mappers/admin-members.mapper';

@Module({
  controllers: [AdminMembersQueryController],
  providers: [AdminMembersQueryService, AdminMembersRepository, AdminMembersMapper],
  exports: [],
})
export class AdminMembersModule {}
