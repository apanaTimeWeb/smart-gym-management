// RESPONSIBILITY: Explicit response DTO for the frontend-frozen Manager API data contract.
// FLOW: Controller result -> SalesFetchSalesOverviewResponseDto -> CoreResponseInterceptor -> canonical ApiResponse<T>.

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SalesFetchSalesOverviewResponseDto {
  @ApiProperty({ type: [Object] })
  monthlyRevenue?: Array<{ month: string; revenue: number; }>;

}
