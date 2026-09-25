// RESPONSIBILITY: Owns PostgreSQL persistence for the Admin blacklist feature and its frontend-backed payload.
// FLOW: Blacklist Repository â†’ AdminBlacklistEntity â†’ PostgreSQL admin_blacklisted_members table.
import { PrimaryGeneratedColumn, Column, Entity, Index } from 'typeorm';

import { AdminCoreBaseEntity } from '@/backend_admin/admin_core/admin_core_database/admin-core-base.entity.js';

import { AdminBlacklistStatus } from '@/backend_admin/admin_modules/admin_blacklist/admin-blacklist.constants.js';

@Entity('admin_blacklisted_members')
@Index('IDX_admin_blacklisted_members_created_at', ['createdAt'])
/**
 * @description Defines the AdminBlacklistEntity boundary for the admin_blacklist backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminBlacklistEntity extends AdminCoreBaseEntity {

  @PrimaryGeneratedColumn('uuid', { name: 'id', primaryKeyConstraintName: 'PK_admin_blacklisted_members_ID' })
  declare id: string;
  @Column({ name: 'name', type: 'varchar', length: 200, nullable: true })
  name!: string | null;

  @Column({ name: 'status', type: 'enum', enum: AdminBlacklistStatus, enumName: 'admin_blacklist_status', nullable: true })
  status!: AdminBlacklistStatus | null;

  @Column({ name: 'branch_id', type: 'uuid', nullable: true })
  branchId!: string | null;

  @Column({ name: 'amount_minor', type: 'bigint', nullable: true })
  amountMinor!: string | null;

  @Column({ name: 'member_id', type: 'uuid', nullable: true })
  memberId!: string | null;

  @Column({ name: 'payload', type: 'jsonb', default: () => "'{}'::jsonb" })
  payload!: Record<string, unknown>;
}
