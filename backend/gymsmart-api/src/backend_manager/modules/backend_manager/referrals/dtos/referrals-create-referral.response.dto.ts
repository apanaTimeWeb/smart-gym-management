// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { ApiProperty } from '@nestjs/swagger';

import { ReferralStatus } from '@/backend_manager/modules/backend_manager/referrals/referrals.constants';
import { RewardType } from '@/backend_manager/modules/backend_manager/referrals/referrals.constants';

export class ReferralsCreateReferralResponseDto {
  @ApiProperty({ type: [Object] })
  data!: Array<{dateReferred?: string; refereeName: string; refereePhone: string; referrerName: string; rewardAmount: number; rewardStatus: string; status: string;}>;

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

}
