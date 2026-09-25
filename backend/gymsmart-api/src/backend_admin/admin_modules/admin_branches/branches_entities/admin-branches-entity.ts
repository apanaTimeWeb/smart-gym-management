// RESPONSIBILITY: Owns PostgreSQL persistence for the Admin branches feature and its frontend-backed payload.
// FLOW: Branches Repository â†’ AdminBranchesEntity â†’ PostgreSQL admin_branches table.
import { PrimaryGeneratedColumn, Column, Entity, Index } from 'typeorm';

import { AdminCoreBaseEntity } from '@/backend_admin/admin_core/admin_core_database/admin-core-base.entity'

import { AdminBranchesStatus } from '@/backend_admin/admin_modules/admin_branches/admin-branches.constants'

@Entity('admin_branches')
@Index('IDX_admin_branches_created_at', ['createdAt'])
/**
 * @description Defines the AdminBranchesEntity boundary for the admin_branches backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminBranchesEntity extends AdminCoreBaseEntity {

  @PrimaryGeneratedColumn('uuid', { name: 'id', primaryKeyConstraintName: 'PK_admin_branches_ID' })
  declare id: string;
  @Column({ name: 'name', type: 'varchar', length: 200, nullable: true })
  name!: string | null;

  @Column({ name: 'status', type: 'enum', enum: AdminBranchesStatus, enumName: 'admin_branches_status', nullable: true })
  status!: AdminBranchesStatus | null;

  @Column({ name: 'branch_id', type: 'uuid', nullable: true })
  branchId!: string | null;

  @Column({ name: 'amount_minor', type: 'bigint', nullable: true })
  amountMinor!: string | null;

  @Column({ name: 'payload', type: 'jsonb', default: () => "'{}'::jsonb" })
  payload!: Record<string, unknown>;
}
