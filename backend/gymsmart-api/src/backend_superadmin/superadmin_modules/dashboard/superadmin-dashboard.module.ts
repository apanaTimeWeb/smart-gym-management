// RESPONSIBILITY: Registers the dashboard feature's controllers, ORM entity, repository, and isolated use-case services.
// FLOW: Nest module graph -> controllers/services/repository -> PostgreSQL entity.
import { Module } from '@nestjs/common';
import { SuperadminDashboardOverviewQueryController } from '@/backend_superadmin/superadmin_modules/dashboard/superadmin-dashboard-overview-query.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuperadminDashboardEntity } from '@/backend_superadmin/superadmin_modules/dashboard/superadmin-dashboard.entity';
import { SuperadminDashboardRepository } from '@/backend_superadmin/superadmin_modules/dashboard/superadmin-dashboard.repository';
import { SuperadminDashboardQueryController } from '@/backend_superadmin/superadmin_modules/dashboard/superadmin-dashboard-query.controller';
import { SuperadminDashboardCommandController } from '@/backend_superadmin/superadmin_modules/dashboard/superadmin-dashboard-command.controller';
import { SuperadminDashboardListService } from '@/backend_superadmin/superadmin_modules/dashboard/services/superadmin-dashboard-list.service';
import { SuperadminDashboardFindService } from '@/backend_superadmin/superadmin_modules/dashboard/services/superadmin-dashboard-find.service';
import { SuperadminDashboardCreateService } from '@/backend_superadmin/superadmin_modules/dashboard/services/superadmin-dashboard-create.service';
import { SuperadminDashboardUpdateService } from '@/backend_superadmin/superadmin_modules/dashboard/services/superadmin-dashboard-update.service';
import { SuperadminDashboardDeleteService } from '@/backend_superadmin/superadmin_modules/dashboard/services/superadmin-dashboard-delete.service';
import { SuperadminDashboardBusinessOverviewService } from '@/backend_superadmin/superadmin_modules/dashboard/services/superadmin-dashboard-business-overview.service';
import { SuperadminDashboardKpisService } from '@/backend_superadmin/superadmin_modules/dashboard/services/superadmin-dashboard-kpis.service';
import { SuperadminDashboardRevenueChartService } from '@/backend_superadmin/superadmin_modules/dashboard/services/superadmin-dashboard-revenue-chart.service';
import { SuperadminDashboardGrowthChartService } from '@/backend_superadmin/superadmin_modules/dashboard/services/superadmin-dashboard-growth-chart.service';
import { SuperadminDashboardRevenueByTierService } from '@/backend_superadmin/superadmin_modules/dashboard/services/superadmin-dashboard-revenue-by-tier.service';
import { SuperadminDashboardRevenueByGeographyService } from '@/backend_superadmin/superadmin_modules/dashboard/services/superadmin-dashboard-revenue-by-geography.service';
import { SuperadminDashboardRecentOnboardsService } from '@/backend_superadmin/superadmin_modules/dashboard/services/superadmin-dashboard-recent-onboards.service';
@Module({
  imports: [TypeOrmModule.forFeature([SuperadminDashboardEntity])],
  controllers: [SuperadminDashboardQueryController, SuperadminDashboardCommandController, SuperadminDashboardOverviewQueryController],
  providers: [SuperadminDashboardBusinessOverviewService, SuperadminDashboardKpisService, SuperadminDashboardRevenueChartService, SuperadminDashboardGrowthChartService, SuperadminDashboardRevenueByTierService, SuperadminDashboardRevenueByGeographyService, SuperadminDashboardRecentOnboardsService, SuperadminDashboardRepository, SuperadminDashboardListService, SuperadminDashboardFindService, SuperadminDashboardCreateService, SuperadminDashboardUpdateService, SuperadminDashboardDeleteService],
  exports: [SuperadminDashboardRepository],
})
export class SuperadminDashboardModule {}