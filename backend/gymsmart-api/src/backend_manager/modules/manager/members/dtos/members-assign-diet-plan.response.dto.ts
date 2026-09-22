// RESPONSIBILITY: Explicit response DTO for the frontend-frozen Manager API data contract.
// FLOW: Controller result -> MembersAssignDietPlanResponseDto -> CoreResponseInterceptor -> canonical ApiResponse<T>.

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class MembersAssignDietPlanResponseDto {
  @ApiProperty({ type: Boolean })
  success!: boolean;

}
