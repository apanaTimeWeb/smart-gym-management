// RESPONSIBILITY: Registers the isolated Admin profile feature slice only.
// FLOW: Nest module -> controllers -> micro-services -> repository/mapper.

import { Module } from '@nestjs/common';
import { AdminProfileQueryController } from '@/modules/admin/profile/controllers/admin-profile-query.controller';
import { AdminProfileQueryService } from '@/modules/admin/profile/services/admin-profile-query.service';
import { AdminProfileRepository } from '@/modules/admin/profile/repositories/admin-profile-repository';
import { AdminProfileMapper } from '@/modules/admin/profile/mappers/admin-profile.mapper';
import { AdminProfileCommandController } from '@/modules/admin/profile/controllers/admin-profile-command.controller';
import { AdminProfileCommandService } from '@/modules/admin/profile/services/admin-profile-command.service';

@Module({
  controllers: [AdminProfileQueryController, AdminProfileCommandController],
  providers: [AdminProfileQueryService, AdminProfileRepository, AdminProfileMapper, AdminProfileCommandService],
  exports: [],
})
export class AdminProfileModule {}
