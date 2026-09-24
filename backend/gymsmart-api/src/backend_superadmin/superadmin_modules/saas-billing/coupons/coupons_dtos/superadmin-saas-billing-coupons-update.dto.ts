import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
// RESPONSIBILITY: Validates partial updates at the coupons HTTP boundary.
// FLOW: HTTP JSON -> SuperadminSaasBillingCouponsUpdateDto -> Coupons service.
import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsEmail, IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

import { CouponDiscountType as CouponsDiscountType, CouponStatus as CouponsStatus } from '@/backend_superadmin/superadmin_modules/saas-billing/coupons/superadmin-saas-billing-coupons.constants';
/**
 * Primary Intent: Defines SuperadminSaasBillingCouponsUpdateDto as the class-level contract for superadmin-saas-billing-coupons-update.dto.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminSaasBillingCouponsUpdateDto {
  @IsOptional()
  @IsString()
  @ApiProperty()
  /** Primary Intent: Defines the `code` data contract for this superadmin-saas-billing-coupons-update.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  code!: string;
  @IsOptional()
  @IsEnum(CouponsDiscountType)
  @ApiProperty()
  /** Primary Intent: Defines the `discountType` data contract for this superadmin-saas-billing-coupons-update.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  discountType!: CouponsDiscountType;
  @IsOptional()
  @IsInt()
  @Min(0)
  @ApiProperty()
  /** Primary Intent: Defines the `discountValue` data contract for this superadmin-saas-billing-coupons-update.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  discountValue!: number;
  /** Currency code paired with discountValue when discountType is a fixed monetary amount. */
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: 'ISO 4217 currency code for fixed-amount discounts.' })
  currency?: string;
  @IsOptional()
  @IsInt()
  @Min(0)
  @ApiProperty()
  /** Primary Intent: Defines the `maxUses` data contract for this superadmin-saas-billing-coupons-update.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  maxUses!: number;
  @IsOptional()
  @IsInt()
  @Min(0)
  @ApiProperty()
  /** Primary Intent: Defines the `currentUses` data contract for this superadmin-saas-billing-coupons-update.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  currentUses!: number;
  @IsOptional()
  @IsEnum(CouponsStatus)
  @ApiProperty()
  /** Primary Intent: Defines the `status` data contract for this superadmin-saas-billing-coupons-update.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  status!: CouponsStatus;
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  @ApiProperty()
  /** Primary Intent: Defines the `expiryDate` data contract for this superadmin-saas-billing-coupons-update.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  expiryDate!: Date;
}
