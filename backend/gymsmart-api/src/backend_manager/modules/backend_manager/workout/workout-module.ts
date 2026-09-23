// RESPONSIBILITY: Owns the backend application module infrastructure/code contract.
// FLOW: Module-owned input/configuration → focused backend behavior → typed output.
import { Module } from '@nestjs/common';

import { WorkoutRepository } from '@/backend_manager/modules/backend_manager/workout/repositories/workout-repository';
import { WorkoutCreateExerciseService } from '@/backend_manager/modules/backend_manager/workout/services/workout-create-exercise.service';
import { WorkoutCreateWorkoutService } from '@/backend_manager/modules/backend_manager/workout/services/workout-create-workout.service';
import { WorkoutDeleteExerciseService } from '@/backend_manager/modules/backend_manager/workout/services/workout-delete-exercise.service';
import { WorkoutDeleteWorkoutService } from '@/backend_manager/modules/backend_manager/workout/services/workout-delete-workout.service';
import { WorkoutFetchAssignmentsService } from '@/backend_manager/modules/backend_manager/workout/services/workout-fetch-assignments.service';
import { WorkoutFetchExercisesService } from '@/backend_manager/modules/backend_manager/workout/services/workout-fetch-exercises.service';
import { WorkoutFetchWorkoutsService } from '@/backend_manager/modules/backend_manager/workout/services/workout-fetch-workouts.service';
import { WorkoutOrchestratorService } from '@/backend_manager/modules/backend_manager/workout/services/workout-orchestrator.service';
import { WorkoutUpdateExerciseService } from '@/backend_manager/modules/backend_manager/workout/services/workout-update-exercise.service';
import { WorkoutUpdateWorkoutService } from '@/backend_manager/modules/backend_manager/workout/services/workout-update-workout.service';
import { WorkoutCommandController } from '@/backend_manager/modules/backend_manager/workout/workout-command.controller';
import { WorkoutQueryController } from '@/backend_manager/modules/backend_manager/workout/workout-query.controller';

@Module({
  controllers: [WorkoutQueryController, WorkoutCommandController],
  providers: [WorkoutCreateWorkoutService, WorkoutUpdateWorkoutService, WorkoutDeleteWorkoutService, WorkoutCreateExerciseService, WorkoutUpdateExerciseService, WorkoutDeleteExerciseService, WorkoutFetchWorkoutsService, WorkoutFetchExercisesService, WorkoutFetchAssignmentsService, WorkoutRepository, WorkoutOrchestratorService],
  exports: [WorkoutRepository],
})
export class WorkoutModule {}
