// RESPONSIBILITY: Explicit response DTO for the frontend-frozen Manager API data contract.
// FLOW: Controller result -> MembersUpdateMemberResponseDto -> CoreResponseInterceptor -> canonical ApiResponse<T>.

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class MembersUpdateMemberResponseDto {
  @ApiProperty({ type: Object })
  dietPlan?: { name?: string; };

  @ApiProperty({ type: [Object] })
  recentPayments?: Array<{ amount?: number; }>;

  @ApiProperty({ type: Object })
  workoutPlan?: { name?: string; };

}
