// RESPONSIBILITY: Defines the stable response data contract for coupons endpoints.
// FLOW: Domain model -> SuperadminSaasBillingCouponsResponseDto -> canonical ApiResponse envelope.
import { ApiPropertyOptional } from '@nestjs/swagger';

/**
 * Primary Intent: Defines SuperadminSaasBillingCouponsResponseDto as the class-level contract for superadmin-saas-billing-coupons-response.dto.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminSaasBillingCouponsResponseDto {
  @ApiPropertyOptional() id!: string;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `code` data contract for this superadmin-saas-billing-coupons-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  code!: string;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `discountType` data contract for this superadmin-saas-billing-coupons-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  discountType!: string;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `discountValue` data contract for this superadmin-saas-billing-coupons-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  discountValue!: number;
  /** ISO 4217 currency paired with fixed-amount discountValue; null for percentage discounts. */
  @ApiPropertyOptional({ nullable: true })
  currency!: string | null;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `maxUses` data contract for this superadmin-saas-billing-coupons-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  maxUses!: number;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `currentUses` data contract for this superadmin-saas-billing-coupons-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  currentUses!: number;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `status` data contract for this superadmin-saas-billing-coupons-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  status!: string;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `expiryDate` data contract for this superadmin-saas-billing-coupons-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  expiryDate!: string;
}
