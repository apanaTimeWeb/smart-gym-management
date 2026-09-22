// RESPONSIBILITY: Explicit response DTO for the frontend-frozen Manager API data contract.
// FLOW: Controller result -> ExpensesFetchExpenseStatsResponseDto -> CoreResponseInterceptor -> canonical ApiResponse<T>.

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ExpensesFetchExpenseStatsResponseDto {
  @ApiProperty({ type: Number })
  paidAmount?: number;

  @ApiProperty({ type: Number })
  pendingAmount?: number;

  @ApiProperty({ type: Number })
  thisMonthAmount?: number;

  @ApiProperty({ type: Number })
  totalAmount?: number;

}
