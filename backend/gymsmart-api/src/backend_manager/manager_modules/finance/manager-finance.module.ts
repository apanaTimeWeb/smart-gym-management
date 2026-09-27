// RESPONSIBILITY: Owns the backend application module infrastructure/code contract.
// FLOW: Module-owned input/configuration → focused backend behavior → typed output.
import { Module } from '@nestjs/common';
import { ManagerFinanceMutationService } from '@/backend_manager/manager_modules/finance/finance_services/manager-finance-mutation.service';
import { ManagerCoreResourceAuthorizationRegistry } from '@/backend_manager/manager_core/manager_core_authorization/manager-core-resource-authorization.registry';
import { ManagerFinanceAuthorizationService } from '@/backend_manager/manager_modules/finance/finance_services/manager-finance-authorization.service';
import { ManagerFinanceLedgerRepository } from '@/backend_manager/manager_modules/finance/finance_ledger/manager-finance-ledger.repository';
import { ManagerFinanceLedgerService } from '@/backend_manager/manager_modules/finance/finance_ledger/manager-finance-ledger.service';

import { ManagerFinanceCommandController } from '@/backend_manager/manager_modules/finance/manager-finance-command.controller';
import { ManagerFinanceQueryController } from '@/backend_manager/manager_modules/finance/manager-finance-query.controller';
import { ManagerFinanceRepository } from '@/backend_manager/manager_modules/finance/manager-finance.repository';
import { ManagerFinanceCreatePaymentService } from '@/backend_manager/manager_modules/finance/finance_services/manager-finance-create-payment.service';
import { ManagerFinanceExportPaymentsReportService } from '@/backend_manager/manager_modules/finance/finance_services/manager-finance-export-payments-report.service';
import { ManagerFinanceFindFinanceSummaryService } from '@/backend_manager/manager_modules/finance/finance_services/manager-finance-find-finance-summary.service';
import { ManagerFinanceFindPaymentsByMemberService } from '@/backend_manager/manager_modules/finance/finance_services/manager-finance-find-payments-by-member.service';
import { ManagerFinanceFindPaymentsService } from '@/backend_manager/manager_modules/finance/finance_services/manager-finance-find-payments.service';
import { ManagerFinanceOrchestratorService } from '@/backend_manager/manager_modules/finance/finance_services/manager-finance-orchestrator.service';

@Module({
  controllers: [ManagerFinanceQueryController, ManagerFinanceCommandController],
  providers: [
    ManagerFinanceLedgerRepository,
    ManagerFinanceLedgerService,ManagerFinanceMutationService, ManagerFinanceCreatePaymentService, ManagerFinanceFindPaymentsService, ManagerFinanceFindPaymentsByMemberService, ManagerFinanceFindFinanceSummaryService, ManagerFinanceExportPaymentsReportService, ManagerFinanceRepository, ManagerFinanceOrchestratorService,
  ManagerFinanceAuthorizationService,
  { provide: `CORE_RESOURCE_AUTHORIZER:finance`, useFactory: (authorization: ManagerFinanceAuthorizationService, registry: ManagerCoreResourceAuthorizationRegistry) => { registry.register('finance', authorization); return authorization; }, inject: [ManagerFinanceAuthorizationService, ManagerCoreResourceAuthorizationRegistry] },
  ],
  exports: [ManagerFinanceRepository],
})
export class ManagerFinanceModule {}

export { ManagerFinanceModule as FinanceModule };
