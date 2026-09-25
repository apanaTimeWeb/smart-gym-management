// RESPONSIBILITY: Owns PostgreSQL persistence for the Admin members feature and its frontend-backed payload.
// FLOW: Members Repository â†’ AdminMembersEntity â†’ PostgreSQL admin_members table.
import { PrimaryGeneratedColumn, Column, Entity, Index } from 'typeorm';

import { AdminCoreBaseEntity } from '@/backend_admin/admin_core/admin_core_database/admin-core-base.entity.js';

import { AdminMembersStatus } from '@/backend_admin/admin_modules/admin_members/admin-members.constants.js';

@Entity('admin_members')
@Index('IDX_admin_members_created_at', ['createdAt'])
/**
 * @description Defines the AdminMembersEntity boundary for the admin_members backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminMembersEntity extends AdminCoreBaseEntity {

  @PrimaryGeneratedColumn('uuid', { name: 'id', primaryKeyConstraintName: 'PK_admin_members_ID' })
  declare id: string;

  @Column({ name: 'name', type: 'varchar', length: 200, nullable: true })
  name!: string | null;

  @Column({ name: 'status', type: 'enum', enum: AdminMembersStatus, enumName: 'admin_members_status', nullable: true })
  status!: AdminMembersStatus | null;

  @Column({ name: 'branch_id', type: 'uuid', nullable: true })
  branchId!: string | null;

  @Column({ name: 'amount_minor', type: 'bigint', nullable: true })
  amountMinor!: number | null;

  @Column({ name: 'payload', type: 'jsonb', default: () => "'{}'::jsonb" })
  payload!: Record<string, unknown>;
}
