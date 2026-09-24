import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
// RESPONSIBILITY: Validates creation payloads at the invoices HTTP boundary.
// FLOW: HTTP JSON -> SuperadminSaasBillingInvoicesCreateDto -> Invoices service.
import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsEmail, IsEnum, IsISO4217CurrencyCode, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

import { SaasInvoiceStatus as SaasInvoiceStatus, SaasInvoicePaymentMethod as InvoicesPaymentMethod, SaasInvoiceInvoiceType as InvoicesInvoiceType } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/superadmin-saas-billing-invoices.constants';
/**
 * Primary Intent: Defines SuperadminSaasBillingInvoicesCreateDto as the class-level contract for superadmin-saas-billing-invoices-create.dto.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminSaasBillingInvoicesCreateDto {
  @IsString()
  @ApiProperty()
  /** Primary Intent: Defines the `tenantId` data contract for this superadmin-saas-billing-invoices-create.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  tenantId!: string;
  @IsString()
  @ApiProperty()
  /** Primary Intent: Defines the `tenantName` data contract for this superadmin-saas-billing-invoices-create.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  tenantName!: string;
  @IsInt()
  @Min(0)
  @ApiProperty()
  /** Primary Intent: Defines the `amount` data contract for this superadmin-saas-billing-invoices-create.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  amount!: number;
  @IsISO4217CurrencyCode()
  @ApiProperty()
  /** Primary Intent: Defines the `currency` data contract for this superadmin-saas-billing-invoices-create.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  currency!: string;
  @IsEnum(SaasInvoiceStatus)
  @ApiProperty()
  /** Primary Intent: Defines the `status` data contract for this superadmin-saas-billing-invoices-create.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  status!: SaasInvoiceStatus;
  @Type(() => Date)
  @IsDate()
  @ApiProperty()
  /** Primary Intent: Defines the `issuedAt` data contract for this superadmin-saas-billing-invoices-create.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  issuedAt!: Date;
  @Type(() => Date)
  @IsDate()
  @ApiProperty()
  /** Primary Intent: Defines the `dueDate` data contract for this superadmin-saas-billing-invoices-create.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  dueDate!: Date;
  @Type(() => Date)
  @IsDate()
  @ApiProperty()
  /** Primary Intent: Defines the `paidAt` data contract for this superadmin-saas-billing-invoices-create.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  paidAt!: Date;
  @IsEnum(InvoicesPaymentMethod)
  @ApiProperty()
  /** Primary Intent: Defines the `paymentMethod` data contract for this superadmin-saas-billing-invoices-create.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  paymentMethod!: InvoicesPaymentMethod;
  @IsEnum(InvoicesInvoiceType)
  @ApiProperty()
  /** Primary Intent: Defines the `invoiceType` data contract for this superadmin-saas-billing-invoices-create.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  invoiceType!: InvoicesInvoiceType;
  @IsString()
  @ApiProperty()
  /** Primary Intent: Defines the `planName` data contract for this superadmin-saas-billing-invoices-create.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  planName!: string;
  @IsString()
  @ApiProperty()
  /** Primary Intent: Defines the `taxId` data contract for this superadmin-saas-billing-invoices-create.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  taxId!: string;
}
