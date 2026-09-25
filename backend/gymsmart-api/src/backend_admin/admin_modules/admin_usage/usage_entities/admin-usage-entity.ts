// RESPONSIBILITY: Owns PostgreSQL persistence for the Admin usage feature and its frontend-backed payload.
// FLOW: Usage Repository â†’ AdminUsageEntity â†’ PostgreSQL admin_usage_snapshots table.
import { PrimaryGeneratedColumn, Column, Entity, Index } from 'typeorm';

import { AdminCoreBaseEntity } from '@/backend_admin/admin_core/admin_core_database/admin-core-base.entity'

import { AdminUsageStatus } from '@/backend_admin/admin_modules/admin_usage/admin-usage.constants'

@Entity('admin_usage_snapshots')
@Index('IDX_admin_usage_snapshots_created_at', ['createdAt'])
/**
 * @description Defines the AdminUsageEntity boundary for the admin_usage backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminUsageEntity extends AdminCoreBaseEntity {

  @PrimaryGeneratedColumn('uuid', { name: 'id', primaryKeyConstraintName: 'PK_admin_usage_snapshots_ID' })
  declare id: string;
  @Column({ name: 'name', type: 'varchar', length: 200, nullable: true })
  name!: string | null;

  @Column({ name: 'status', type: 'enum', enum: AdminUsageStatus, enumName: 'admin_usage_status', nullable: true })
  status!: AdminUsageStatus | null;

  @Column({ name: 'branch_id', type: 'uuid', nullable: true })
  branchId!: string | null;

  @Column({ name: 'amount_minor', type: 'bigint', nullable: true })
  amountMinor!: string | null;

  @Column({ name: 'payload', type: 'jsonb', default: () => "'{}'::jsonb" })
  payload!: Record<string, unknown>;
}
