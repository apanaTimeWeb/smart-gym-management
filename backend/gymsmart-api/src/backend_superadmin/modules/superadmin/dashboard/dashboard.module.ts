// RESPONSIBILITY: Registers the dashboard feature's controllers, ORM entity, repository, and isolated use-case services.
// FLOW: Nest module graph -> controllers/services/repository -> PostgreSQL entity.
import { Module } from '@nestjs/common';
import { DashboardOverviewQueryController } from '@/backend_superadmin/modules/superadmin/dashboard/dashboard-overview-query.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardEntity } from '@/backend_superadmin/modules/superadmin/dashboard/dashboard.entity';
import { DashboardRepository } from '@/backend_superadmin/modules/superadmin/dashboard/dashboard.repository';
import { DashboardQueryController } from '@/backend_superadmin/modules/superadmin/dashboard/dashboard-query.controller';
import { DashboardCommandController } from '@/backend_superadmin/modules/superadmin/dashboard/dashboard-command.controller';
import { DashboardListService } from '@/backend_superadmin/modules/superadmin/dashboard/services/dashboard-list.service';
import { DashboardFindService } from '@/backend_superadmin/modules/superadmin/dashboard/services/dashboard-find.service';
import { DashboardCreateService } from '@/backend_superadmin/modules/superadmin/dashboard/services/dashboard-create.service';
import { DashboardUpdateService } from '@/backend_superadmin/modules/superadmin/dashboard/services/dashboard-update.service';
import { DashboardDeleteService } from '@/backend_superadmin/modules/superadmin/dashboard/services/dashboard-delete.service';
import { DashboardBusinessOverviewService } from '@/backend_superadmin/modules/superadmin/dashboard/services/dashboard-business-overview.service';
import { DashboardKpisService } from '@/backend_superadmin/modules/superadmin/dashboard/services/dashboard-kpis.service';
import { DashboardRevenueChartService } from '@/backend_superadmin/modules/superadmin/dashboard/services/dashboard-revenue-chart.service';
import { DashboardGrowthChartService } from '@/backend_superadmin/modules/superadmin/dashboard/services/dashboard-growth-chart.service';
import { DashboardRevenueByTierService } from '@/backend_superadmin/modules/superadmin/dashboard/services/dashboard-revenue-by-tier.service';
import { DashboardRevenueByGeographyService } from '@/backend_superadmin/modules/superadmin/dashboard/services/dashboard-revenue-by-geography.service';
import { DashboardRecentOnboardsService } from '@/backend_superadmin/modules/superadmin/dashboard/services/dashboard-recent-onboards.service';
@Module({
  imports: [TypeOrmModule.forFeature([DashboardEntity])],
  controllers: [DashboardQueryController, DashboardCommandController, DashboardOverviewQueryController],
  providers: [DashboardBusinessOverviewService, DashboardKpisService, DashboardRevenueChartService, DashboardGrowthChartService, DashboardRevenueByTierService, DashboardRevenueByGeographyService, DashboardRecentOnboardsService, DashboardRepository, DashboardListService, DashboardFindService, DashboardCreateService, DashboardUpdateService, DashboardDeleteService],
  exports: [DashboardRepository],
})
export class DashboardModule {}