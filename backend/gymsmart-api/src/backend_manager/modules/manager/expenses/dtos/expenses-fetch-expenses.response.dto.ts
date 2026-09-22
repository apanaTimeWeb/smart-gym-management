// RESPONSIBILITY: Explicit response DTO for the frontend-frozen Manager API data contract.
// FLOW: Controller result -> ExpensesFetchExpensesResponseDto -> CoreResponseInterceptor -> canonical ApiResponse<T>.

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ExpensesFetchExpensesResponseDto {
  @ApiProperty({ type: [Object] })
  expenses?: Array<{ amount: number; category: string; date: string; id: string; paymentMode: string; status: string; title: string; vendorName: string; }>;

}
