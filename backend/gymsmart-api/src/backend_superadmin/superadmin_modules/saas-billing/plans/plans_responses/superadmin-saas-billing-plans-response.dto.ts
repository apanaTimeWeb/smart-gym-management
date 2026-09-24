// RESPONSIBILITY: Defines the stable response data contract for plans endpoints.
// FLOW: Domain model -> SuperadminSaasBillingPlansResponseDto -> canonical ApiResponse envelope.
import { ApiPropertyOptional } from '@nestjs/swagger';

/**
 * Primary Intent: Defines SuperadminSaasBillingPlansResponseDto as the class-level contract for superadmin-saas-billing-plans-response.dto.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminSaasBillingPlansResponseDto {
  @ApiPropertyOptional() id!: string;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `name` data contract for this superadmin-saas-billing-plans-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  name!: string;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `priceMonthly` data contract for this superadmin-saas-billing-plans-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  priceMonthly!: number;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `priceMonthlyCurrency` data contract for this superadmin-saas-billing-plans-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  priceMonthlyCurrency!: string;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `priceAnnual` data contract for this superadmin-saas-billing-plans-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  priceAnnual!: number;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `priceAnnualCurrency` data contract for this superadmin-saas-billing-plans-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  priceAnnualCurrency!: string;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `maxMembers` data contract for this superadmin-saas-billing-plans-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  maxMembers!: number;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `maxStaff` data contract for this superadmin-saas-billing-plans-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  maxStaff!: number;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `dbLimitGb` data contract for this superadmin-saas-billing-plans-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  dbLimitGb!: number;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `binaryLimitGb` data contract for this superadmin-saas-billing-plans-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  binaryLimitGb!: number;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `features` data contract for this superadmin-saas-billing-plans-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  features!: Record<string, unknown> | unknown[] | null;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `activeTenants` data contract for this superadmin-saas-billing-plans-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  activeTenants!: number;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `isPublic` data contract for this superadmin-saas-billing-plans-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  isPublic!: boolean;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `trialDays` data contract for this superadmin-saas-billing-plans-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  trialDays!: number;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `setupFee` data contract for this superadmin-saas-billing-plans-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  setupFee!: number;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `setupFeeCurrency` data contract for this superadmin-saas-billing-plans-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  setupFeeCurrency!: string;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `currency` data contract for this superadmin-saas-billing-plans-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  currency!: string;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `isArchived` data contract for this superadmin-saas-billing-plans-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  isArchived!: boolean;
}
