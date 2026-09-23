// RESPONSIBILITY: Owns the backend application database entity boundary.
// FLOW: Domain persistence contract → ORM metadata → tenant database table with soft-delete lifecycle.
import { Check, Column, Entity, Index } from 'typeorm';

import { CoreBaseEntity } from '@/backend_manager/core/database/core-base.entity';

import { WorkoutRecordStatus } from '@/backend_manager/modules/backend_manager/workout/workout.constants';

@Entity('manager_workouts')
@Check('CHK_manager_workout_payload_object', "jsonb_typeof(payload) = 'object'")
@Index('IDX_manager_workout_created_at', ['createdAt'])
@Index('IDX_manager_workout_updated_at', ['updatedAt'])
@Index('IDX_manager_workout_status', ['status'])
export class WorkoutEntity extends CoreBaseEntity {
  @Column({ type: 'jsonb', name: 'payload', default: () => "'{}'::jsonb" })
  payload!: import('@/backend_manager/core/types/json-value.types').CoreJsonObject;

  @Column({ type: 'enum', enum: WorkoutRecordStatus, enumName: 'manager_workout_status_enum', name: 'status', default: WorkoutRecordStatus.ACTIVE })
  status!: WorkoutRecordStatus;
}
