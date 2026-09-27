// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { ApiProperty } from '@nestjs/swagger';

import { ExpensesExpenseItemResponseDto } from '@/backend_manager/manager_modules/expenses/expenses_responses/manager-expenses-expense-item.response.dto';

export class ManagerExpensesFetchExpensesResponseDto {
  @ApiProperty({ type: [ExpensesExpenseItemResponseDto] })
  expenses?: Array<ExpensesExpenseItemResponseDto>;
  @ApiProperty({ example: 'INR' }) currency!: string;
}

export { ManagerExpensesFetchExpensesResponseDto as ExpensesFetchExpensesResponseDto };
