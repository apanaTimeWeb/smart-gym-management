// RESPONSIBILITY: Owns PostgreSQL persistence for the Admin finance feature and its frontend-backed payload.
// FLOW: Finance Repository â†’ AdminFinanceEntity â†’ PostgreSQL admin_payment_transactions table.
import { PrimaryGeneratedColumn, Column, Entity, Index } from 'typeorm';

import { AdminCoreBaseEntity } from '@/backend_admin/admin_core/admin_core_database/admin-core-base.entity'

import { AdminFinanceStatus } from '@/backend_admin/admin_modules/admin_finance/admin-finance.constants'

@Entity('admin_payment_transactions')
@Index('IDX_admin_payment_transactions_created_at', ['createdAt'])
/**
 * @description Defines the AdminFinanceEntity boundary for the admin_finance backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminFinanceEntity extends AdminCoreBaseEntity {

  @PrimaryGeneratedColumn('uuid', { name: 'id', primaryKeyConstraintName: 'PK_admin_payment_transactions_ID' })
  declare id: string;

  @Column({ name: 'name', type: 'varchar', length: 200, nullable: true })
  name!: string | null;

  @Column({ name: 'status', type: 'enum', enum: AdminFinanceStatus, enumName: 'admin_finance_status', nullable: true })
  status!: AdminFinanceStatus | null;

  @Column({ name: 'branch_id', type: 'uuid', nullable: true })
  branchId!: string | null;

  @Column({ name: 'amount_minor', type: 'bigint', nullable: true })
  amountMinor!: number | null;

  @Column({ name: 'payload', type: 'jsonb', default: () => "'{}'::jsonb" })
  payload!: Record<string, unknown>;
}
