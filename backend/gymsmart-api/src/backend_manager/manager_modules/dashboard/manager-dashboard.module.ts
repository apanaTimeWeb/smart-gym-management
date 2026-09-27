import { ManagerDashboardAuthorizationService } from '@/backend_manager/manager_modules/dashboard/dashboard_services/manager-dashboard-authorization.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManagerCoreResourceAuthorizationRegistry } from '@/backend_manager/manager_core/manager_core_authorization/manager-core-resource-authorization.registry';
// RESPONSIBILITY: Registers the Manager dashboard feature and its widget-scoped query providers.
// FLOW: Feature module registration → query controller/services/repository → trusted tenant-scoped reads.
import { Module } from '@nestjs/common';
import { ManagerDashboardEntity } from '@/backend_manager/manager_modules/dashboard/manager-dashboard.entity';
import { ManagerDashboardQueryController } from '@/backend_manager/manager_modules/dashboard/manager-dashboard-query.controller';
import { ManagerDashboardRepository } from '@/backend_manager/manager_modules/dashboard/manager-dashboard.repository';
import { ManagerDashboardFindDashboardKpisService } from '@/backend_manager/manager_modules/dashboard/dashboard_services/manager-dashboard-find-dashboard-kpis.service';
import { ManagerDashboardFindDashboardChartsService } from '@/backend_manager/manager_modules/dashboard/dashboard_services/manager-dashboard-find-dashboard-charts.service';
import { ManagerDashboardFindDashboardRecentMembersService } from '@/backend_manager/manager_modules/dashboard/dashboard_services/manager-dashboard-find-dashboard-recent-members.service';
import { ManagerDashboardFindDashboardPendingPaymentsService } from '@/backend_manager/manager_modules/dashboard/dashboard_services/manager-dashboard-find-dashboard-pending-payments.service';
import { ManagerDashboardFindDashboardExpiringMembershipsService } from '@/backend_manager/manager_modules/dashboard/dashboard_services/manager-dashboard-find-dashboard-expiring-memberships.service';

/**
 * Primary Intent: Defines ManagerDashboardModule as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Module({
  imports: [TypeOrmModule.forFeature([ManagerDashboardEntity])],
  controllers: [ManagerDashboardQueryController],
  providers: [
    ManagerDashboardAuthorizationService,
    { provide: `CORE_RESOURCE_AUTHORIZER:dashboard`, useFactory: (authorization: ManagerDashboardAuthorizationService, registry: ManagerCoreResourceAuthorizationRegistry) => { registry.register('dashboard', authorization); return authorization; }, inject: [ManagerDashboardAuthorizationService, ManagerCoreResourceAuthorizationRegistry] },
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
