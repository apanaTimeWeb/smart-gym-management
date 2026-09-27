// RESPONSIBILITY: Owns the backend application database entity boundary.
// FLOW: Domain persistence contract → ORM metadata → tenant database table with soft-delete lifecycle.
import { Check, Column, Entity, Index } from 'typeorm';

import { CoreBaseEntity } from '@/backend_manager/manager_core/manager_core_database/manager-core-base.entity';

import { AttendanceRecordStatus } from '@/backend_manager/manager_modules/attendance/manager-attendance.constants';

@Entity('manager_attendances')
@Check('CHK_manager_attendance_payload_object', "jsonb_typeof(payload) = 'object'")
@Index('IDX_manager_attendance_created_at', ['createdAt'])
@Index('IDX_manager_attendance_updated_at', ['updatedAt'])
@Index('IDX_manager_attendance_status', ['status'])
export class ManagerAttendanceEntity extends CoreBaseEntity {
  @Column({ type: 'jsonb', name: 'payload', default: () => "'{}'::jsonb" })
  payload!: import('@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types').ManagerCoreJsonObject;

  @Column({ type: 'enum', enum: AttendanceRecordStatus, enumName: 'manager_attendance_status_enum', name: 'status', default: AttendanceRecordStatus.ACTIVE })
  status!: AttendanceRecordStatus;
}

export { ManagerAttendanceEntity as AttendanceEntity };
