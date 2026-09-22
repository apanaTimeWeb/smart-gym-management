// RESPONSIBILITY: Registers the isolated Manager expenses feature boundary.
// FLOW: ManagerDomainModule -> ExpensesModule -> controllers -> use cases -> repository.
import { Module } from '@nestjs/common';

import { ExpensesCommandController } from '@/modules/manager/expenses/expenses-command.controller';
import { ExpensesCreateExpenseService } from '@/modules/manager/expenses/services/expenses-create-expense.service';
import { ExpensesDeleteExpenseService } from '@/modules/manager/expenses/services/expenses-delete-expense.service';
import { ExpensesFetchExpenseByIdService } from '@/modules/manager/expenses/services/expenses-fetch-expense-by-id.service';
import { ExpensesFetchExpenseStatsService } from '@/modules/manager/expenses/services/expenses-fetch-expense-stats.service';
import { ExpensesFetchExpensesService } from '@/modules/manager/expenses/services/expenses-fetch-expenses.service';
import { ExpensesOrchestratorService } from '@/modules/manager/expenses/services/expenses-orchestrator.service';
import { ExpensesQueryController } from '@/modules/manager/expenses/expenses-query.controller';
import { ExpensesRepository } from '@/modules/manager/expenses/repositories/expenses-repository';
import { ExpensesUpdateExpenseService } from '@/modules/manager/expenses/services/expenses-update-expense.service';

@Module({
  controllers: [ExpensesQueryController, ExpensesCommandController],
  providers: [ExpensesCreateExpenseService, ExpensesUpdateExpenseService, ExpensesDeleteExpenseService, ExpensesFetchExpensesService, ExpensesFetchExpenseByIdService, ExpensesFetchExpenseStatsService, ExpensesRepository, ExpensesOrchestratorService],
  exports: [ExpensesRepository],
})
export class ExpensesModule {}
