// RESPONSIBILITY: Registers the isolated Admin campaigns feature slice only.
// FLOW: Nest module -> controllers -> micro-services -> repository/mapper.
import { Module } from '@nestjs/common';

import { AdminCampaignsQueryController } from '@/backend_admin/admin_modules/admin_campaigns/campaigns_controllers/admin-campaigns-query.controller'
import { AdminCampaignsMapper } from '@/backend_admin/admin_modules/admin_campaigns/campaigns_mappers/admin-campaigns.mapper'
import { AdminCampaignsResponsePresenter } from '@/backend_admin/admin_modules/admin_campaigns/campaigns_mappers/admin-campaigns.response.presenter'
import { AdminCampaignsRepository } from '@/backend_admin/admin_modules/admin_campaigns/campaigns_repositories/admin-campaigns-repository'
import { AdminCampaignsQueryService } from '@/backend_admin/admin_modules/admin_campaigns/campaigns_services/admin-campaigns-query.service'

@Module({
  controllers: [AdminCampaignsQueryController],
  providers: [AdminCampaignsQueryService, AdminCampaignsRepository, AdminCampaignsMapper, AdminCampaignsResponsePresenter],
  exports: [],
})
/**
 * @description Defines the AdminCampaignsModule boundary for the admin_campaigns backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminCampaignsModule {}
