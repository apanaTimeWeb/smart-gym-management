// RESPONSIBILITY: Owns the backend application module infrastructure/code contract.
// FLOW: Module-owned input/configuration → focused backend behavior → typed output.
import { Module } from '@nestjs/common';
import { ManagerWorkoutMutationService } from '@/backend_manager/manager_modules/workout/workout_services/manager-workout-mutation.service';
import { ManagerCoreResourceAuthorizationRegistry } from '@/backend_manager/manager_core/manager_core_authorization/manager-core-resource-authorization.registry';
import { ManagerWorkoutAuthorizationService } from '@/backend_manager/manager_modules/workout/workout_services/manager-workout-authorization.service';

import { ManagerWorkoutRepository } from '@/backend_manager/manager_modules/workout/manager-workout.repository';
import { ManagerWorkoutCreateExerciseService } from '@/backend_manager/manager_modules/workout/workout_services/manager-workout-create-exercise.service';
import { ManagerWorkoutCreateWorkoutService } from '@/backend_manager/manager_modules/workout/workout_services/manager-workout-create-workout.service';
import { ManagerWorkoutDeleteExerciseService } from '@/backend_manager/manager_modules/workout/workout_services/manager-workout-delete-exercise.service';
import { ManagerWorkoutDeleteWorkoutService } from '@/backend_manager/manager_modules/workout/workout_services/manager-workout-delete-workout.service';
import { ManagerWorkoutFindAssignmentsService } from '@/backend_manager/manager_modules/workout/workout_services/manager-workout-find-assignments.service';
import { ManagerWorkoutFindExercisesService } from '@/backend_manager/manager_modules/workout/workout_services/manager-workout-find-exercises.service';
import { ManagerWorkoutFindWorkoutsService } from '@/backend_manager/manager_modules/workout/workout_services/manager-workout-find-workouts.service';
import { ManagerWorkoutOrchestratorService } from '@/backend_manager/manager_modules/workout/workout_services/manager-workout-orchestrator.service';
import { ManagerWorkoutUpdateExerciseService } from '@/backend_manager/manager_modules/workout/workout_services/manager-workout-update-exercise.service';
import { ManagerWorkoutUpdateWorkoutService } from '@/backend_manager/manager_modules/workout/workout_services/manager-workout-update-workout.service';
import { ManagerWorkoutCommandController } from '@/backend_manager/manager_modules/workout/manager-workout-command.controller';
import { ManagerWorkoutQueryController } from '@/backend_manager/manager_modules/workout/manager-workout-query.controller';

@Module({
  controllers: [ManagerWorkoutQueryController, ManagerWorkoutCommandController],
  providers: [ManagerWorkoutMutationService, ManagerWorkoutCreateWorkoutService, ManagerWorkoutUpdateWorkoutService, ManagerWorkoutDeleteWorkoutService, ManagerWorkoutCreateExerciseService, ManagerWorkoutUpdateExerciseService, ManagerWorkoutDeleteExerciseService, ManagerWorkoutFindWorkoutsService, ManagerWorkoutFindExercisesService, ManagerWorkoutFindAssignmentsService, ManagerWorkoutRepository, ManagerWorkoutOrchestratorService,
  ManagerWorkoutAuthorizationService,
  { provide: `CORE_RESOURCE_AUTHORIZER:workout`, useFactory: (authorization: ManagerWorkoutAuthorizationService, registry: ManagerCoreResourceAuthorizationRegistry) => { registry.register('workout', authorization); return authorization; }, inject: [ManagerWorkoutAuthorizationService, ManagerCoreResourceAuthorizationRegistry] },
  ],
  exports: [ManagerWorkoutRepository],
})
export class ManagerWorkoutModule {}

export { ManagerWorkoutModule as WorkoutModule };
