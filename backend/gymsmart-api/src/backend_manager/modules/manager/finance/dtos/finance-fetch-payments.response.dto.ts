// RESPONSIBILITY: Explicit response DTO for the frontend-frozen Manager API data contract.
// FLOW: Controller result -> FinanceFetchPaymentsResponseDto -> CoreResponseInterceptor -> canonical ApiResponse<T>.

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class FinanceFetchPaymentsResponseDto {
  @ApiProperty({ type: [Object] })
  payments?: Array<{ amount: number; invoiceNumber: string; member?: { email: string; name: string; plan?: { name: string; }; }; method: string; paidAt: string; status: string; }>;

}
