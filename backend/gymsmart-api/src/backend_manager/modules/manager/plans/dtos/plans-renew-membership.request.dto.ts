import { CoreRequestDto } from '@/backend_manager/core/dtos/core-request.dto';
// RESPONSIBILITY: Strict feature-local request DTO for POST /api/v1/manager/plans/membership-renew.
// FLOW: HTTP payload -> PlansRenewMembershipRequestDto validation -> write use case -> orchestrator.

import { IsISO8601, IsOptional, IsString } from 'class-validator';

export class PlansRenewMembershipRequestDto extends CoreRequestDto {
  @IsString()
  memberId!: string;

  @IsString()
  planId!: string;

  @IsISO8601()
  newExpiryDate!: string;

}
