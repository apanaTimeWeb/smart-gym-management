// RESPONSIBILITY: Owns the backend application module infrastructure/code contract.
// FLOW: Module-owned input/configuration → focused backend behavior → typed output.
import { Module } from '@nestjs/common';
import { ManagerSalesMutationService } from '@/backend_manager/manager_modules/sales/sales_services/manager-sales-mutation.service';
import { ManagerCoreResourceAuthorizationRegistry } from '@/backend_manager/manager_core/manager_core_authorization/manager-core-resource-authorization.registry';
import { ManagerSalesAuthorizationService } from '@/backend_manager/manager_modules/sales/sales_services/manager-sales-authorization.service';

import { ManagerSalesRepository } from '@/backend_manager/manager_modules/sales/manager-sales.repository';
import { ManagerSalesQueryController } from '@/backend_manager/manager_modules/sales/manager-sales-query.controller';
import { ManagerSalesFindAllMembershipsService } from '@/backend_manager/manager_modules/sales/sales_services/manager-sales-find-all-memberships.service';
import { ManagerSalesFindMembershipReportService } from '@/backend_manager/manager_modules/sales/sales_services/manager-sales-find-membership-report.service';
import { ManagerSalesFindPendingPaymentsService } from '@/backend_manager/manager_modules/sales/sales_services/manager-sales-find-pending-payments.service';
import { ManagerSalesFindSalesOverviewService } from '@/backend_manager/manager_modules/sales/sales_services/manager-sales-find-sales-overview.service';
import { ManagerSalesOrchestratorService } from '@/backend_manager/manager_modules/sales/sales_services/manager-sales-orchestrator.service';

@Module({
  controllers: [ManagerSalesQueryController],
  providers: [ManagerSalesMutationService, ManagerSalesFindSalesOverviewService, ManagerSalesFindMembershipReportService, ManagerSalesFindPendingPaymentsService, ManagerSalesFindAllMembershipsService, ManagerSalesRepository, ManagerSalesOrchestratorService,
  ManagerSalesAuthorizationService,
  { provide: `CORE_RESOURCE_AUTHORIZER:sales`, useFactory: (authorization: ManagerSalesAuthorizationService, registry: ManagerCoreResourceAuthorizationRegistry) => { registry.register('sales', authorization); return authorization; }, inject: [ManagerSalesAuthorizationService, ManagerCoreResourceAuthorizationRegistry] },
  ],
  exports: [ManagerSalesRepository],
})
export class ManagerSalesModule {}

export { ManagerSalesModule as SalesModule };
