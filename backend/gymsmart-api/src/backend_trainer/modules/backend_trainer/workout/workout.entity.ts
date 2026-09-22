// RESPONSIBILITY: Maps workout persistence without leaking ORM entities into domain services.
// FLOW: workout repository → TypeORM entity → workouts table.

import { Column, Entity } from 'typeorm';
import { CoreBaseEntity } from '@/backend_trainer/core/database/core-base.entity';
import { WorkoutLevel } from '@/backend_trainer/modules/backend_trainer/workout/workout-enums';

@Entity('trainer_workouts')
export class WorkoutEntity extends CoreBaseEntity {

  @Column({ name: 'trainer_id', type: 'uuid' }) trainerId!: string;

  @Column() name!: string;
  @Column({type:'enum',enum:WorkoutLevel,enumName:'workout_level_enum'}) level!: WorkoutLevel;
  @Column() days!: number;
  @Column({ name: 'exercises_count' }) exercisesCount!: number;
  @Column() focus!: string;
  @Column() duration!: string;
  @Column({ type: 'jsonb' }) tags!: string[];
  @Column({ nullable: true }) goal!: string | null;
  @Column({ name: 'start_date', type: 'date', nullable: true }) startDate!: string | null;
  @Column({ name: 'end_date', type: 'date', nullable: true }) endDate!: string | null;
  @Column({ nullable: true }) instructions!: string | null;
  @Column({ name: 'assigned_member_id', type: 'uuid', nullable: true }) assignedMemberId!: string | null;
  @Column({ name: 'is_active', default: true }) isActive!: boolean;
  @Column({ name: 'workout_exercises', type: 'jsonb', default: () => "'[]'" }) workoutExercises!: Record<string, unknown>[];
}
