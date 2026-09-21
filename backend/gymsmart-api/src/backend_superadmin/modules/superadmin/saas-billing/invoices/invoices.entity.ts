// RESPONSIBILITY: TypeORM persistence entity for invoices feature data stored in `saas_invoices`.
// FLOW: invoices repository -> SaasInvoice entity -> PostgreSQL `saas_invoices`.
import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from '@/backend_superadmin/core/database/base.entity';

export enum SaasInvoiceStatus {
  FAILED = 'FAILED',
  OVERDUE = 'OVERDUE',
  PAID = 'PAID',
  PENDING = 'PENDING',
}

export enum SaasInvoicePaymentMethod {
  BankTransfer = 'Bank Transfer',
  CreditCard = 'Credit Card',
  UPI = 'UPI',
}

export enum SaasInvoiceInvoiceType {
  ONETIME = 'ONE_TIME',
  RECURRING = 'RECURRING',
  SETUPFEE = 'SETUP_FEE',
}

@Entity('superadmin_saas_invoices')
@Index('IDX_saas_invoices_updated_at', ['updatedAt'])
export class SaasInvoiceEntity extends BaseEntity {
  @Column({ name: 'tenant_id', type: 'varchar', length: 500 })
  tenantId!: string;
  @Column({ name: 'tenant_name', type: 'varchar', length: 500 })
  tenantName!: string;
  @Column({ name: 'amount', type: 'integer', default: 0 })
  amount!: number;
  @Column({ name: 'currency', type: 'varchar', length: 500 })
  currency!: string;
  @Column({ name: 'status', type: 'enum', enum: SaasInvoiceStatus })
  status!: SaasInvoiceStatus;
  @Column({ name: 'issued_at', type: 'timestamptz' })
  issuedAt!: Date;
  @Column({ name: 'due_date', type: 'timestamptz' })
  dueDate!: Date;
  @Column({ name: 'paid_at', type: 'timestamptz', nullable: true })
  paidAt!: Date | null;
  @Column({ name: 'payment_method', type: 'enum', enum: SaasInvoicePaymentMethod })
  paymentMethod!: SaasInvoicePaymentMethod;
  @Column({ name: 'invoice_type', type: 'enum', enum: SaasInvoiceInvoiceType })
  invoiceType!: SaasInvoiceInvoiceType;
  @Column({ name: 'plan_name', type: 'varchar', length: 500 })
  planName!: string;
  @Column({ name: 'tax_id', type: 'varchar', length: 500 })
  taxId!: string;
}
