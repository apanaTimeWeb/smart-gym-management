// RESPONSIBILITY: Owns PostgreSQL persistence for the Admin hr feature and its frontend-backed payload.
// FLOW: Hr Repository â†’ AdminHrEntity â†’ PostgreSQL admin_staff table.
import { PrimaryGeneratedColumn, Column, Entity, Index } from 'typeorm';

import { AdminCoreBaseEntity } from '@/backend_admin/admin_core/admin_core_database/admin-core-base.entity.js';

import { AdminHrStatus } from '@/backend_admin/admin_modules/admin_hr/admin-hr.constants.js';

@Entity('admin_staff')
@Index('IDX_admin_staff_created_at', ['createdAt'])
/**
 * @description Defines the AdminHrEntity boundary for the admin_hr backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminHrEntity extends AdminCoreBaseEntity {

  @PrimaryGeneratedColumn('uuid', { name: 'id', primaryKeyConstraintName: 'PK_admin_staff_ID' })
  declare id: string;
  @Column({ name: 'name', type: 'varchar', length: 200, nullable: true })
  name!: string | null;

  @Column({ name: 'status', type: 'enum', enum: AdminHrStatus, enumName: 'admin_hr_status', nullable: true })
  status!: AdminHrStatus | null;

  @Column({ name: 'branch_id', type: 'uuid', nullable: true })
  branchId!: string | null;

  @Column({ name: 'amount_minor', type: 'bigint', nullable: true })
  amountMinor!: string | null;

  @Column({ name: 'employee_id', type: 'varchar', length: 80, nullable: true })
  employeeId!: string | null;

  @Column({ name: 'salary_minor', type: 'bigint', nullable: true })
  salaryMinor!: number | null;

  @Column({ name: 'payload', type: 'jsonb', default: () => "'{}'::jsonb" })
  payload!: Record<string, unknown>;
}
