// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { ApiProperty } from '@nestjs/swagger';

import { ExpenseStatus } from '@/backend_manager/modules/backend_manager/expenses/expenses.constants';

export class ExpensesUpdateExpenseResponseDto {
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
}
