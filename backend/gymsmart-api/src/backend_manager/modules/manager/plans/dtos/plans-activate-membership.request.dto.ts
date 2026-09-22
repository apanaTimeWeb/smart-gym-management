import { CoreRequestDto } from '@/backend_manager/core/dtos/core-request.dto';
// RESPONSIBILITY: Strict feature-local request DTO for POST /api/v1/manager/plans/membership-activate.
// FLOW: HTTP payload -> PlansActivateMembershipRequestDto validation -> write use case -> orchestrator.

import { IsISO8601, IsOptional, IsString } from 'class-validator';

export class PlansActivateMembershipRequestDto extends CoreRequestDto {
  @IsString()
  memberId!: string;

  @IsString()
  planId!: string;

  @IsISO8601()
  startDate!: string;

}
