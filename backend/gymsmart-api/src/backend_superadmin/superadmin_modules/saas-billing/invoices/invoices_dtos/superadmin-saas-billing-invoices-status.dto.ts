import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
// RESPONSIBILITY: Validates SuperadminSaasBillingSaasInvoiceStatusDto request input at the HTTP boundary.
// FLOW: HTTP JSON -> DTO -> feature use-case service.
import { IsEnum } from 'class-validator';
import { SaasInvoiceStatus } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/superadmin-saas-billing-invoices.constants';

/**
 * Primary Intent: Defines SuperadminSaasBillingSaasInvoiceStatusDto as the class-level contract for superadmin-saas-billing-invoices-status.dto.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminSaasBillingSaasInvoiceStatusDto {
  @IsEnum(SaasInvoiceStatus)
  @ApiProperty()
  /** Primary Intent: Defines the `status` data contract for this superadmin-saas-billing-invoices-status.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  status!: SaasInvoiceStatus;
}
