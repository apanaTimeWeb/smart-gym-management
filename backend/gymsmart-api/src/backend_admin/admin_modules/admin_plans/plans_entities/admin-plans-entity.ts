// RESPONSIBILITY: Owns PostgreSQL persistence for the Admin plans feature and its frontend-backed payload.
// FLOW: Plans Repository â†’ AdminPlansEntity â†’ PostgreSQL admin_plans table.
import { PrimaryGeneratedColumn, Column, Entity, Index } from 'typeorm';

import { AdminCoreBaseEntity } from '@/backend_admin/admin_core/admin_core_database/admin-core-base.entity.js';

import { AdminPlansStatus } from '@/backend_admin/admin_modules/admin_plans/admin-plans.constants.js';
import { AdminPlansTier } from '@/backend_admin/admin_modules/admin_plans/admin-plans.constants.js';

@Entity('admin_plans')
@Index('IDX_admin_plans_created_at', ['createdAt'])
/**
 * @description Defines the AdminPlansEntity boundary for the admin_plans backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminPlansEntity extends AdminCoreBaseEntity {

  @PrimaryGeneratedColumn('uuid', { name: 'id', primaryKeyConstraintName: 'PK_admin_plans_ID' })
  declare id: string;
  @Column({ name: 'name', type: 'varchar', length: 200, nullable: true })
  name!: string | null;

  @Column({ name: 'status', type: 'enum', enum: AdminPlansStatus, enumName: 'admin_plans_status', nullable: true })
  status!: AdminPlansStatus | null;

  @Column({ name: 'branch_id', type: 'uuid', nullable: true })
  branchId!: string | null;

  @Column({ name: 'amount_minor', type: 'bigint', nullable: true })
  amountMinor!: string | null;

  @Column({ name: 'tier', type: 'enum', enum: AdminPlansTier, enumName: 'admin_plans_tier', nullable: true })
  tier!: AdminPlansTier | null;

  @Column({ name: 'payload', type: 'jsonb', default: () => "'{}'::jsonb" })
  payload!: Record<string, unknown>;
}
