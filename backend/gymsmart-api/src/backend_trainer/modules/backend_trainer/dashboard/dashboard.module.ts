// RESPONSIBILITY: Registers the isolated dashboard feature slice and its controller/service/repository graph.
// FLOW: Nest bootstrap → DashboardModule → feature-owned providers/controllers.

import { Module } from '@nestjs/common';
import { DashboardQueryController } from '@/backend_trainer/modules/backend_trainer/dashboard/controllers/dashboard-query.controller'; import { DashboardStatsService } from '@/backend_trainer/modules/backend_trainer/dashboard/services/dashboard-stats.service'; import { DashboardRepository } from '@/backend_trainer/modules/backend_trainer/dashboard/dashboard.repository';
@Module({controllers:[DashboardQueryController],providers:[DashboardStatsService,DashboardRepository]}) export class DashboardModule {}
