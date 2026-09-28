// RESPONSIBILITY: Registers the isolated workout feature slice and its controller/service/repository graph.
// FLOW: Nest bootstrap → TrainerWorkoutModule → feature-owned providers/controllers.

import { Module } from '@nestjs/common';
import { TrainerWorkoutQueryController } from '@/backend_trainer/backend_trainer_modules/trainer_workout/workout_controllers/trainer-workout-query.controller'; import { TrainerWorkoutCommandController } from '@/backend_trainer/backend_trainer_modules/trainer_workout/workout_controllers/trainer-workout-command.controller'; import { TrainerWorkoutQueryService } from '@/backend_trainer/backend_trainer_modules/trainer_workout/workout_services/trainer-workout-query.service'; import { TrainerWorkoutCommandService } from '@/backend_trainer/backend_trainer_modules/trainer_workout/workout_services/trainer-workout-command.service'; import { TrainerWorkoutRepository } from '@/backend_trainer/backend_trainer_modules/trainer_workout/workout_repositories/trainer-workout-repository'; import { TrainerWorkoutExercisesRepository } from '@/backend_trainer/backend_trainer_modules/trainer_workout/workout_repositories/trainer-workout-exercises.repository';

/**
 * Intent: Defines the TrainerWorkoutModule boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@Module({controllers:[TrainerWorkoutQueryController,TrainerWorkoutCommandController],providers:[TrainerWorkoutQueryService,TrainerWorkoutCommandService,TrainerWorkoutRepository,TrainerWorkoutExercisesRepository]}) export class TrainerWorkoutModule {}
