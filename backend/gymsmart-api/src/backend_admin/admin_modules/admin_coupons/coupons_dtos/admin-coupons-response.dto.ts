// RESPONSIBILITY: Describes the frontend-consumed response fields for Admin coupons.
// FLOW: Repository domain â†’ Coupons response mapper â†’ ApiResponse<T>.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { AdminCouponsStatus } from '@/backend_admin/admin_modules/admin_coupons/admin-coupons.constants.js';

/**
 * @description Defines the AdminCouponDto boundary for the admin_coupons backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
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
  status!: AdminCouponsStatus;
  @ApiProperty()
  createdAt!: string;
  @ApiProperty({ description: 'ISO 4217 currency code', example: 'INR' })
  currency!: string;
}

/**
 * @description Defines the AdminCouponsKPIDataDto boundary for the admin_coupons backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminCouponsKPIDataDto {
  @ApiProperty()
  totalCoupons!: number;
  @ApiProperty()
  activeCoupons!: number;
  @ApiProperty()
  totalRedeemed!: number;
  @ApiProperty()
  revenueLost!: number;
  @ApiProperty({ description: 'ISO 4217 currency code', example: 'INR' })
  currency!: string;
}
