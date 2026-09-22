// RESPONSIBILITY: Registers the isolated Manager library feature boundary.
// FLOW: ManagerDomainModule -> LibraryModule -> controllers -> use cases -> repository.
import { Module } from '@nestjs/common';

import { LibraryCommandController } from '@/backend_manager/modules/manager/library/library-command.controller';
import { LibraryCreateDietPlanService } from '@/backend_manager/modules/manager/library/services/library-create-diet-plan.service';
import { LibraryCreateExerciseService } from '@/backend_manager/modules/manager/library/services/library-create-exercise.service';
import { LibraryDeleteDietPlanService } from '@/backend_manager/modules/manager/library/services/library-delete-diet-plan.service';
import { LibraryDeleteExerciseService } from '@/backend_manager/modules/manager/library/services/library-delete-exercise.service';
import { LibraryFetchDietPlansService } from '@/backend_manager/modules/manager/library/services/library-fetch-diet-plans.service';
import { LibraryFetchExercisesService } from '@/backend_manager/modules/manager/library/services/library-fetch-exercises.service';
import { LibraryOrchestratorService } from '@/backend_manager/modules/manager/library/services/library-orchestrator.service';
import { LibraryQueryController } from '@/backend_manager/modules/manager/library/library-query.controller';
import { LibraryRepository } from '@/backend_manager/modules/manager/library/repositories/library-repository';
import { LibraryUpdateDietPlanService } from '@/backend_manager/modules/manager/library/services/library-update-diet-plan.service';
import { LibraryUpdateExerciseService } from '@/backend_manager/modules/manager/library/services/library-update-exercise.service';

@Module({
  controllers: [LibraryQueryController, LibraryCommandController],
  providers: [LibraryCreateExerciseService, LibraryUpdateExerciseService, LibraryDeleteExerciseService, LibraryCreateDietPlanService, LibraryUpdateDietPlanService, LibraryDeleteDietPlanService, LibraryFetchExercisesService, LibraryFetchDietPlansService, LibraryRepository, LibraryOrchestratorService],
  exports: [LibraryRepository],
})
export class LibraryModule {}
