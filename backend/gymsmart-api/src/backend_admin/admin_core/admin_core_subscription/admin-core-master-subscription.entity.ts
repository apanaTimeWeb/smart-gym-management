// RESPONSIBILITY: Maps master-database subscription and billing state required by the Admin domain.
// FLOW: Master DB â†’ entity â†’ Admin subscription/plan services â†’ canonical API response.
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

import { AdminCoreMasterSubscriptionStatus } from '@/backend_admin/admin_core/admin_core_subscription/admin-core-master-subscription-status.enum'

@Entity('subscriptions_master')
@Index('IDX_subscriptions_master_tenant_id', ['tenantId'])
/**
 * @description Defines the AdminCoreMasterSubscriptionEntity boundary for the admin_core_subscription backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminCoreMasterSubscriptionEntity {
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: 'PK_subscriptions_master' })
  id!: string;

  @Column({ name: 'tenant_id', type: 'uuid' })

  tenantId!: string;

  @Column({ name: 'plan_id', type: 'uuid', nullable: true })

  planId!: string | null;

  @Column({ name: 'status', type: 'enum', enum: AdminCoreMasterSubscriptionStatus, enumName: 'core_master_subscriptionstatus_enum' })

  status!: AdminCoreMasterSubscriptionStatus;

  @Column({ name: 'auto_renew', type: 'boolean', default: true })

  autoRenew!: boolean;

  @Column({ name: 'payload', type: 'jsonb', default: () => "'{}'::jsonb" })

  payload!: Record<string, unknown>;
}
