// RESPONSIBILITY: Owns PostgreSQL persistence for the Admin reports feature and its frontend-backed payload.
// FLOW: Reports Repository â†’ AdminReportsEntity â†’ PostgreSQL admin_report_snapshots table.
import { PrimaryGeneratedColumn, Column, Entity, Index } from 'typeorm';

import { AdminCoreBaseEntity } from '@/backend_admin/admin_core/admin_core_database/admin-core-base.entity.js';

import { AdminReportsStatus } from '@/backend_admin/admin_modules/admin_reports/admin-reports.constants.js';

@Entity('admin_report_snapshots')
@Index('IDX_admin_report_snapshots_created_at', ['createdAt'])
/**
 * @description Defines the AdminReportsEntity boundary for the admin_reports backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminReportsEntity extends AdminCoreBaseEntity {

  @PrimaryGeneratedColumn('uuid', { name: 'id', primaryKeyConstraintName: 'PK_admin_report_snapshots_ID' })
  declare id: string;
  @Column({ name: 'name', type: 'varchar', length: 200, nullable: true })
  name!: string | null;

  @Column({ name: 'status', type: 'enum', enum: AdminReportsStatus, enumName: 'admin_reports_status', nullable: true })
  status!: AdminReportsStatus | null;

  @Column({ name: 'branch_id', type: 'uuid', nullable: true })
  branchId!: string | null;

  @Column({ name: 'amount_minor', type: 'bigint', nullable: true })
  amountMinor!: string | null;

  @Column({ name: 'payload', type: 'jsonb', default: () => "'{}'::jsonb" })
  payload!: Record<string, unknown>;
}
