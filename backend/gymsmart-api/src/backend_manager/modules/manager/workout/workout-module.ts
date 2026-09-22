// RESPONSIBILITY: Registers the isolated Manager workout feature boundary.
// FLOW: ManagerDomainModule -> WorkoutModule -> controllers -> use cases -> repository.
import { Module } from '@nestjs/common';

import { WorkoutCommandController } from '@/modules/manager/workout/workout-command.controller';
import { WorkoutCreateExerciseService } from '@/modules/manager/workout/services/workout-create-exercise.service';
import { WorkoutCreateWorkoutService } from '@/modules/manager/workout/services/workout-create-workout.service';
import { WorkoutDeleteExerciseService } from '@/modules/manager/workout/services/workout-delete-exercise.service';
import { WorkoutDeleteWorkoutService } from '@/modules/manager/workout/services/workout-delete-workout.service';
import { WorkoutFetchAssignmentsService } from '@/modules/manager/workout/services/workout-fetch-assignments.service';
import { WorkoutFetchExercisesService } from '@/modules/manager/workout/services/workout-fetch-exercises.service';
import { WorkoutFetchWorkoutsService } from '@/modules/manager/workout/services/workout-fetch-workouts.service';
import { WorkoutOrchestratorService } from '@/modules/manager/workout/services/workout-orchestrator.service';
import { WorkoutQueryController } from '@/modules/manager/workout/workout-query.controller';
import { WorkoutRepository } from '@/modules/manager/workout/repositories/workout-repository';
import { WorkoutUpdateExerciseService } from '@/modules/manager/workout/services/workout-update-exercise.service';
import { WorkoutUpdateWorkoutService } from '@/modules/manager/workout/services/workout-update-workout.service';

@Module({
  controllers: [WorkoutQueryController, WorkoutCommandController],
  providers: [WorkoutCreateWorkoutService, WorkoutUpdateWorkoutService, WorkoutDeleteWorkoutService, WorkoutCreateExerciseService, WorkoutUpdateExerciseService, WorkoutDeleteExerciseService, WorkoutFetchWorkoutsService, WorkoutFetchExercisesService, WorkoutFetchAssignmentsService, WorkoutRepository, WorkoutOrchestratorService],
  exports: [WorkoutRepository],
})
export class WorkoutModule {}
