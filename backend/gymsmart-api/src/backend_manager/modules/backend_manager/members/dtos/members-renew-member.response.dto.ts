// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { ApiPropertyOptional } from '@nestjs/swagger';

import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';

export class MembersRenewMemberResponseDto {
  @ApiPropertyOptional()
  plan!: CoreJsonObject;

  @ApiPropertyOptional()
  recentPayments!: CoreJsonObject[];

  @ApiPropertyOptional()
  dietPlan!: CoreJsonObject;

  @ApiPropertyOptional()
  workoutPlan!: CoreJsonObject;

  @ApiPropertyOptional()
  assignedDiet!: CoreJsonObject;

  @ApiPropertyOptional()
  assignedWorkout!: CoreJsonObject;

}
