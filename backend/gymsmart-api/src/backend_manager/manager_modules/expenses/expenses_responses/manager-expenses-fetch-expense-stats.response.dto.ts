// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { ApiProperty } from '@nestjs/swagger';

export class ManagerExpensesFetchExpenseStatsResponseDto {
  @ApiProperty({ type: Number })
  paidAmount!: number;

  @ApiProperty({ type: Number })
  pendingAmount!: number;

  @ApiProperty({ type: Number })
  thisMonthAmount!: number;

  @ApiProperty({ type: Number })
  totalAmount!: number;
  @ApiProperty({ example: 'INR' }) currency!: string;
}

export { ManagerExpensesFetchExpenseStatsResponseDto as ExpensesFetchExpenseStatsResponseDto };
