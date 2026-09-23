// RESPONSIBILITY: Owns the backend application module infrastructure/code contract.
// FLOW: Module-owned input/configuration → focused backend behavior → typed output.
import { Module } from '@nestjs/common';

import { ExpensesCommandController } from '@/backend_manager/modules/backend_manager/expenses/expenses-command.controller';
import { ExpensesQueryController } from '@/backend_manager/modules/backend_manager/expenses/expenses-query.controller';
import { ExpensesRepository } from '@/backend_manager/modules/backend_manager/expenses/repositories/expenses-repository';
import { ExpensesCreateExpenseService } from '@/backend_manager/modules/backend_manager/expenses/services/expenses-create-expense.service';
import { ExpensesDeleteExpenseService } from '@/backend_manager/modules/backend_manager/expenses/services/expenses-delete-expense.service';
import { ExpensesFetchExpenseByIdService } from '@/backend_manager/modules/backend_manager/expenses/services/expenses-fetch-expense-by-id.service';
import { ExpensesFetchExpenseStatsService } from '@/backend_manager/modules/backend_manager/expenses/services/expenses-fetch-expense-stats.service';
import { ExpensesFetchExpensesService } from '@/backend_manager/modules/backend_manager/expenses/services/expenses-fetch-expenses.service';
import { ExpensesOrchestratorService } from '@/backend_manager/modules/backend_manager/expenses/services/expenses-orchestrator.service';
import { ExpensesUpdateExpenseService } from '@/backend_manager/modules/backend_manager/expenses/services/expenses-update-expense.service';

@Module({
  controllers: [ExpensesQueryController, ExpensesCommandController],
  providers: [ExpensesCreateExpenseService, ExpensesUpdateExpenseService, ExpensesDeleteExpenseService, ExpensesFetchExpensesService, ExpensesFetchExpenseByIdService, ExpensesFetchExpenseStatsService, ExpensesRepository, ExpensesOrchestratorService],
  exports: [ExpensesRepository],
})
export class ExpensesModule {}
