// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { ApiProperty } from '@nestjs/swagger';
import { ReferralsFetchReferralsItemResponseDto } from '@/backend_manager/manager_modules/referrals/referrals_responses/manager-referrals-fetch-referrals-item.response.dto';

import { ReferralStatus } from '@/backend_manager/manager_modules/referrals/manager-referrals.constants';
import { RewardType } from '@/backend_manager/manager_modules/referrals/manager-referrals.constants';

export class ManagerReferralsFetchReferralsResponseDto {
  @ApiProperty({ type: [ReferralsFetchReferralsItemResponseDto] })
  data!: Array<ReferralsFetchReferralsItemResponseDto>;

  @ApiProperty()
  dateReferred!: string;

  @ApiProperty()
  id!: string;

  @ApiProperty()
  refereeName!: string;

  @ApiProperty()
  refereePhone!: string;

  @ApiProperty()
  referrerId!: string;

  @ApiProperty()
  referrerName!: string;

  @ApiProperty({ type: Number })
  rewardAmount!: number;

  @ApiProperty()
  rewardType!: RewardType;

  @ApiProperty()
  status!: ReferralStatus;

  @ApiProperty({ example: 'INR' })
  currency!: string;

}

export { ManagerReferralsFetchReferralsResponseDto as ReferralsFetchReferralsResponseDto };
