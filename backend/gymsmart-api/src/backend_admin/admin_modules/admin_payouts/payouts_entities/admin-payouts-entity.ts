// RESPONSIBILITY: Owns PostgreSQL persistence for the Admin payouts feature and its frontend-backed payload.
// FLOW: Payouts Repository â†’ AdminPayoutsEntity â†’ PostgreSQL admin_gym_payouts table.
import { PrimaryGeneratedColumn, Column, Entity, Index } from 'typeorm';

import { AdminCoreBaseEntity } from '@/backend_admin/admin_core/admin_core_database/admin-core-base.entity.js';

import { AdminPayoutsStatus } from '@/backend_admin/admin_modules/admin_payouts/admin-payouts.constants.js';

@Entity('admin_gym_payouts')
@Index('IDX_admin_gym_payouts_created_at', ['createdAt'])
/**
 * @description Defines the AdminPayoutsEntity boundary for the admin_payouts backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminPayoutsEntity extends AdminCoreBaseEntity {

  @PrimaryGeneratedColumn('uuid', { name: 'id', primaryKeyConstraintName: 'PK_admin_gym_payouts_ID' })
  declare id: string;
  @Column({ name: 'name', type: 'varchar', length: 200, nullable: true })
  name!: string | null;

  @Column({ name: 'status', type: 'enum', enum: AdminPayoutsStatus, enumName: 'admin_payouts_status', nullable: true })
  status!: AdminPayoutsStatus | null;

  @Column({ name: 'branch_id', type: 'uuid', nullable: true })
  branchId!: string | null;

  @Column({ name: 'amount_minor', type: 'bigint', nullable: true })
  amountMinor!: string | null;

  @Column({ name: 'payload', type: 'jsonb', default: () => "'{}'::jsonb" })
  payload!: Record<string, unknown>;
}
