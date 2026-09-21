// RESPONSIBILITY: Maps master-database subscription and billing state required by the Admin domain.
// FLOW: Master DB â†’ entity â†’ Admin subscription/plan services â†’ canonical API response.

import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('admin_payment_methods_master')
@Index('IDX_payment_methods_master_tenant_id', ['tenantId'])
export class CoreMasterPaymentMethodEntity {
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: 'PK_payment_methods_master' })
  id!: string;

  @Column({ name: 'tenant_id', type: 'uuid' })

  tenantId!: string;

  @Column({ name: 'provider', type: 'varchar', length: 40 })

  provider!: string;

  @Column({ name: 'external_reference', type: 'varchar', length: 160 })

  externalReference!: string;

  @Column({ name: 'is_default', type: 'boolean', default: false })

  isDefault!: boolean;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive!: boolean;

  @Column({ name: 'payload', type: 'jsonb', default: () => "'{}'::jsonb" })

  payload!: Record<string, unknown>;
}
