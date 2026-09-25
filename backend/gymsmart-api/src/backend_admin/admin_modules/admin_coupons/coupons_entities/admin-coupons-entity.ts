// RESPONSIBILITY: Owns PostgreSQL persistence for the Admin coupons feature and its frontend-backed payload.
// FLOW: Coupons Repository â†’ AdminCouponsEntity â†’ PostgreSQL admin_coupons table.
import { PrimaryGeneratedColumn, Column, Entity, Index } from 'typeorm';

import { AdminCoreBaseEntity } from '@/backend_admin/admin_core/admin_core_database/admin-core-base.entity'

import { AdminCouponsStatus } from '@/backend_admin/admin_modules/admin_coupons/admin-coupons.constants'

@Entity('admin_coupons')
@Index('IDX_admin_coupons_created_at', ['createdAt'])
/**
 * @description Defines the AdminCouponsEntity boundary for the admin_coupons backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminCouponsEntity extends AdminCoreBaseEntity {

  @PrimaryGeneratedColumn('uuid', { name: 'id', primaryKeyConstraintName: 'PK_admin_coupons_ID' })
  declare id: string;
  @Column({ name: 'name', type: 'varchar', length: 200, nullable: true })
  name!: string | null;

  @Column({ name: 'status', type: 'enum', enum: AdminCouponsStatus, enumName: 'admin_coupons_status', nullable: true })
  status!: AdminCouponsStatus | null;

  @Column({ name: 'branch_id', type: 'uuid', nullable: true })
  branchId!: string | null;

  @Column({ name: 'amount_minor', type: 'bigint', nullable: true })
  amountMinor!: string | null;

  @Column({ name: 'code', type: 'varchar', length: 80, nullable: true })
  code!: string | null;

  @Column({ name: 'payload', type: 'jsonb', default: () => "'{}'::jsonb" })
  payload!: Record<string, unknown>;
}
