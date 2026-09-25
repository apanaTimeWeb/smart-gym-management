// RESPONSIBILITY: Owns PostgreSQL persistence for the Admin announcements feature and its frontend-backed payload.
// FLOW: Announcements Repository â†’ AdminAnnouncementsEntity â†’ PostgreSQL admin_announcements table.
import { PrimaryGeneratedColumn, Column, Entity, Index } from 'typeorm';

import { AdminCoreBaseEntity } from '@/backend_admin/admin_core/admin_core_database/admin-core-base.entity'

import { AdminAnnouncementsStatus } from '@/backend_admin/admin_modules/admin_announcements/admin-announcements.constants'

@Entity('admin_announcements')
@Index('IDX_admin_announcements_created_at', ['createdAt'])
/**
 * @description Defines the AdminAnnouncementsEntity boundary for the admin_announcements backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminAnnouncementsEntity extends AdminCoreBaseEntity {

  @PrimaryGeneratedColumn('uuid', { name: 'id', primaryKeyConstraintName: 'PK_admin_announcements_ID' })
  declare id: string;
  @Column({ name: 'name', type: 'varchar', length: 200, nullable: true })
  name!: string | null;

  @Column({ name: 'status', type: 'enum', enum: AdminAnnouncementsStatus, enumName: 'admin_announcements_status', nullable: true })
  status!: AdminAnnouncementsStatus | null;

  @Column({ name: 'branch_id', type: 'uuid', nullable: true })
  branchId!: string | null;

  @Column({ name: 'amount_minor', type: 'bigint', nullable: true })
  amountMinor!: string | null;

  @Column({ name: 'is_pinned', type: 'boolean', default: false })
  isPinned!: boolean;

  @Column({ name: 'payload', type: 'jsonb', default: () => "'{}'::jsonb" })
  payload!: Record<string, unknown>;
}
