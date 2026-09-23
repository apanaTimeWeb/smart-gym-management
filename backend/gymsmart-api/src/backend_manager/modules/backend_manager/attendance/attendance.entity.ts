// RESPONSIBILITY: Owns the backend application database entity boundary.
// FLOW: Domain persistence contract → ORM metadata → tenant database table with soft-delete lifecycle.
import { Check, Column, Entity, Index } from 'typeorm';

import { CoreBaseEntity } from '@/backend_manager/core/database/core-base.entity';

import { AttendanceRecordStatus } from '@/backend_manager/modules/backend_manager/attendance/attendance.constants';

@Entity('manager_attendances')
@Check('CHK_manager_attendance_payload_object', "jsonb_typeof(payload) = 'object'")
@Index('IDX_manager_attendance_created_at', ['createdAt'])
@Index('IDX_manager_attendance_updated_at', ['updatedAt'])
@Index('IDX_manager_attendance_status', ['status'])
export class AttendanceEntity extends CoreBaseEntity {
  @Column({ type: 'jsonb', name: 'payload', default: () => "'{}'::jsonb" })
  payload!: import('@/backend_manager/core/types/json-value.types').CoreJsonObject;

  @Column({ type: 'enum', enum: AttendanceRecordStatus, enumName: 'manager_attendance_status_enum', name: 'status', default: AttendanceRecordStatus.ACTIVE })
  status!: AttendanceRecordStatus;
}
