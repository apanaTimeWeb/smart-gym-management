// RESPONSIBILITY: Owns PostgreSQL persistence for the Admin profile feature and its frontend-backed payload.
// FLOW: Profile Repository â†’ AdminProfileEntity â†’ PostgreSQL admin_profiles table.
import { PrimaryGeneratedColumn, Column, Entity, Index } from 'typeorm';

import { AdminCoreBaseEntity } from '@/backend_admin/admin_core/admin_core_database/admin-core-base.entity.js';

import { AdminProfileStatus } from '@/backend_admin/admin_modules/admin_profile/admin-profile.constants.js';

@Entity('admin_profiles')
@Index('IDX_admin_profiles_created_at', ['createdAt'])
/**
 * @description Defines the AdminProfileEntity boundary for the admin_profile backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminProfileEntity extends AdminCoreBaseEntity {

  @PrimaryGeneratedColumn('uuid', { name: 'id', primaryKeyConstraintName: 'PK_admin_profiles_ID' })
  declare id: string;
  @Column({ name: 'name', type: 'varchar', length: 200, nullable: true })
  name!: string | null;

  @Column({ name: 'status', type: 'enum', enum: AdminProfileStatus, enumName: 'admin_profile_status', nullable: true })
  status!: AdminProfileStatus | null;

  @Column({ name: 'branch_id', type: 'uuid', nullable: true })
  branchId!: string | null;

  @Column({ name: 'amount_minor', type: 'bigint', nullable: true })
  amountMinor!: string | null;

  @Column({ name: 'payload', type: 'jsonb', default: () => "'{}'::jsonb" })
  payload!: Record<string, unknown>;
}
