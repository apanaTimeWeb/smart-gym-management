// RESPONSIBILITY: Maps reusable workout exercises to the tenant database.
// FLOW: Workout repository → TrainerWorkoutExerciseEntity → exercises.

import { Column, Entity } from 'typeorm'; import { CoreBaseEntity } from '@/backend_trainer/backend_core/core_database/core-base.entity'; import { ExerciseDifficulty } from '@/backend_trainer/backend_trainer_modules/trainer_workout/trainer-workout-enums';

/**
 * Intent: Defines the TrainerWorkoutExerciseEntity boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@Entity('trainer_exercises') export class TrainerWorkoutExerciseEntity extends CoreBaseEntity { @Column({name:'trainer_id',type:'uuid'}) trainerId!: string; @Column() name!: string; @Column({ nullable:true }) category!: string | null; @Column({ name:'muscle_group', type:'jsonb', nullable:true }) muscleGroup!: string[] | null; @Column({ nullable:true }) equipment!: string | null; @Column({ type:'enum', enum:ExerciseDifficulty, enumName:'exercise_difficulty_enum' }) difficulty!: ExerciseDifficulty; @Column({ nullable:true }) instructions!: string | null; @Column({ name:'video_url', nullable:true }) videoUrl!: string | null; @Column({ name:'image_url', nullable:true }) imageUrl!: string | null; @Column({ name:'is_active', default:true }) isActive!: boolean; @Column({ nullable:true }) sets!: number | null; @Column({ nullable:true }) reps!: string | null; @Column({ nullable:true }) duration!: string | null; @Column({ nullable:true }) description!: string | null; }
