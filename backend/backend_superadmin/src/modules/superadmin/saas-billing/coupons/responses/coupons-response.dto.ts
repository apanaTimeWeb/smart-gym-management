// RESPONSIBILITY: Defines the stable response data contract for coupons endpoints.
// FLOW: Domain model -> CouponsResponseDto -> canonical ApiResponse envelope.
import { ApiPropertyOptional } from '@nestjs/swagger';

export class CouponsResponseDto {
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
