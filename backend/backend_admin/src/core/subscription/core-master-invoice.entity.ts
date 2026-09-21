// RESPONSIBILITY: Maps master-database subscription and billing state required by the Admin domain.
// FLOW: Master DB → entity → Admin subscription/plan services → canonical API response.

import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('invoices_master')
@Index('IDX_invoices_master_tenant_id', ['tenantId'])
export class CoreMasterInvoiceEntity {
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: 'PK_invoices_master' })
  id!: string;

  @Column({ name: 'tenant_id', type: 'uuid' })

  tenantId!: string;

  @Column({ name: 'invoice_no', type: 'varchar', length: 80 })

  invoiceNo!: string;

  @Column({ name: 'amount_minor', type: 'bigint' })

  amountMinor!: string;

  @Column({ name: 'status', type: 'varchar', length: 32 })

  status!: string;

  @Column({ name: 'issued_at', type: 'timestamptz' })

  issuedAt!: Date;

  @Column({ name: 'payload', type: 'jsonb', default: () => "'{}'::jsonb" })

  payload!: Record<string, unknown>;
}
