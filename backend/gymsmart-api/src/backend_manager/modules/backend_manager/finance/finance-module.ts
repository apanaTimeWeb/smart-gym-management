// RESPONSIBILITY: Owns the backend application module infrastructure/code contract.
// FLOW: Module-owned input/configuration → focused backend behavior → typed output.
import { Module } from '@nestjs/common';

import { FinanceCommandController } from '@/backend_manager/modules/backend_manager/finance/finance-command.controller';
import { FinanceQueryController } from '@/backend_manager/modules/backend_manager/finance/finance-query.controller';
import { FinanceRepository } from '@/backend_manager/modules/backend_manager/finance/repositories/finance-repository';
import { FinanceCreatePaymentService } from '@/backend_manager/modules/backend_manager/finance/services/finance-create-payment.service';
import { FinanceExportPaymentsReportService } from '@/backend_manager/modules/backend_manager/finance/services/finance-export-payments-report.service';
import { FinanceFetchFinanceSummaryService } from '@/backend_manager/modules/backend_manager/finance/services/finance-fetch-finance-summary.service';
import { FinanceFetchPaymentsByMemberService } from '@/backend_manager/modules/backend_manager/finance/services/finance-fetch-payments-by-member.service';
import { FinanceFetchPaymentsService } from '@/backend_manager/modules/backend_manager/finance/services/finance-fetch-payments.service';
import { FinanceOrchestratorService } from '@/backend_manager/modules/backend_manager/finance/services/finance-orchestrator.service';

@Module({
  controllers: [FinanceQueryController, FinanceCommandController],
  providers: [FinanceCreatePaymentService, FinanceFetchPaymentsService, FinanceFetchPaymentsByMemberService, FinanceFetchFinanceSummaryService, FinanceExportPaymentsReportService, FinanceRepository, FinanceOrchestratorService],
  exports: [FinanceRepository],
})
export class FinanceModule {}
