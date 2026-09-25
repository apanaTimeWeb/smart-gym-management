// RESPONSIBILITY: Owns PostgreSQL persistence for the Admin attendance feature and its frontend-backed payload.
// FLOW: Attendance Repository â†’ AdminAttendanceEntity â†’ PostgreSQL admin_attendance_records table.
import { PrimaryGeneratedColumn, Column, Entity, Index } from 'typeorm';

import { AdminCoreBaseEntity } from '@/backend_admin/admin_core/admin_core_database/admin-core-base.entity'

import { AdminAttendanceStatus } from '@/backend_admin/admin_modules/admin_attendance/admin-attendance.constants'

@Entity('admin_attendance_records')
@Index('IDX_admin_attendance_records_created_at', ['createdAt'])
/**
 * @description Defines the AdminAttendanceEntity boundary for the admin_attendance backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminAttendanceEntity extends AdminCoreBaseEntity {

  @PrimaryGeneratedColumn('uuid', { name: 'id', primaryKeyConstraintName: 'PK_admin_attendance_records_ID' })
  declare id: string;
  @Column({ name: 'name', type: 'varchar', length: 200, nullable: true })
  name!: string | null;

  @Column({ name: 'status', type: 'enum', enum: AdminAttendanceStatus, enumName: 'admin_attendance_status', nullable: true })
  status!: AdminAttendanceStatus | null;

  @Column({ name: 'branch_id', type: 'uuid', nullable: true })
  branchId!: string | null;

  @Column({ name: 'amount_minor', type: 'bigint', nullable: true })
  amountMinor!: string | null;

  @Column({ name: 'payload', type: 'jsonb', default: () => "'{}'::jsonb" })
  payload!: Record<string, unknown>;
}
