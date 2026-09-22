import { ReferralStatus } from '@/modules/manager/referrals/referrals.constants';
import { RewardType } from '@/modules/manager/referrals/referrals.constants';
// RESPONSIBILITY: Explicit response DTO for the frontend-frozen Manager API data contract.
// FLOW: Controller result -> ReferralsFetchReferralsResponseDto -> CoreResponseInterceptor -> canonical ApiResponse<T>.

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ReferralsFetchReferralsResponseDto {
  @ApiProperty({ type: [Object] })
  data: Array<{dateReferred?: string; refereeName?: string; refereePhone?: string; referrerName?: string; rewardAmount?: number; rewardStatus?: string; status: string;}>;

  @ApiProperty()
  dateReferred: string;

  @ApiProperty()
  id: string;

  @ApiProperty()
  refereeName: string;

  @ApiProperty()
  refereePhone: string;

  @ApiProperty()
  referrerId: string;

  @ApiProperty()
  referrerName: string;

  @ApiProperty({ type: Number })
  rewardAmount: number;

  @ApiProperty()
  rewardType: RewardType;

  @ApiProperty()
  status: ReferralStatus;

}
