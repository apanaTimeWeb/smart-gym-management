// RESPONSIBILITY: Owns PostgreSQL persistence for the Admin data-export feature and its frontend-backed payload.
// FLOW: DataExport Repository â†’ AdminDataExportEntity â†’ PostgreSQL admin_data_export_jobs table.
import { PrimaryGeneratedColumn, Column, Entity, Index } from 'typeorm';

import { AdminCoreBaseEntity } from '@/backend_admin/admin_core/admin_core_database/admin-core-base.entity'

import { AdminDataExportStatus } from '@/backend_admin/admin_modules/admin_data-export/admin-data-export.constants'

@Entity('admin_data_export_jobs')
@Index('IDX_admin_data_export_jobs_created_at', ['createdAt'])
/**
 * @description Defines the AdminDataExportEntity boundary for the admin_data-export backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminDataExportEntity extends AdminCoreBaseEntity {

  @PrimaryGeneratedColumn('uuid', { name: 'id', primaryKeyConstraintName: 'PK_admin_data_export_jobs_ID' })
  declare id: string;
  @Column({ name: 'name', type: 'varchar', length: 200, nullable: true })
  name!: string | null;

  @Column({ name: 'status', type: 'enum', enum: AdminDataExportStatus, enumName: 'admin_data_export_status', nullable: true })
  status!: AdminDataExportStatus | null;

  @Column({ name: 'branch_id', type: 'uuid', nullable: true })
  branchId!: string | null;

  @Column({ name: 'amount_minor', type: 'bigint', nullable: true })
  amountMinor!: string | null;

  @Column({ name: 'payload', type: 'jsonb', default: () => "'{}'::jsonb" })
  payload!: Record<string, unknown>;
}
