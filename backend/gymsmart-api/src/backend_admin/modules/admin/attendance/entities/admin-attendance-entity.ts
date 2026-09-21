// RESPONSIBILITY: Owns PostgreSQL persistence for the Admin attendance feature and its frontend-backed payload.
// FLOW: Attendance Repository â†’ AdminAttendanceEntity â†’ PostgreSQL attendance_records table.

import { Column, Entity, Index } from 'typeorm';
import { CoreBaseEntity } from '@/backend_admin/core/database/core-base.entity';

@Entity('attendance_records')
@Index('IDX_attendance_records_created_at', ['createdAt'])
export class AdminAttendanceEntity extends CoreBaseEntity {
  @Column({ name: 'name', type: 'varchar', length: 200, nullable: true })
  name!: string | null;

  @Column({ name: 'status', type: 'varchar', length: 64, nullable: true })
  status!: string | null;

  @Column({ name: 'branch_id', type: 'uuid', nullable: true })
  branchId!: string | null;

  @Column({ name: 'amount_minor', type: 'bigint', nullable: true })
  amountMinor!: string | null;


  @Column({ name: 'payload', type: 'jsonb', default: () => "'{}'::jsonb" })
  payload!: Record<string, unknown>;
}
