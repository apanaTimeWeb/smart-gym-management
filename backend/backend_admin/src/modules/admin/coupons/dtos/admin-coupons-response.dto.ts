// RESPONSIBILITY: Describes the frontend-consumed response fields for Admin coupons.
import { ApiProperty } from '@nestjs/swagger';

// FLOW: Repository domain → Coupons response mapper → ApiResponse<T>.

export class AdminCouponDto {
  @ApiProperty()
  id!: string;
  @ApiProperty()
  code!: string;
  @ApiProperty()
  description!: string;
  @ApiProperty({ enum: ['percentage', 'flat'] })
  type!: string;
  @ApiProperty()
  value!: number;
  @ApiProperty()
  minOrderAmount!: number;
  @ApiProperty()
  maxDiscount!: number;
  @ApiProperty()
  usageLimit!: number;
  @ApiProperty()
  usedCount!: number;
  @ApiProperty({ type: [String] })
  assignedGyms!: string[];
  @ApiProperty({ type: [String] })
  assignedGymNames!: string[];
  @ApiProperty()
  validFrom!: string;
  @ApiProperty()
  validUntil!: string;
  @ApiProperty({ enum: ['active', 'inactive', 'expired'] })
  status!: string;
  @ApiProperty()
  createdAt!: string;
}

export class AdminCouponListResponseDto {
  @ApiProperty({ type: [AdminCouponDto] })
  data!: AdminCouponDto[];
}

export class AdminCouponsKPIDataDto {
  @ApiProperty()
  totalCoupons!: number;
  @ApiProperty()
  activeCoupons!: number;
  @ApiProperty()
  totalRedeemed!: number;
  @ApiProperty()
  revenueLost!: number;
}
