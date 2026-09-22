// RESPONSIBILITY: Registers the isolated Manager library feature boundary.
// FLOW: ManagerDomainModule -> LibraryModule -> controllers -> use cases -> repository.
import { Module } from '@nestjs/common';

import { LibraryCommandController } from '@/modules/manager/library/library-command.controller';
import { LibraryCreateDietPlanService } from '@/modules/manager/library/services/library-create-diet-plan.service';
import { LibraryCreateExerciseService } from '@/modules/manager/library/services/library-create-exercise.service';
import { LibraryDeleteDietPlanService } from '@/modules/manager/library/services/library-delete-diet-plan.service';
import { LibraryDeleteExerciseService } from '@/modules/manager/library/services/library-delete-exercise.service';
import { LibraryFetchDietPlansService } from '@/modules/manager/library/services/library-fetch-diet-plans.service';
import { LibraryFetchExercisesService } from '@/modules/manager/library/services/library-fetch-exercises.service';
import { LibraryOrchestratorService } from '@/modules/manager/library/services/library-orchestrator.service';
import { LibraryQueryController } from '@/modules/manager/library/library-query.controller';
import { LibraryRepository } from '@/modules/manager/library/repositories/library-repository';
import { LibraryUpdateDietPlanService } from '@/modules/manager/library/services/library-update-diet-plan.service';
import { LibraryUpdateExerciseService } from '@/modules/manager/library/services/library-update-exercise.service';

@Module({
  controllers: [LibraryQueryController, LibraryCommandController],
  providers: [LibraryCreateExerciseService, LibraryUpdateExerciseService, LibraryDeleteExerciseService, LibraryCreateDietPlanService, LibraryUpdateDietPlanService, LibraryDeleteDietPlanService, LibraryFetchExercisesService, LibraryFetchDietPlansService, LibraryRepository, LibraryOrchestratorService],
  exports: [LibraryRepository],
})
export class LibraryModule {}
