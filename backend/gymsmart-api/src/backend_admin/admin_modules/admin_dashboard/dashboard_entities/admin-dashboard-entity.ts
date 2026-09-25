// RESPONSIBILITY: Owns PostgreSQL persistence for the Admin dashboard feature and its frontend-backed payload.
// FLOW: Dashboard Repository â†’ AdminDashboardEntity â†’ PostgreSQL admin_dashboard_snapshots table.
import { PrimaryGeneratedColumn, Column, Entity, Index } from 'typeorm';

import { AdminCoreBaseEntity } from '@/backend_admin/admin_core/admin_core_database/admin-core-base.entity.js';

import { AdminDashboardStatus } from '@/backend_admin/admin_modules/admin_dashboard/admin-dashboard.constants.js';

@Entity('admin_dashboard_snapshots')
@Index('IDX_admin_dashboard_snapshots_created_at', ['createdAt'])
/**
 * @description Defines the AdminDashboardEntity boundary for the admin_dashboard backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminDashboardEntity extends AdminCoreBaseEntity {

  @PrimaryGeneratedColumn('uuid', { name: 'id', primaryKeyConstraintName: 'PK_admin_dashboard_snapshots_ID' })
  declare id: string;
  @Column({ name: 'name', type: 'varchar', length: 200, nullable: true })
  name!: string | null;

  @Column({ name: 'status', type: 'enum', enum: AdminDashboardStatus, enumName: 'admin_dashboard_status', nullable: true })
  status!: AdminDashboardStatus | null;

  @Column({ name: 'branch_id', type: 'uuid', nullable: true })
  branchId!: string | null;

  @Column({ name: 'amount_minor', type: 'bigint', nullable: true })
  amountMinor!: string | null;

  @Column({ name: 'payload', type: 'jsonb', default: () => "'{}'::jsonb" })
  payload!: Record<string, unknown>;
}
