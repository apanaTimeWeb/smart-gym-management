// RESPONSIBILITY: Registers the isolated Manager finance feature boundary.
// FLOW: ManagerDomainModule -> FinanceModule -> controllers -> use cases -> repository.
import { Module } from '@nestjs/common';

import { FinanceCommandController } from '@/modules/manager/finance/finance-command.controller';
import { FinanceCreatePaymentService } from '@/modules/manager/finance/services/finance-create-payment.service';
import { FinanceExportPaymentsReportService } from '@/modules/manager/finance/services/finance-export-payments-report.service';
import { FinanceFetchFinanceSummaryService } from '@/modules/manager/finance/services/finance-fetch-finance-summary.service';
import { FinanceFetchPaymentsByMemberService } from '@/modules/manager/finance/services/finance-fetch-payments-by-member.service';
import { FinanceFetchPaymentsService } from '@/modules/manager/finance/services/finance-fetch-payments.service';
import { FinanceOrchestratorService } from '@/modules/manager/finance/services/finance-orchestrator.service';
import { FinanceQueryController } from '@/modules/manager/finance/finance-query.controller';
import { FinanceRepository } from '@/modules/manager/finance/repositories/finance-repository';

@Module({
  controllers: [FinanceQueryController, FinanceCommandController],
  providers: [FinanceCreatePaymentService, FinanceFetchPaymentsService, FinanceFetchPaymentsByMemberService, FinanceFetchFinanceSummaryService, FinanceExportPaymentsReportService, FinanceRepository, FinanceOrchestratorService],
  exports: [FinanceRepository],
})
export class FinanceModule {}
