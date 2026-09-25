// RESPONSIBILITY: Maps master-database subscription and billing state required by the Admin domain.
// FLOW: Master DB â†’ entity â†’ Admin subscription/plan services â†’ canonical API response.
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

import { AdminCoreMasterInvoiceStatus } from '@/backend_admin/admin_core/admin_core_subscription/admin-core-master-invoice-status.enum'

@Entity('invoices_master')
@Index('IDX_invoices_master_tenant_id', ['tenantId'])
/**
 * @description Defines the AdminCoreMasterInvoiceEntity boundary for the admin_core_subscription backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminCoreMasterInvoiceEntity {
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: 'PK_invoices_master' })
  id!: string;

  @Column({ name: 'tenant_id', type: 'uuid' })

  tenantId!: string;

  @Column({ name: 'invoice_no', type: 'varchar', length: 80 })

  invoiceNo!: string;

  @Column({ name: 'amount_minor', type: 'bigint' })

  amountMinor!: string;

  @Column({ name: 'status', type: 'enum', enum: AdminCoreMasterInvoiceStatus, enumName: 'core_master_invoicestatus_enum' })

  status!: AdminCoreMasterInvoiceStatus;

  @Column({ name: 'issued_at', type: 'timestamptz' })

  issuedAt!: Date;

  @Column({ name: 'payload', type: 'jsonb', default: () => "'{}'::jsonb" })

  payload!: Record<string, unknown>;
}
