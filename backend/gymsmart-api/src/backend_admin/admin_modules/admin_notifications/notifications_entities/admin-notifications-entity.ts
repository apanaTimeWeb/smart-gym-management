// RESPONSIBILITY: Owns PostgreSQL persistence for the Admin notifications feature and its frontend-backed payload.
// FLOW: Notifications Repository â†’ AdminNotificationsEntity â†’ PostgreSQL admin_notifications table.
import { PrimaryGeneratedColumn, Column, Entity, Index } from 'typeorm';

import { AdminCoreBaseEntity } from '@/backend_admin/admin_core/admin_core_database/admin-core-base.entity'

import { AdminNotificationsStatus } from '@/backend_admin/admin_modules/admin_notifications/admin-notifications.constants'

@Entity('admin_notifications')
@Index('IDX_admin_notifications_created_at', ['createdAt'])
/**
 * @description Defines the AdminNotificationsEntity boundary for the admin_notifications backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminNotificationsEntity extends AdminCoreBaseEntity {

  @PrimaryGeneratedColumn('uuid', { name: 'id', primaryKeyConstraintName: 'PK_admin_notifications_ID' })
  declare id: string;
  @Column({ name: 'name', type: 'varchar', length: 200, nullable: true })
  name!: string | null;

  @Column({ name: 'status', type: 'enum', enum: AdminNotificationsStatus, enumName: 'admin_notifications_status', nullable: true })
  status!: AdminNotificationsStatus | null;

  @Column({ name: 'branch_id', type: 'uuid', nullable: true })
  branchId!: string | null;

  @Column({ name: 'amount_minor', type: 'bigint', nullable: true })
  amountMinor!: string | null;

  @Column({ name: 'read', type: 'boolean', default: false })
  read!: boolean;

  @Column({ name: 'payload', type: 'jsonb', default: () => "'{}'::jsonb" })
  payload!: Record<string, unknown>;
}
