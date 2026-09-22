// RESPONSIBILITY: Registers the isolated workout feature slice and its controller/service/repository graph.
// FLOW: Nest bootstrap → WorkoutModule → feature-owned providers/controllers.

import { Module } from '@nestjs/common';
import { WorkoutQueryController } from '@/backend_trainer/modules/backend_trainer/workout/controllers/workout-query.controller'; import { WorkoutCommandController } from '@/backend_trainer/modules/backend_trainer/workout/controllers/workout-command.controller'; import { WorkoutQueryService } from '@/backend_trainer/modules/backend_trainer/workout/services/workout-query.service'; import { WorkoutCommandService } from '@/backend_trainer/modules/backend_trainer/workout/services/workout-command.service'; import { WorkoutRepository } from '@/backend_trainer/modules/backend_trainer/workout/repositories/workout-repository'; import { WorkoutExercisesRepository } from '@/backend_trainer/modules/backend_trainer/workout/repositories/workout-exercises.repository';
@Module({controllers:[WorkoutQueryController,WorkoutCommandController],providers:[WorkoutQueryService,WorkoutCommandService,WorkoutRepository,WorkoutExercisesRepository]}) export class WorkoutModule {}
