// RESPONSIBILITY: Explicit response DTO for the frontend-frozen Manager API data contract.
// FLOW: Controller result -> MembersFetchMemberStatsResponseDto -> CoreResponseInterceptor -> canonical ApiResponse<T>.

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class MembersFetchMemberStatsResponseDto {
  @ApiProperty({ type: Number })
  active?: number;

  @ApiProperty({ type: Number })
  expired?: number;

  @ApiProperty({ type: Number })
  total?: number;

}
