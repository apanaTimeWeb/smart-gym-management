// RESPONSIBILITY: TypeORM persistence entity for invoices feature data stored in `saas_invoices`.
// FLOW: invoices repository -> SaasInvoice entity -> PostgreSQL `saas_invoices`.
import { Column, Entity, Index } from 'typeorm';
import { SuperadminCoreBaseEntity } from '@/backend_superadmin/superadmin_core/superadmin_core_database/superadmin-core-base.entity';

import { SaasInvoiceInvoiceType, SaasInvoicePaymentMethod, SaasInvoiceStatus } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/superadmin-saas-billing-invoices.constants';
/**
 * Primary Intent: Defines SuperadminSaasBillingInvoicesEntity as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Entity('superadmin_saas_invoices')
@Index('IDX_saas_invoices_updated_at', ['updatedAt'])
export class SuperadminSaasBillingInvoicesEntity extends SuperadminCoreBaseEntity {
  /**
 * Primary Intent: Documents entity property tenantId. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'tenant_id', type: 'char', length: 3 })
  tenantId!: string;
  /**
 * Primary Intent: Documents entity property tenantName. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'tenant_name', type: 'varchar', length: 500 })
  tenantName!: string;
  /**
 * Primary Intent: Documents entity property amount. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'amount', type: 'integer', default: 0 })
  amount!: number;
  /**
 * Primary Intent: Documents entity property currency. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'currency', type: 'char', length: 3 })
  currency!: string;
  /**
 * Primary Intent: Documents entity property status. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'status', type: 'enum', enum: SaasInvoiceStatus })
  status!: SaasInvoiceStatus;
  /**
 * Primary Intent: Documents entity property issuedAt. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'issued_at', type: 'timestamptz' })
  issuedAt!: Date;
  /**
 * Primary Intent: Documents entity property dueDate. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'due_date', type: 'timestamptz' })
  dueDate!: Date;
  /**
 * Primary Intent: Documents entity property paidAt. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'paid_at', type: 'timestamptz', nullable: true })
  paidAt!: Date | null;
  /**
 * Primary Intent: Documents entity property paymentMethod. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'payment_method', type: 'enum', enum: SaasInvoicePaymentMethod })
  paymentMethod!: SaasInvoicePaymentMethod;
  /**
 * Primary Intent: Documents entity property invoiceType. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'invoice_type', type: 'enum', enum: SaasInvoiceInvoiceType })
  invoiceType!: SaasInvoiceInvoiceType;
  /**
 * Primary Intent: Documents entity property planName. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'plan_name', type: 'varchar', length: 500 })
  planName!: string;
  /**
 * Primary Intent: Documents entity property taxId. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'tax_id', type: 'varchar', length: 500 })
  taxId!: string;
}
