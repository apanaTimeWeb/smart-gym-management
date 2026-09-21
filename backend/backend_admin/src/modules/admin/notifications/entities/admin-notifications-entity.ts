// RESPONSIBILITY: Owns PostgreSQL persistence for the Admin notifications feature and its frontend-backed payload.
// FLOW: Notifications Repository → AdminNotificationsEntity → PostgreSQL notifications table.

import { Column, Entity, Index } from 'typeorm';
import { CoreBaseEntity } from '@/core/database/core-base.entity';

@Entity('notifications')
@Index('IDX_notifications_created_at', ['createdAt'])
export class AdminNotificationsEntity extends CoreBaseEntity {
  @Column({ name: 'name', type: 'varchar', length: 200, nullable: true })
  name!: string | null;

  @Column({ name: 'status', type: 'varchar', length: 64, nullable: true })
  status!: string | null;

  @Column({ name: 'branch_id', type: 'uuid', nullable: true })
  branchId!: string | null;

  @Column({ name: 'amount_minor', type: 'bigint', nullable: true })
  amountMinor!: string | null;



  @Column({ name: 'read', type: 'boolean', default: false })
  read!: boolean;

  @Column({ name: 'payload', type: 'jsonb', default: () => "'{}'::jsonb" })
  payload!: Record<string, unknown>;
}
