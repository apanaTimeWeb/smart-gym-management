// RESPONSIBILITY: Defines the stable response data contract for affiliates endpoints.
// FLOW: Domain model -> AffiliatesResponseDto -> canonical ApiResponse envelope.
import { ApiPropertyOptional } from '@nestjs/swagger';

export class AffiliatesResponseDto {
  @ApiPropertyOptional() id!: string;
  @ApiPropertyOptional()
  name!: string;
  @ApiPropertyOptional()
  email!: string;
  @ApiPropertyOptional()
  phone!: string;
  @ApiPropertyOptional()
  referralCode!: string;
  @ApiPropertyOptional()
  totalReferred!: number;
  @ApiPropertyOptional()
  commissionEarned!: number;
  @ApiPropertyOptional()
  commissionRate!: number;
  @ApiPropertyOptional()
  pendingPayout!: number;
  @ApiPropertyOptional()
  bankDetails!: string;
  @ApiPropertyOptional()
  status!: string;
  @ApiPropertyOptional()
  joinedAt!: string;
  @ApiPropertyOptional()
  referralCount!: number;
  @ApiPropertyOptional()
  conversionRate!: number;
}

export class AffiliatePayoutRecordDto {
  @ApiPropertyOptional() id!: string;
  @ApiPropertyOptional() affiliateId!: string;
  @ApiPropertyOptional() affiliateName!: string;
  @ApiPropertyOptional() amount!: number;
  @ApiPropertyOptional({ enum: ['BANK_TRANSFER', 'PAYPAL'] }) method!: string;
  @ApiPropertyOptional() referenceId!: string;
  @ApiPropertyOptional({ enum: ['PENDING', 'COMPLETED'] }) status!: string;
  @ApiPropertyOptional() paidAt!: string;
}
