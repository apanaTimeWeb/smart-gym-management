// RESPONSIBILITY: Persists durable invoice email resend job state.
// FLOW: Resend command -> job repository -> Redis queue -> email adapter -> completed/failed state.
import { Column, Entity, Index } from 'typeorm';
import { SuperadminCoreBaseEntity } from '@/backend_superadmin/superadmin_core/superadmin_core_database/superadmin-core-base.entity';
import { SuperadminInvoicesResendJobStatus } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/superadmin-saas-billing-invoices.constants';

/**
 * Primary Intent: Defines SuperadminSaasBillingInvoicesResendJobEntity as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Entity('superadmin_saas_invoice_resend_jobs')
@Index('IDX_superadmin_saas_invoice_resend_jobs_status', ['status'])
@Index('IDX_superadmin_saas_invoice_resend_jobs_invoice_id', ['invoiceId'])
export class SuperadminSaasBillingInvoicesResendJobEntity extends SuperadminCoreBaseEntity {
  /**
 * Primary Intent: Documents entity property invoiceId. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'invoice_id', type: 'varchar', length: 64 })
  invoiceId!: string;

  /**
 * Primary Intent: Documents entity property tenantId. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'tenant_id', type: 'varchar', length: 64 })
  tenantId!: string;

  /**
 * Primary Intent: Documents entity property recipientEmail. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'recipient_email', type: 'varchar', length: 500 })
  recipientEmail!: string;

  /**
 * Primary Intent: Documents entity property status. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'status', type: 'enum', enum: SuperadminInvoicesResendJobStatus, default: SuperadminInvoicesResendJobStatus.QUEUED })
  status!: SuperadminInvoicesResendJobStatus;

  /**
 * Primary Intent: Documents entity property attempts. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'attempts', type: 'integer', default: 0 })
  attempts!: number;

  /**
 * Primary Intent: Documents entity property errorCode. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'error_code', type: 'varchar', length: 120, nullable: true })
  errorCode!: string | null;

  /**
 * Primary Intent: Documents entity property completedAt. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'completed_at', type: 'timestamptz', nullable: true })
  completedAt!: Date | null;
}
