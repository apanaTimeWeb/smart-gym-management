// RESPONSIBILITY: Defines a typed item in the owning Manager response contract.
// FLOW: Feature data row -> explicit item fields -> parent response DTO.
import { ApiProperty } from '@nestjs/swagger';

export class ManagerReferralsFetchReferralsItemResponseDto {
  @ApiProperty({ required: false })
  dateReferred?: string;
  @ApiProperty()
  refereeName!: string;
  @ApiProperty()
  refereePhone!: string;
  @ApiProperty()
  referrerName!: string;
  @ApiProperty()
  rewardAmount!: number;
  @ApiProperty()
  rewardStatus!: string;
  @ApiProperty()
  status!: string;
  @ApiProperty({ example: 'INR' })
  currency!: string;
}

export { ManagerReferralsFetchReferralsItemResponseDto as ReferralsFetchReferralsItemResponseDto };
