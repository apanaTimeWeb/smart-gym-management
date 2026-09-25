import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
// RESPONSIBILITY: Validates SuperadminSaasBillingInvoicesManualPaymentDto request input at the HTTP boundary.
// FLOW: HTTP JSON -> DTO -> feature use-case service.
import { IsISO4217CurrencyCode, IsInt, IsString, Min } from 'class-validator';

/**
 * Primary Intent: Defines SuperadminSaasBillingInvoicesManualPaymentDto as the class-level contract for superadmin-saas-billing-invoices-manual-payment.dto.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminSaasBillingInvoicesManualPaymentDto {
  @IsString()
  @ApiProperty()
  /** Primary Intent: Defines the `gymId` data contract for this superadmin-saas-billing-invoices-manual-payment.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  gymId!: string;
  @IsInt()
  @Min(0)
  @ApiProperty()
  /** Primary Intent: Defines the `amount` data contract for this superadmin-saas-billing-invoices-manual-payment.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  amount!: number;
  @IsString()
  @ApiProperty()
  /** Primary Intent: Defines the `planName` data contract for this superadmin-saas-billing-invoices-manual-payment.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  planName!: string;
  @IsISO4217CurrencyCode()
  @ApiProperty()
  /** Primary Intent: Defines the `currency` data contract for this superadmin-saas-billing-invoices-manual-payment.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  currency!: string;
}
