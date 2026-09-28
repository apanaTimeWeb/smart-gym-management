import { TypeOrmModule } from '@nestjs/typeorm';
// RESPONSIBILITY: Owns the backend application module infrastructure/code contract.
// FLOW: Module-owned input/configuration → focused backend behavior → typed output.
import { Module } from '@nestjs/common';
import { ManagerExpensesEntity } from '@/backend_manager/manager_modules/expenses/manager-expenses.entity';
import { ManagerExpensesMutationService } from '@/backend_manager/manager_modules/expenses/expenses_services/manager-expenses-mutation.service';
import { ManagerCoreResourceAuthorizationRegistry } from '@/backend_manager/manager_core/manager_core_authorization/manager-core-resource-authorization.registry';
import { ManagerExpensesAuthorizationService } from '@/backend_manager/manager_modules/expenses/expenses_services/manager-expenses-authorization.service';

import { ManagerExpensesCommandController } from '@/backend_manager/manager_modules/expenses/manager-expenses-command.controller';
import { ManagerExpensesQueryController } from '@/backend_manager/manager_modules/expenses/manager-expenses-query.controller';
import { ManagerExpensesRepository } from '@/backend_manager/manager_modules/expenses/manager-expenses.repository';
import { ManagerExpensesCreateExpenseService } from '@/backend_manager/manager_modules/expenses/expenses_services/manager-expenses-create-expense.service';
import { ManagerExpensesDeleteExpenseService } from '@/backend_manager/manager_modules/expenses/expenses_services/manager-expenses-delete-expense.service';
import { ManagerExpensesFindExpenseByIdService } from '@/backend_manager/manager_modules/expenses/expenses_services/manager-expenses-find-expense-by-id.service';
import { ManagerExpensesFindExpenseStatsService } from '@/backend_manager/manager_modules/expenses/expenses_services/manager-expenses-find-expense-stats.service';
import { ManagerExpensesFindExpensesService } from '@/backend_manager/manager_modules/expenses/expenses_services/manager-expenses-find-expenses.service';
import { ManagerExpensesOrchestratorService } from '@/backend_manager/manager_modules/expenses/expenses_services/manager-expenses-orchestrator.service';
import { ManagerExpensesUpdateExpenseService } from '@/backend_manager/manager_modules/expenses/expenses_services/manager-expenses-update-expense.service';

/**
 * Primary Intent: Defines ManagerExpensesModule as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Module({
  imports: [TypeOrmModule.forFeature([ManagerExpensesEntity])],
  controllers: [ManagerExpensesQueryController, ManagerExpensesCommandController],
  providers: [ManagerExpensesMutationService, ManagerExpensesCreateExpenseService, ManagerExpensesUpdateExpenseService, ManagerExpensesDeleteExpenseService, ManagerExpensesFindExpensesService, ManagerExpensesFindExpenseByIdService, ManagerExpensesFindExpenseStatsService, ManagerExpensesRepository, ManagerExpensesOrchestratorService,
  ManagerExpensesAuthorizationService,
  { provide: `CORE_RESOURCE_AUTHORIZER:expenses`, useFactory: (authorization: ManagerExpensesAuthorizationService, registry: ManagerCoreResourceAuthorizationRegistry) => { registry.register('expenses', authorization); return authorization; }, inject: [ManagerExpensesAuthorizationService, ManagerCoreResourceAuthorizationRegistry] },
  ],
  exports: [ManagerExpensesRepository],
})
export class ManagerExpensesModule {}

export { ManagerExpensesModule as ExpensesModule };
