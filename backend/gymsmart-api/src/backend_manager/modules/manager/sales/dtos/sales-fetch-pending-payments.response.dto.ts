// RESPONSIBILITY: Explicit response DTO for the frontend-frozen Manager API data contract.
// FLOW: Controller result -> SalesFetchPendingPaymentsResponseDto -> CoreResponseInterceptor -> canonical ApiResponse<T>.

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SalesFetchPendingPaymentsResponseDto {
  @ApiProperty({ type: [Object] })
  members?: Array<{ expiryDate?: string; name?: string; pendingAmount?: number; }>;

}
