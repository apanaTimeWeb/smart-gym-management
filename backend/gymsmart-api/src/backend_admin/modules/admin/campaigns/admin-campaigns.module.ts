// RESPONSIBILITY: Registers the isolated Admin campaigns feature slice only.
// FLOW: Nest module -> controllers -> micro-services -> repository/mapper.

import { Module } from '@nestjs/common';
import { AdminCampaignsQueryController } from '@/backend_admin/modules/admin/campaigns/controllers/admin-campaigns-query.controller';
import { AdminCampaignsQueryService } from '@/backend_admin/modules/admin/campaigns/services/admin-campaigns-query.service';
import { AdminCampaignsRepository } from '@/backend_admin/modules/admin/campaigns/repositories/admin-campaigns-repository';
import { AdminCampaignsMapper } from '@/backend_admin/modules/admin/campaigns/mappers/admin-campaigns.mapper';

@Module({
  controllers: [AdminCampaignsQueryController],
  providers: [AdminCampaignsQueryService, AdminCampaignsRepository, AdminCampaignsMapper],
  exports: [],
})
export class AdminCampaignsModule {}
