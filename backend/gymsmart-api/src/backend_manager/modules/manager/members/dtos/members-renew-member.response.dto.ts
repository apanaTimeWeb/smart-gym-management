// RESPONSIBILITY: Exact response DTO contract for CoreJsonObject /api/v1/manager/members/:id/renew.
// CoreJsonObject: CoreJsonObject projection -> MembersRenewMemberResponseDto -> CoreResponseInterceptor -> canonical ApiResponse<T>.

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import type { CoreJsonObject } from '@/core/types/json-value.types';

export class MembersRenewMemberResponseDto {
  @ApiPropertyOptional()
  plan?: CoreJsonObject;

  @ApiPropertyOptional()
  recentPayments?: CoreJsonObject[];

  @ApiPropertyOptional()
  dietPlan?: CoreJsonObject;

  @ApiPropertyOptional()
  workoutPlan?: CoreJsonObject;

  @ApiPropertyOptional()
  assignedDiet?: CoreJsonObject;

  @ApiPropertyOptional()
  assignedWorkout?: CoreJsonObject;

}
