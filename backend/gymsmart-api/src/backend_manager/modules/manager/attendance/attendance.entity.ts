// RESPONSIBILITY: TypeORM tenant-database mapping for Manager attendance.
// FLOW: Repository -> AttendanceEntity -> PostgreSQL manager_attendance.
import { Check, Column, Entity, Index } from 'typeorm';

import { CoreBaseEntity } from '@/core/database/core-base.entity';
import { AttendanceRecordStatus } from '@/modules/manager/attendance/attendance.constants';

@Entity('manager_attendance')
@Check('CHK_manager_attendance_payload_object', "jsonb_typeof(payload) = 'object'")
@Index('IDX_manager_attendance_created_at', ['createdAt'])
@Index('IDX_manager_attendance_updated_at', ['updatedAt'])
@Index('IDX_manager_attendance_status', ['status'])
export class AttendanceEntity extends CoreBaseEntity {
  @Column({ type: 'jsonb', name: 'payload', default: () => "'{}'::jsonb" })
  payload!: import('@/core/types/json-value.types').CoreJsonObject;

  @Column({ type: 'enum', enum: AttendanceRecordStatus, enumName: 'manager_attendance_status_enum', name: 'status', default: AttendanceRecordStatus.ACTIVE })
  status!: AttendanceRecordStatus;
}
