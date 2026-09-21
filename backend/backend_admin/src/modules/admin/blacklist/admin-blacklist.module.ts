// RESPONSIBILITY: Registers the isolated Admin blacklist feature slice only.
// FLOW: Nest module -> controllers -> micro-services -> repository/mapper.

import { Module } from '@nestjs/common';
import { AdminBlacklistQueryController } from '@/modules/admin/blacklist/controllers/admin-blacklist-query.controller';
import { AdminBlacklistQueryService } from '@/modules/admin/blacklist/services/admin-blacklist-query.service';
import { AdminBlacklistRepository } from '@/modules/admin/blacklist/repositories/admin-blacklist-repository';
import { AdminBlacklistMapper } from '@/modules/admin/blacklist/mappers/admin-blacklist.mapper';
import { AdminBlacklistCommandController } from '@/modules/admin/blacklist/controllers/admin-blacklist-command.controller';
import { AdminBlacklistCommandService } from '@/modules/admin/blacklist/services/admin-blacklist-command.service';

@Module({
  controllers: [AdminBlacklistQueryController, AdminBlacklistCommandController],
  providers: [AdminBlacklistQueryService, AdminBlacklistRepository, AdminBlacklistMapper, AdminBlacklistCommandService],
  exports: [],
})
export class AdminBlacklistModule {}
