// RESPONSIBILITY: Registers the isolated Admin blacklist feature slice only.
// FLOW: Nest module -> controllers -> micro-services -> repository/mapper.
import { Module } from '@nestjs/common';

import { AdminBlacklistCommandController } from '@/backend_admin/admin_modules/admin_blacklist/blacklist_controllers/admin-blacklist-command.controller'
import { AdminBlacklistQueryController } from '@/backend_admin/admin_modules/admin_blacklist/blacklist_controllers/admin-blacklist-query.controller'
import { AdminBlacklistMapper } from '@/backend_admin/admin_modules/admin_blacklist/blacklist_mappers/admin-blacklist.mapper'
import { AdminBlacklistResponsePresenter } from '@/backend_admin/admin_modules/admin_blacklist/blacklist_mappers/admin-blacklist.response.presenter'
import { AdminBlacklistRepository } from '@/backend_admin/admin_modules/admin_blacklist/blacklist_repositories/admin-blacklist-repository'
import { AdminBlacklistCommandService } from '@/backend_admin/admin_modules/admin_blacklist/blacklist_services/admin-blacklist-command.service'
import { AdminBlacklistQueryService } from '@/backend_admin/admin_modules/admin_blacklist/blacklist_services/admin-blacklist-query.service'

@Module({
  controllers: [AdminBlacklistQueryController, AdminBlacklistCommandController],
  providers: [AdminBlacklistQueryService, AdminBlacklistRepository, AdminBlacklistMapper, AdminBlacklistResponsePresenter, AdminBlacklistCommandService],
  exports: [],
})
/**
 * @description Defines the AdminBlacklistModule boundary for the admin_blacklist backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminBlacklistModule {}
