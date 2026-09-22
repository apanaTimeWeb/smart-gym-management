// RESPONSIBILITY: Explicit response DTO for the frontend-frozen Manager API data contract.
// FLOW: Controller result -> SalesFetchMembershipReportResponseDto -> CoreResponseInterceptor -> canonical ApiResponse<T>.

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SalesFetchMembershipReportResponseDto {
  @ApiProperty({ type: [Object] })
  report?: Array<{ plan?: string; refund?: string; remaining?: string; revenue?: number; }>;

}
