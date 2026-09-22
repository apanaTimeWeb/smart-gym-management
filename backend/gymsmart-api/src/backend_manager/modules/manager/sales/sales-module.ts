// RESPONSIBILITY: Registers the isolated Manager sales feature boundary.
// FLOW: ManagerDomainModule -> SalesModule -> controllers -> use cases -> repository.
import { Module } from '@nestjs/common';

import { SalesCommandController } from '@/backend_manager/modules/manager/sales/sales-command.controller';
import { SalesFetchAllMembershipsService } from '@/backend_manager/modules/manager/sales/services/sales-fetch-all-memberships.service';
import { SalesFetchMembershipReportService } from '@/backend_manager/modules/manager/sales/services/sales-fetch-membership-report.service';
import { SalesFetchPendingPaymentsService } from '@/backend_manager/modules/manager/sales/services/sales-fetch-pending-payments.service';
import { SalesFetchSalesOverviewService } from '@/backend_manager/modules/manager/sales/services/sales-fetch-sales-overview.service';
import { SalesOrchestratorService } from '@/backend_manager/modules/manager/sales/services/sales-orchestrator.service';
import { SalesQueryController } from '@/backend_manager/modules/manager/sales/sales-query.controller';
import { SalesRepository } from '@/backend_manager/modules/manager/sales/repositories/sales-repository';

@Module({
  controllers: [SalesQueryController, SalesCommandController],
  providers: [SalesFetchSalesOverviewService, SalesFetchMembershipReportService, SalesFetchPendingPaymentsService, SalesFetchAllMembershipsService, SalesRepository, SalesOrchestratorService],
  exports: [SalesRepository],
})
export class SalesModule {}
