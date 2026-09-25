// RESPONSIBILITY: Defines durable invoice resend job status for API consumers.
// FLOW: Resend job repository -> status DTO -> canonical response envelope.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { SuperadminInvoicesResendJobStatus } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/superadmin-saas-billing-invoices.constants';

/**
 * Primary Intent: Defines SuperadminSaasBillingInvoicesResendJobStatusResponseDto as the class-level contract for superadmin-saas-billing-invoices-resend-job-status-response.dto.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminSaasBillingInvoicesResendJobStatusResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty({ enum: SuperadminInvoicesResendJobStatus }) status!: SuperadminInvoicesResendJobStatus;
  @ApiProperty() invoiceId!: string;
  @ApiProperty() tenantId!: string;
  @ApiProperty() attempts!: number;
  @ApiPropertyOptional({ nullable: true }) errorCode!: string | null;
  @ApiPropertyOptional({ nullable: true, type: String, format: 'date-time' }) completedAt!: Date | null;
}
/**
 * Primary Intent: Defines SuperadminSaasBillingInvoicesResendQueuedResponseDto as the explicit architectural construct for this backend module.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and contract invariants when modifying this construct.
 * Side-Effects: Only documented database, event, cache, queue, or external-service effects are allowed.
 * AI-Note: Keep this construct isolated to its owning feature, use absolute imports, and preserve its frozen API/data contract.
 */

export class SuperadminSaasBillingInvoicesResendQueuedResponseDto {
  @ApiProperty() jobId!: string;
  @ApiProperty() statusUrl!: string;
}
