// RESPONSIBILITY: Registers the isolated Manager dashboard feature boundary.
// FLOW: ManagerDomainModule -> DashboardModule -> controllers -> use cases -> repository.
import { Module } from '@nestjs/common';

import { DashboardCommandController } from '@/backend_manager/modules/manager/dashboard/dashboard-command.controller';
import { DashboardFetchDashboardStatsService } from '@/backend_manager/modules/manager/dashboard/services/dashboard-fetch-dashboard-stats.service';
import { DashboardOrchestratorService } from '@/backend_manager/modules/manager/dashboard/services/dashboard-orchestrator.service';
import { DashboardQueryController } from '@/backend_manager/modules/manager/dashboard/dashboard-query.controller';
import { DashboardRepository } from '@/backend_manager/modules/manager/dashboard/repositories/dashboard-repository';

@Module({
  controllers: [DashboardQueryController, DashboardCommandController],
  providers: [DashboardFetchDashboardStatsService, DashboardRepository, DashboardOrchestratorService],
  exports: [DashboardRepository],
})
export class DashboardModule {}
