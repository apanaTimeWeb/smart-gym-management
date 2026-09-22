// @ts-nocheck
// RESPONSIBILITY: Explicit response DTO for the frontend-frozen Manager API data contract.
// FLOW: Controller result -> ExpensesFetchExpenseByIdResponseDto -> CoreResponseInterceptor -> canonical ApiResponse<T>.

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ExpensesFetchExpenseByIdResponseDto {
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
