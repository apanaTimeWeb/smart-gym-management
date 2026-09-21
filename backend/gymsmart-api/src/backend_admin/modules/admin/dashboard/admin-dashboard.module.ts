// RESPONSIBILITY: Registers the isolated Admin dashboard feature slice only.
// FLOW: Nest module -> controllers -> micro-services -> repository/mapper.

import { Module } from '@nestjs/common';
import { AdminDashboardQueryController } from '@/backend_admin/modules/admin/dashboard/controllers/admin-dashboard-query.controller';
import { AdminDashboardQueryService } from '@/backend_admin/modules/admin/dashboard/services/admin-dashboard-query.service';
import { AdminDashboardRepository } from '@/backend_admin/modules/admin/dashboard/repositories/admin-dashboard-repository';
import { AdminDashboardMapper } from '@/backend_admin/modules/admin/dashboard/mappers/admin-dashboard.mapper';

@Module({
  controllers: [AdminDashboardQueryController],
  providers: [AdminDashboardQueryService, AdminDashboardRepository, AdminDashboardMapper],
  exports: [],
})
export class AdminDashboardModule {}
