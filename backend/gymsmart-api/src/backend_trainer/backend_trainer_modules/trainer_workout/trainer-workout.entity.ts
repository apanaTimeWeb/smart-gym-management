// RESPONSIBILITY: Maps workout persistence without leaking ORM entities into domain services.
// FLOW: workout repository → TypeORM entity → workouts table.

import { Column, Entity } from 'typeorm';
import { CoreBaseEntity } from '@/backend_trainer/backend_core/core_database/core-base.entity';
import { WorkoutLevel } from '@/backend_trainer/backend_trainer_modules/trainer_workout/trainer-workout-enums';


/**
 * Intent: Defines the TrainerWorkoutEntity boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@Entity('trainer_workouts')
export class TrainerWorkoutEntity extends CoreBaseEntity {

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
