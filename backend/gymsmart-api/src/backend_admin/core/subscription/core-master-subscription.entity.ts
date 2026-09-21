// RESPONSIBILITY: Maps master-database subscription and billing state required by the Admin domain.
// FLOW: Master DB â†’ entity â†’ Admin subscription/plan services â†’ canonical API response.

import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('subscriptions_master')
@Index('IDX_subscriptions_master_tenant_id', ['tenantId'])
export class CoreMasterSubscriptionEntity {
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: 'PK_subscriptions_master' })
  id!: string;

  @Column({ name: 'tenant_id', type: 'uuid' })

  tenantId!: string;

  @Column({ name: 'plan_id', type: 'uuid', nullable: true })

  planId!: string | null;

  @Column({ name: 'status', type: 'varchar', length: 32 })

  status!: string;

  @Column({ name: 'auto_renew', type: 'boolean', default: true })

  autoRenew!: boolean;

  @Column({ name: 'payload', type: 'jsonb', default: () => "'{}'::jsonb" })

  payload!: Record<string, unknown>;
}
