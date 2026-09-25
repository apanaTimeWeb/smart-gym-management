// RESPONSIBILITY: Registers the isolated Admin dashboard feature slice only.
// FLOW: Nest module -> controllers -> micro-services -> repository/mapper.
import { Module } from '@nestjs/common';

import { AdminDashboardQueryController } from '@/backend_admin/admin_modules/admin_dashboard/dashboard_controllers/admin-dashboard-query.controller.js';
import { AdminDashboardMapper } from '@/backend_admin/admin_modules/admin_dashboard/dashboard_mappers/admin-dashboard.mapper.js';
import { AdminDashboardResponsePresenter } from '@/backend_admin/admin_modules/admin_dashboard/dashboard_mappers/admin-dashboard.response.presenter.js';
import { AdminDashboardWidgetResponsePresenter } from '@/backend_admin/admin_modules/admin_dashboard/dashboard_mappers/admin-dashboard-widget.response.presenter.js';
import { AdminDashboardRepository } from '@/backend_admin/admin_modules/admin_dashboard/dashboard_repositories/admin-dashboard-repository.js';
import { AdminDashboardQueryService } from '@/backend_admin/admin_modules/admin_dashboard/dashboard_services/admin-dashboard-query.service.js';

@Module({
  controllers: [AdminDashboardQueryController],
  providers: [AdminDashboardQueryService, AdminDashboardRepository, AdminDashboardMapper, AdminDashboardResponsePresenter, AdminDashboardWidgetResponsePresenter],
  exports: [],
})
/**
 * @description Defines the AdminDashboardModule boundary for the admin_dashboard backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminDashboardModule {}
