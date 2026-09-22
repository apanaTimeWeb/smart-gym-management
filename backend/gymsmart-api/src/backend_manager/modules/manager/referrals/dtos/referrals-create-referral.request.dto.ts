import { CoreRequestDto } from '@/backend_manager/core/dtos/core-request.dto';
// RESPONSIBILITY: Strict feature-local request DTO for POST /api/v1/manager/referrals.
// FLOW: HTTP payload -> ReferralsCreateReferralRequestDto validation -> write use case -> orchestrator.

import { IsOptional, IsString } from 'class-validator';

export class ReferralsCreateReferralRequestDto extends CoreRequestDto {
  @IsString()
  referrerName!: string;

  @IsString()
  referrerId!: string;

  @IsString()
  refereeName!: string;

  @IsString()
  refereePhone!: string;

}
