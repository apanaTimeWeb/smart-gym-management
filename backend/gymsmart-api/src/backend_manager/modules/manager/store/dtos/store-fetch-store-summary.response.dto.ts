// RESPONSIBILITY: Explicit response DTO for the frontend-frozen Manager API data contract.
// FLOW: Controller result -> StoreFetchStoreSummaryResponseDto -> CoreResponseInterceptor -> canonical ApiResponse<T>.

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class StoreFetchStoreSummaryResponseDto {
  @ApiProperty({ type: [Object] })
  lowStockProducts?: Array<number>;

  @ApiProperty({ type: Number })
  totalOrders?: number;

  @ApiProperty({ type: Number })
  totalProducts?: number;

  @ApiProperty({ type: Number })
  totalRevenue?: number;

}
