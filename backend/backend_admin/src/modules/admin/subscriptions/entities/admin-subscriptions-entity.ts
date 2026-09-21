// RESPONSIBILITY: Owns PostgreSQL persistence for the Admin subscriptions feature and its frontend-backed payload.
// FLOW: Subscriptions Repository → AdminSubscriptionsEntity → PostgreSQL subscriptions table.

import { Column, Entity, Index } from 'typeorm';
import { CoreBaseEntity } from '@/core/database/core-base.entity';

@Entity('subscriptions')
@Index('IDX_subscriptions_created_at', ['createdAt'])
export class AdminSubscriptionsEntity extends CoreBaseEntity {
  @Column({ name: 'name', type: 'varchar', length: 200, nullable: true })
  name!: string | null;

  @Column({ name: 'status', type: 'varchar', length: 64, nullable: true })
  status!: string | null;

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
