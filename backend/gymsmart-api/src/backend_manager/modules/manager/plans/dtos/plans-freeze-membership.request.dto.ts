import { CoreRequestDto } from '@/backend_manager/core/dtos/core-request.dto';
// RESPONSIBILITY: Strict feature-local request DTO for POST /api/v1/manager/plans/membership-freeze.
// FLOW: HTTP payload -> PlansFreezeMembershipRequestDto validation -> write use case -> orchestrator.

import { IsOptional, IsString } from 'class-validator';

export class PlansFreezeMembershipRequestDto extends CoreRequestDto {
  @IsString()
  memberId!: string;

  @IsString()
  freezeFrom!: string;

  @IsString()
  freezeUntil!: string;

}
