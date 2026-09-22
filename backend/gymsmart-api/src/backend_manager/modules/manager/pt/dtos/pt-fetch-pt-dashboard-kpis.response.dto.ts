// RESPONSIBILITY: Explicit response DTO for the frontend-frozen Manager API data contract.
// FLOW: Controller result -> PtFetchPtDashboardKpisResponseDto -> CoreResponseInterceptor -> canonical ApiResponse<T>.

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PtFetchPtDashboardKpisResponseDto {
  @ApiProperty({ type: Number })
  monthlyPtRevenue?: number;

  @ApiProperty({ type: Number })
  packagesExpiringSoon?: number;

  @ApiProperty({ type: Number })
  sessionsScheduledToday?: number;

  @ApiProperty({ type: Number })
  totalActiveAssignments?: number;

}
