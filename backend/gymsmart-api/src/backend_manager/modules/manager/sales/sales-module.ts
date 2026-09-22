// RESPONSIBILITY: Registers the isolated Manager sales feature boundary.
// FLOW: ManagerDomainModule -> SalesModule -> controllers -> use cases -> repository.
import { Module } from '@nestjs/common';

import { SalesCommandController } from '@/modules/manager/sales/sales-command.controller';
import { SalesFetchAllMembershipsService } from '@/modules/manager/sales/services/sales-fetch-all-memberships.service';
import { SalesFetchMembershipReportService } from '@/modules/manager/sales/services/sales-fetch-membership-report.service';
import { SalesFetchPendingPaymentsService } from '@/modules/manager/sales/services/sales-fetch-pending-payments.service';
import { SalesFetchSalesOverviewService } from '@/modules/manager/sales/services/sales-fetch-sales-overview.service';
import { SalesOrchestratorService } from '@/modules/manager/sales/services/sales-orchestrator.service';
import { SalesQueryController } from '@/modules/manager/sales/sales-query.controller';
import { SalesRepository } from '@/modules/manager/sales/repositories/sales-repository';

@Module({
  controllers: [SalesQueryController, SalesCommandController],
  providers: [SalesFetchSalesOverviewService, SalesFetchMembershipReportService, SalesFetchPendingPaymentsService, SalesFetchAllMembershipsService, SalesRepository, SalesOrchestratorService],
  exports: [SalesRepository],
})
export class SalesModule {}
