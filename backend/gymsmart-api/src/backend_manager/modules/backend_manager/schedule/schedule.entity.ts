// RESPONSIBILITY: Owns the backend application database entity boundary.
// FLOW: Domain persistence contract → ORM metadata → tenant database table with soft-delete lifecycle.
import { Check, Column, Entity, Index } from 'typeorm';

import { CoreBaseEntity } from '@/backend_manager/core/database/core-base.entity';

import { ScheduleRecordStatus } from '@/backend_manager/modules/backend_manager/schedule/schedule.constants';

@Entity('manager_schedules')
@Check('CHK_manager_schedule_payload_object', "jsonb_typeof(payload) = 'object'")
@Index('IDX_manager_schedule_created_at', ['createdAt'])
@Index('IDX_manager_schedule_updated_at', ['updatedAt'])
@Index('IDX_manager_schedule_status', ['status'])
export class ScheduleEntity extends CoreBaseEntity {
  @Column({ type: 'jsonb', name: 'payload', default: () => "'{}'::jsonb" })
  payload!: import('@/backend_manager/core/types/json-value.types').CoreJsonObject;

  @Column({ type: 'enum', enum: ScheduleRecordStatus, enumName: 'manager_schedule_status_enum', name: 'status', default: ScheduleRecordStatus.ACTIVE })
  status!: ScheduleRecordStatus;
}
