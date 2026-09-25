// RESPONSIBILITY: Defines the stable response data contract for affiliates endpoints.
// FLOW: Domain model -> SuperadminAffiliatesResponseDto -> canonical ApiResponse envelope.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

/**
 * Primary Intent: Defines SuperadminAffiliatesResponseDto as the class-level contract for superadmin-affiliates-response.dto.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminAffiliatesResponseDto {
  @ApiPropertyOptional() id!: string;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `name` data contract for this superadmin-affiliates-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  name!: string;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `email` data contract for this superadmin-affiliates-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  email!: string;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `phone` data contract for this superadmin-affiliates-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  phone!: string;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `referralCode` data contract for this superadmin-affiliates-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  referralCode!: string;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `totalReferred` data contract for this superadmin-affiliates-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  totalReferred!: number;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `commissionEarned` data contract for this superadmin-affiliates-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  commissionEarned!: number;

  @ApiProperty({ example: 'INR' })
  /** Primary Intent: Defines the `currency` data contract for this superadmin-affiliates-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  currency!: string;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `commissionRate` data contract for this superadmin-affiliates-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  commissionRate!: number;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `pendingPayout` data contract for this superadmin-affiliates-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  pendingPayout!: number;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `bankDetails` data contract for this superadmin-affiliates-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  bankDetails!: string;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `status` data contract for this superadmin-affiliates-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  status!: string;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `joinedAt` data contract for this superadmin-affiliates-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  joinedAt!: string;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `referralCount` data contract for this superadmin-affiliates-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  referralCount!: number;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `conversionRate` data contract for this superadmin-affiliates-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  conversionRate!: number;
}
/**
 * Primary Intent: Defines SuperadminAffiliatePayoutRecordDto as the explicit architectural construct for this backend module.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and contract invariants when modifying this construct.
 * Side-Effects: Only documented database, event, cache, queue, or external-service effects are allowed.
 * AI-Note: Keep this construct isolated to its owning feature, use absolute imports, and preserve its frozen API/data contract.
 */

export class SuperadminAffiliatePayoutRecordDto {
  @ApiPropertyOptional() id!: string;
  @ApiPropertyOptional() affiliateId!: string;
  @ApiPropertyOptional() affiliateName!: string;
  @ApiPropertyOptional() amount!: number;
  @ApiProperty({ example: 'INR' }) currency!: string;
  @ApiPropertyOptional({ enum: ['BANK_TRANSFER', 'PAYPAL'] }) method!: string;
  @ApiPropertyOptional() referenceId!: string;
  @ApiPropertyOptional({ enum: ['PENDING', 'COMPLETED'] }) status!: string;
  @ApiPropertyOptional() paidAt!: string;
}
