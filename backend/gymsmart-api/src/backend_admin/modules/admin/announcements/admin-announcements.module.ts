// RESPONSIBILITY: Registers the isolated Admin announcements feature slice only.
// FLOW: Nest module -> controllers -> micro-services -> repository/mapper.

import { Module } from '@nestjs/common';
import { AdminAnnouncementsQueryController } from '@/backend_admin/modules/admin/announcements/controllers/admin-announcements-query.controller';
import { AdminAnnouncementsQueryService } from '@/backend_admin/modules/admin/announcements/services/admin-announcements-query.service';
import { AdminAnnouncementsRepository } from '@/backend_admin/modules/admin/announcements/repositories/admin-announcements-repository';
import { AdminAnnouncementsMapper } from '@/backend_admin/modules/admin/announcements/mappers/admin-announcements.mapper';
import { AdminAnnouncementsCommandController } from '@/backend_admin/modules/admin/announcements/controllers/admin-announcements-command.controller';
import { AdminAnnouncementsCommandService } from '@/backend_admin/modules/admin/announcements/services/admin-announcements-command.service';

@Module({
  controllers: [AdminAnnouncementsQueryController, AdminAnnouncementsCommandController],
  providers: [AdminAnnouncementsQueryService, AdminAnnouncementsRepository, AdminAnnouncementsMapper, AdminAnnouncementsCommandService],
  exports: [],
})
export class AdminAnnouncementsModule {}
