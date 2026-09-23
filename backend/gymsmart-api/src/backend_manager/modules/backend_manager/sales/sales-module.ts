// RESPONSIBILITY: Owns the backend application module infrastructure/code contract.
// FLOW: Module-owned input/configuration → focused backend behavior → typed output.
import { Module } from '@nestjs/common';

import { SalesRepository } from '@/backend_manager/modules/backend_manager/sales/repositories/sales-repository';
import { SalesCommandController } from '@/backend_manager/modules/backend_manager/sales/sales-command.controller';
import { SalesQueryController } from '@/backend_manager/modules/backend_manager/sales/sales-query.controller';
import { SalesFetchAllMembershipsService } from '@/backend_manager/modules/backend_manager/sales/services/sales-fetch-all-memberships.service';
import { SalesFetchMembershipReportService } from '@/backend_manager/modules/backend_manager/sales/services/sales-fetch-membership-report.service';
import { SalesFetchPendingPaymentsService } from '@/backend_manager/modules/backend_manager/sales/services/sales-fetch-pending-payments.service';
import { SalesFetchSalesOverviewService } from '@/backend_manager/modules/backend_manager/sales/services/sales-fetch-sales-overview.service';
import { SalesOrchestratorService } from '@/backend_manager/modules/backend_manager/sales/services/sales-orchestrator.service';

@Module({
  controllers: [SalesQueryController, SalesCommandController],
  providers: [SalesFetchSalesOverviewService, SalesFetchMembershipReportService, SalesFetchPendingPaymentsService, SalesFetchAllMembershipsService, SalesRepository, SalesOrchestratorService],
  exports: [SalesRepository],
})
export class SalesModule {}
