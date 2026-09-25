// RESPONSIBILITY: Owns PostgreSQL persistence for the Admin sales feature and its frontend-backed payload.
// FLOW: Sales Repository â†’ AdminSalesEntity â†’ PostgreSQL admin_sales_snapshots table.
import { PrimaryGeneratedColumn, Column, Entity, Index } from 'typeorm';

import { AdminCoreBaseEntity } from '@/backend_admin/admin_core/admin_core_database/admin-core-base.entity'

import { AdminSalesStatus } from '@/backend_admin/admin_modules/admin_sales/admin-sales.constants'

@Entity('admin_sales_snapshots')
@Index('IDX_admin_sales_snapshots_created_at', ['createdAt'])
/**
 * @description Defines the AdminSalesEntity boundary for the admin_sales backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminSalesEntity extends AdminCoreBaseEntity {

  @PrimaryGeneratedColumn('uuid', { name: 'id', primaryKeyConstraintName: 'PK_admin_sales_snapshots_ID' })
  declare id: string;
  @Column({ name: 'name', type: 'varchar', length: 200, nullable: true })
  name!: string | null;

  @Column({ name: 'status', type: 'enum', enum: AdminSalesStatus, enumName: 'admin_sales_status', nullable: true })
  status!: AdminSalesStatus | null;

  @Column({ name: 'branch_id', type: 'uuid', nullable: true })
  branchId!: string | null;

  @Column({ name: 'amount_minor', type: 'bigint', nullable: true })
  amountMinor!: string | null;

  @Column({ name: 'payload', type: 'jsonb', default: () => "'{}'::jsonb" })
  payload!: Record<string, unknown>;
}
