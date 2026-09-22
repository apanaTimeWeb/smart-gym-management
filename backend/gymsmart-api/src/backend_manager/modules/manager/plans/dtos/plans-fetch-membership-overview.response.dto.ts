// RESPONSIBILITY: Explicit response DTO for the frontend-frozen Manager API data contract.
// FLOW: Controller result -> PlansFetchMembershipOverviewResponseDto -> CoreResponseInterceptor -> canonical ApiResponse<T>.

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PlansFetchMembershipOverviewResponseDto {
  @ApiProperty({ type: Number })
  activeCount?: number;

  @ApiProperty({ type: Number })
  revenue?: number;

}
