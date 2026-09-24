// RESPONSIBILITY: Registers the dashboard feature's controllers, ORM entity, repository, and isolated use-case services.
// FLOW: Nest module graph -> controllers/services/repository -> PostgreSQL entity.
import { Module } from '@nestjs/common';
import { SuperadminDashboardOverviewQueryController } from '@/backend_superadmin/superadmin_modules/dashboard/superadmin-dashboard-overview-query.controller';
import { SuperadminDashboardCompatibilityQueryController } from '@/backend_superadmin/superadmin_modules/dashboard/superadmin-dashboard-compatibility-query.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuperadminDashboardEntity } from '@/backend_superadmin/superadmin_modules/dashboard/superadmin-dashboard.entity';
import { SuperadminDashboardRepository } from '@/backend_superadmin/superadmin_modules/dashboard/superadmin-dashboard.repository';
import { SuperadminDashboardWidgetRepository } from '@/backend_superadmin/superadmin_modules/dashboard/dashboard_repositories/superadmin-dashboard-widget.repository';
import { SuperadminDashboardQueryController } from '@/backend_superadmin/superadmin_modules/dashboard/superadmin-dashboard-query.controller';
import { SuperadminDashboardCommandController } from '@/backend_superadmin/superadmin_modules/dashboard/superadmin-dashboard-command.controller';
import { SuperadminDashboardListService } from '@/backend_superadmin/superadmin_modules/dashboard/dashboard_services/superadmin-dashboard-list.service';
import { SuperadminDashboardFindService } from '@/backend_superadmin/superadmin_modules/dashboard/dashboard_services/superadmin-dashboard-find.service';
import { SuperadminDashboardCreateService } from '@/backend_superadmin/superadmin_modules/dashboard/dashboard_services/superadmin-dashboard-create.service';
import { SuperadminDashboardUpdateService } from '@/backend_superadmin/superadmin_modules/dashboard/dashboard_services/superadmin-dashboard-update.service';
import { SuperadminDashboardDeleteService } from '@/backend_superadmin/superadmin_modules/dashboard/dashboard_services/superadmin-dashboard-delete.service';
import { SuperadminDashboardBusinessOverviewService } from '@/backend_superadmin/superadmin_modules/dashboard/dashboard_services/superadmin-dashboard-business-overview.service';
import { SuperadminDashboardApiReadService } from '@/backend_superadmin/superadmin_modules/dashboard/dashboard_services/superadmin-dashboard-api-read.service';
import { SuperadminDashboardKpisService } from '@/backend_superadmin/superadmin_modules/dashboard/dashboard_services/superadmin-dashboard-kpis.service';
import { SuperadminDashboardRevenueChartService } from '@/backend_superadmin/superadmin_modules/dashboard/dashboard_services/superadmin-dashboard-revenue-chart.service';
import { SuperadminDashboardGrowthChartService } from '@/backend_superadmin/superadmin_modules/dashboard/dashboard_services/superadmin-dashboard-growth-chart.service';
import { SuperadminDashboardRevenueByTierService } from '@/backend_superadmin/superadmin_modules/dashboard/dashboard_services/superadmin-dashboard-revenue-by-tier.service';
import { SuperadminDashboardRevenueByGeographyService } from '@/backend_superadmin/superadmin_modules/dashboard/dashboard_services/superadmin-dashboard-revenue-by-geography.service';
import { SuperadminDashboardRecentOnboardsService } from '@/backend_superadmin/superadmin_modules/dashboard/dashboard_services/superadmin-dashboard-recent-onboards.service';
/**
 * Primary Intent: Defines SuperadminDashboardModule as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Module({
  imports: [TypeOrmModule.forFeature([SuperadminDashboardEntity])],
  controllers: [SuperadminDashboardQueryController, SuperadminDashboardCommandController, SuperadminDashboardOverviewQueryController, SuperadminDashboardCompatibilityQueryController],
  providers: [SuperadminDashboardBusinessOverviewService, SuperadminDashboardApiReadService, SuperadminDashboardKpisService, SuperadminDashboardRevenueChartService, SuperadminDashboardGrowthChartService, SuperadminDashboardRevenueByTierService, SuperadminDashboardRevenueByGeographyService, SuperadminDashboardRecentOnboardsService, SuperadminDashboardRepository, SuperadminDashboardWidgetRepository, SuperadminDashboardListService, SuperadminDashboardFindService, SuperadminDashboardCreateService, SuperadminDashboardUpdateService, SuperadminDashboardDeleteService],
  exports: [SuperadminDashboardRepository],
})
/**
 * Primary Intent: Defines SuperadminDashboardModule, the focused backend component for its owning feature or infrastructure boundary.
 * Edge Cases: Preserve validation/tenant/transaction/authorization invariants. Side-Effects: Only documented effects are permitted.
 * AI-Note: Keep this class isolated, dependency-injected, explicitly typed, and aligned with the frozen contract.
 */
export class SuperadminDashboardModule {}
