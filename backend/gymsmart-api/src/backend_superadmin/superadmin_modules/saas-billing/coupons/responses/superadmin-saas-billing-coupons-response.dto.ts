// RESPONSIBILITY: Defines the stable response data contract for coupons endpoints.
// FLOW: Domain model -> SuperadminCouponsResponseDto -> canonical ApiResponse envelope.
import { ApiPropertyOptional } from '@nestjs/swagger';

export class SuperadminCouponsResponseDto {
  @ApiPropertyOptional() id!: string;
  @ApiPropertyOptional()
  code!: string;
  @ApiPropertyOptional()
  discountType!: string;
  @ApiPropertyOptional()
  discountValue!: number;
  @ApiPropertyOptional()
  maxUses!: number;
  @ApiPropertyOptional()
  currentUses!: number;
  @ApiPropertyOptional()
  status!: string;
  @ApiPropertyOptional()
  expiryDate!: string;
}