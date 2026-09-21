// RESPONSIBILITY: Owns PostgreSQL persistence for the Admin hr feature and its frontend-backed payload.
// FLOW: Hr Repository â†’ AdminHrEntity â†’ PostgreSQL staff table.

import { Column, Entity, Index } from 'typeorm';
import { CoreBaseEntity } from '@/backend_admin/core/database/core-base.entity';

@Entity('staff')
@Index('IDX_staff_created_at', ['createdAt'])
export class AdminHrEntity extends CoreBaseEntity {
  @Column({ name: 'name', type: 'varchar', length: 200, nullable: true })
  name!: string | null;

  @Column({ name: 'status', type: 'varchar', length: 64, nullable: true })
  status!: string | null;

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
