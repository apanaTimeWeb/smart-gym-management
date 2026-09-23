// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { ApiProperty } from '@nestjs/swagger';

export class ReferralsFetchReferralKPIsResponseDto {
  @ApiProperty({type:Number}) totalReferrals!:number;
  @ApiProperty({type:Number}) totalConverted!:number;
  @ApiProperty({type:Number}) pendingRewards!:number;
  @ApiProperty({type:Number}) claimedRewards!:number;
  @ApiProperty({type:Number}) conversionRate!:number;
  @ApiProperty({type:Number}) totalRewardsPaidOut!:number;
}
