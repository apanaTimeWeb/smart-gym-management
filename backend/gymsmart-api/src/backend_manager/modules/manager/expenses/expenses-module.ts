// RESPONSIBILITY: Registers the isolated Manager expenses feature boundary.
// FLOW: ManagerDomainModule -> ExpensesModule -> controllers -> use cases -> repository.
import { Module } from '@nestjs/common';

import { ExpensesCommandController } from '@/backend_manager/modules/manager/expenses/expenses-command.controller';
import { ExpensesCreateExpenseService } from '@/backend_manager/modules/manager/expenses/services/expenses-create-expense.service';
import { ExpensesDeleteExpenseService } from '@/backend_manager/modules/manager/expenses/services/expenses-delete-expense.service';
import { ExpensesFetchExpenseByIdService } from '@/backend_manager/modules/manager/expenses/services/expenses-fetch-expense-by-id.service';
import { ExpensesFetchExpenseStatsService } from '@/backend_manager/modules/manager/expenses/services/expenses-fetch-expense-stats.service';
import { ExpensesFetchExpensesService } from '@/backend_manager/modules/manager/expenses/services/expenses-fetch-expenses.service';
import { ExpensesOrchestratorService } from '@/backend_manager/modules/manager/expenses/services/expenses-orchestrator.service';
import { ExpensesQueryController } from '@/backend_manager/modules/manager/expenses/expenses-query.controller';
import { ExpensesRepository } from '@/backend_manager/modules/manager/expenses/repositories/expenses-repository';
import { ExpensesUpdateExpenseService } from '@/backend_manager/modules/manager/expenses/services/expenses-update-expense.service';

@Module({
  controllers: [ExpensesQueryController, ExpensesCommandController],
  providers: [ExpensesCreateExpenseService, ExpensesUpdateExpenseService, ExpensesDeleteExpenseService, ExpensesFetchExpensesService, ExpensesFetchExpenseByIdService, ExpensesFetchExpenseStatsService, ExpensesRepository, ExpensesOrchestratorService],
  exports: [ExpensesRepository],
})
export class ExpensesModule {}
