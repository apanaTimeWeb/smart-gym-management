// RESPONSIBILITY: Explicit response DTO for the frontend-frozen Manager API data contract.
// FLOW: Controller result -> FinanceFetchFinanceSummaryResponseDto -> CoreResponseInterceptor -> canonical ApiResponse<T>.

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class FinanceFetchFinanceSummaryResponseDto {
  @ApiProperty({ type: Number })
  gstCollected?: number;

  @ApiProperty({ type: [Object] })
  monthlyData?: Array<{ revenue?: number; }>;

  @ApiProperty({ type: Number })
  monthlyRevenue?: number;

  @ApiProperty({ type: Number })
  pendingAmount?: number;

  @ApiProperty({ type: Number })
  totalRevenue?: number;

}
