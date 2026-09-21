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
  bankDetails!: Record<string, unknown> | unknown[] | null;
  @ApiPropertyOptional()
  status!: string;
  @ApiPropertyOptional()
  joinedAt!: string;
  @ApiPropertyOptional()
  referralCount!: number;
  @ApiPropertyOptional()
  conversionRate!: number;
}
