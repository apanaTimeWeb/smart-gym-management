// RESPONSIBILITY: Owns the backend application module infrastructure/code contract.
// FLOW: Module-owned input/configuration → focused backend behavior → typed output.
import { Module } from '@nestjs/common';

import { DashboardCommandController } from '@/backend_manager/modules/backend_manager/dashboard/dashboard-command.controller';
import { DashboardQueryController } from '@/backend_manager/modules/backend_manager/dashboard/dashboard-query.controller';
import { DashboardRepository } from '@/backend_manager/modules/backend_manager/dashboard/repositories/dashboard-repository';
import { DashboardFetchDashboardStatsService } from '@/backend_manager/modules/backend_manager/dashboard/services/dashboard-fetch-dashboard-stats.service';
import { DashboardOrchestratorService } from '@/backend_manager/modules/backend_manager/dashboard/services/dashboard-orchestrator.service';

@Module({
  controllers: [DashboardQueryController, DashboardCommandController],
  providers: [DashboardFetchDashboardStatsService, DashboardRepository, DashboardOrchestratorService],
  exports: [DashboardRepository],
})
export class DashboardModule {}
