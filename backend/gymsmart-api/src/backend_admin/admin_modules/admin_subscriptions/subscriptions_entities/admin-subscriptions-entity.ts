// RESPONSIBILITY: Owns PostgreSQL persistence for the Admin subscriptions feature and its frontend-backed payload.
// FLOW: Subscriptions Repository â†’ AdminSubscriptionsEntity â†’ PostgreSQL admin_subscriptions table.
import { PrimaryGeneratedColumn, Column, Entity, Index } from 'typeorm';

import { AdminCoreBaseEntity } from '@/backend_admin/admin_core/admin_core_database/admin-core-base.entity.js';

import { AdminSubscriptionsStatus } from '@/backend_admin/admin_modules/admin_subscriptions/admin-subscriptions.constants.js';

@Entity('admin_subscriptions')
@Index('IDX_admin_subscriptions_created_at', ['createdAt'])
/**
 * @description Defines the AdminSubscriptionsEntity boundary for the admin_subscriptions backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminSubscriptionsEntity extends AdminCoreBaseEntity {

  @PrimaryGeneratedColumn('uuid', { name: 'id', primaryKeyConstraintName: 'PK_admin_subscriptions_ID' })
  declare id: string;
  @Column({ name: 'name', type: 'varchar', length: 200, nullable: true })
  name!: string | null;

  @Column({ name: 'status', type: 'enum', enum: AdminSubscriptionsStatus, enumName: 'admin_subscriptions_status', nullable: true })
  status!: AdminSubscriptionsStatus | null;

  @Column({ name: 'branch_id', type: 'uuid', nullable: true })
  branchId!: string | null;

  @Column({ name: 'amount_minor', type: 'bigint', nullable: true })
  amountMinor!: string | null;

  @Column({ name: 'plan_id', type: 'uuid', nullable: true })
  planId!: string | null;

  @Column({ name: 'auto_renew', type: 'boolean', default: true })
  autoRenew!: boolean;

  @Column({ name: 'payload', type: 'jsonb', default: () => "'{}'::jsonb" })
  payload!: Record<string, unknown>;
}
