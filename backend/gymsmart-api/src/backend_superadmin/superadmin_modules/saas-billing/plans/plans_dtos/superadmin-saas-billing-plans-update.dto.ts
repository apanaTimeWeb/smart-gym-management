import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
// RESPONSIBILITY: Validates partial updates at the plans HTTP boundary.
// FLOW: HTTP JSON -> SuperadminSaasBillingPlansUpdateDto -> Plans service.
import { IsBoolean, IsDateString, IsEmail, IsEnum, IsInt, IsOptional, IsString, Max, Min, IsISO4217CurrencyCode } from 'class-validator';
/**
 * Primary Intent: Defines SuperadminSaasBillingPlansUpdateDto as the class-level contract for superadmin-saas-billing-plans-update.dto.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminSaasBillingPlansUpdateDto {
  @IsOptional()
  @IsString()
  @ApiProperty()
  /** Primary Intent: Defines the `name` data contract for this superadmin-saas-billing-plans-update.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  name!: string;
  @IsOptional()
  @IsInt()
  @Min(0)
  @ApiProperty()
  /** Primary Intent: Defines the `priceMonthly` data contract for this superadmin-saas-billing-plans-update.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  priceMonthly!: number;
  @IsOptional()
  @IsInt()
  @Min(0)
  @ApiProperty()
  /** Primary Intent: Defines the `priceAnnual` data contract for this superadmin-saas-billing-plans-update.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  priceAnnual!: number;
  @IsOptional()
  @IsInt()
  @Min(0)
  @ApiProperty()
  /** Primary Intent: Defines the `maxMembers` data contract for this superadmin-saas-billing-plans-update.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  maxMembers!: number;
  @IsOptional()
  @IsInt()
  @Min(0)
  @ApiProperty()
  /** Primary Intent: Defines the `maxStaff` data contract for this superadmin-saas-billing-plans-update.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  maxStaff!: number;
  @IsOptional()
  @IsInt()
  @Min(0)
  @ApiProperty()
  /** Primary Intent: Defines the `dbLimitGb` data contract for this superadmin-saas-billing-plans-update.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  dbLimitGb!: number;
  @IsOptional()
  @IsInt()
  @Min(0)
  @ApiProperty()
  /** Primary Intent: Defines the `binaryLimitGb` data contract for this superadmin-saas-billing-plans-update.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  binaryLimitGb!: number;
  @IsOptional()
  @ApiProperty()
  /** Primary Intent: Defines the `features` data contract for this superadmin-saas-billing-plans-update.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  features!: Record<string, unknown> | unknown[] | null;
  @IsOptional()
  @IsInt()
  @Min(0)
  @ApiProperty()
  /** Primary Intent: Defines the `activeTenants` data contract for this superadmin-saas-billing-plans-update.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  activeTenants!: number;
  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  /** Primary Intent: Defines the `isPublic` data contract for this superadmin-saas-billing-plans-update.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  isPublic!: boolean;
  @IsOptional()
  @IsInt()
  @Min(0)
  @ApiProperty()
  /** Primary Intent: Defines the `trialDays` data contract for this superadmin-saas-billing-plans-update.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  trialDays!: number;
  @IsOptional()
  @IsInt()
  @Min(0)
  @ApiProperty()
  /** Primary Intent: Defines the `setupFee` data contract for this superadmin-saas-billing-plans-update.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  setupFee!: number;
  @IsOptional()
  @IsISO4217CurrencyCode()
  @ApiProperty()
  /** Primary Intent: Defines the `currency` data contract for this superadmin-saas-billing-plans-update.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  currency!: string;
  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  /** Primary Intent: Defines the `isArchived` data contract for this superadmin-saas-billing-plans-update.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  isArchived!: boolean;
}
