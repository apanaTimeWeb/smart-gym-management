// RESPONSIBILITY: Registers the Manager dashboard feature and its widget-scoped query providers.
// FLOW: Feature module registration → query controller/services/repository → trusted tenant-scoped reads.
import { Module } from '@nestjs/common';
import { ManagerDashboardQueryController } from '@/backend_manager/manager_modules/dashboard/manager-dashboard-query.controller';
import { ManagerDashboardRepository } from '@/backend_manager/manager_modules/dashboard/manager-dashboard.repository';
import { ManagerDashboardFindDashboardKpisService } from '@/backend_manager/manager_modules/dashboard/dashboard_services/manager-dashboard-find-dashboard-kpis.service';
import { ManagerDashboardFindDashboardChartsService } from '@/backend_manager/manager_modules/dashboard/dashboard_services/manager-dashboard-find-dashboard-charts.service';
import { ManagerDashboardFindDashboardRecentMembersService } from '@/backend_manager/manager_modules/dashboard/dashboard_services/manager-dashboard-find-dashboard-recent-members.service';
import { ManagerDashboardFindDashboardPendingPaymentsService } from '@/backend_manager/manager_modules/dashboard/dashboard_services/manager-dashboard-find-dashboard-pending-payments.service';
import { ManagerDashboardFindDashboardExpiringMembershipsService } from '@/backend_manager/manager_modules/dashboard/dashboard_services/manager-dashboard-find-dashboard-expiring-memberships.service';

@Module({
  controllers: [ManagerDashboardQueryController],
  providers: [
    ManagerDashboardRepository,
    ManagerDashboardFindDashboardKpisService,
    ManagerDashboardFindDashboardChartsService,
    ManagerDashboardFindDashboardRecentMembersService,
    ManagerDashboardFindDashboardPendingPaymentsService,
    ManagerDashboardFindDashboardExpiringMembershipsService,
  ],
  exports: [ManagerDashboardRepository],
})
export class ManagerDashboardModule {}

export { ManagerDashboardModule as DashboardModule };
