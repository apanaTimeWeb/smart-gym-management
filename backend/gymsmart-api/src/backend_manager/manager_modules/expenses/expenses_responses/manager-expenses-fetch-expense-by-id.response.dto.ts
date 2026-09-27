// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { ApiProperty } from '@nestjs/swagger';

import { ExpenseStatus } from '@/backend_manager/manager_modules/expenses/manager-expenses.constants';

export class ManagerExpensesFetchExpenseByIdResponseDto {
  @ApiProperty({ type: Number })
  amount!: number;

  @ApiProperty()
  category!: string;

  @ApiProperty()
  createdAt!: string;

  @ApiProperty()
  date!: string;

  @ApiProperty()
  id!: string;

  @ApiProperty({ type: Boolean })
  isRecurring!: boolean;

  @ApiProperty()
  status!: ExpenseStatus;

  @ApiProperty()
  title!: string;
  @ApiProperty({ example: 'INR' }) currency!: string;
}

export { ManagerExpensesFetchExpenseByIdResponseDto as ExpensesFetchExpenseByIdResponseDto };
