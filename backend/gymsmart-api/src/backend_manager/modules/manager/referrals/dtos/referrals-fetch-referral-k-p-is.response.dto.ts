// RESPONSIBILITY: Explicit response DTO for the frontend-frozen Manager API data contract.
// FLOW: Controller result -> ReferralsFetchReferralKPIsResponseDto -> CoreResponseInterceptor -> canonical ApiResponse<T>.

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ReferralsFetchReferralKPIsResponseDto {
  @ApiProperty({ type: Number })
  claimedRewards!: number;

  @ApiProperty({ type: Number })
  pendingRewards!: number;

  @ApiProperty({ type: Number })
  totalConverted!: number;

  @ApiProperty({ type: Number })
  totalReferrals!: number;

}
