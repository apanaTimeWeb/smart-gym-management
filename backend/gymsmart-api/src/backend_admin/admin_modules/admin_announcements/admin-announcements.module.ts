// RESPONSIBILITY: Registers the isolated Admin announcements feature slice only.
// FLOW: Nest module -> controllers -> micro-services -> repository/mapper.
import { Module } from '@nestjs/common';

import { AdminAnnouncementsCommandController } from '@/backend_admin/admin_modules/admin_announcements/announcements_controllers/admin-announcements-command.controller.js';
import { AdminAnnouncementsQueryController } from '@/backend_admin/admin_modules/admin_announcements/announcements_controllers/admin-announcements-query.controller.js';
import { AdminAnnouncementsMapper } from '@/backend_admin/admin_modules/admin_announcements/announcements_mappers/admin-announcements.mapper.js';
import { AdminAnnouncementsResponsePresenter } from '@/backend_admin/admin_modules/admin_announcements/announcements_mappers/admin-announcements.response.presenter.js';
import { AdminAnnouncementsRepository } from '@/backend_admin/admin_modules/admin_announcements/announcements_repositories/admin-announcements-repository.js';
import { AdminAnnouncementsCommandService } from '@/backend_admin/admin_modules/admin_announcements/announcements_services/admin-announcements-command.service.js';
import { AdminAnnouncementsQueryService } from '@/backend_admin/admin_modules/admin_announcements/announcements_services/admin-announcements-query.service.js';

@Module({
  controllers: [AdminAnnouncementsQueryController, AdminAnnouncementsCommandController],
  providers: [AdminAnnouncementsQueryService, AdminAnnouncementsRepository, AdminAnnouncementsMapper, AdminAnnouncementsResponsePresenter, AdminAnnouncementsCommandService],
  exports: [],
})
/**
 * @description Defines the AdminAnnouncementsModule boundary for the admin_announcements backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminAnnouncementsModule {}
