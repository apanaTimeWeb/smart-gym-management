// RESPONSIBILITY: Defines the stable response data contract for invoices endpoints.
// FLOW: Domain model -> SuperadminSaasBillingInvoicesResponseDto -> canonical ApiResponse envelope.
import { ApiPropertyOptional } from '@nestjs/swagger';

/**
 * Primary Intent: Defines SuperadminSaasBillingInvoicesResponseDto as the class-level contract for superadmin-saas-billing-invoices-response.dto.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminSaasBillingInvoicesResponseDto {
  @ApiPropertyOptional() id!: string;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `tenantId` data contract for this superadmin-saas-billing-invoices-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  tenantId!: string;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `tenantName` data contract for this superadmin-saas-billing-invoices-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  tenantName!: string;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `amount` data contract for this superadmin-saas-billing-invoices-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  amount!: number;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `currency` data contract for this superadmin-saas-billing-invoices-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  currency!: string;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `status` data contract for this superadmin-saas-billing-invoices-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  status!: string;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `issuedAt` data contract for this superadmin-saas-billing-invoices-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  issuedAt!: string;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `dueDate` data contract for this superadmin-saas-billing-invoices-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  dueDate!: string;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `paidAt` data contract for this superadmin-saas-billing-invoices-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  paidAt!: string | null;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `paymentMethod` data contract for this superadmin-saas-billing-invoices-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  paymentMethod!: string;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `invoiceType` data contract for this superadmin-saas-billing-invoices-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  invoiceType!: string;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `planName` data contract for this superadmin-saas-billing-invoices-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  planName!: string;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `taxId` data contract for this superadmin-saas-billing-invoices-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  taxId!: string;
}
