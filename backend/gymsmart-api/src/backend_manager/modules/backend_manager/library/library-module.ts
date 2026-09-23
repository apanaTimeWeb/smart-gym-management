// RESPONSIBILITY: Owns the backend application module infrastructure/code contract.
// FLOW: Module-owned input/configuration → focused backend behavior → typed output.
import { Module } from '@nestjs/common';

import { LibraryCommandController } from '@/backend_manager/modules/backend_manager/library/library-command.controller';
import { LibraryQueryController } from '@/backend_manager/modules/backend_manager/library/library-query.controller';
import { LibraryRepository } from '@/backend_manager/modules/backend_manager/library/repositories/library-repository';
import { LibraryCreateDietPlanService } from '@/backend_manager/modules/backend_manager/library/services/library-create-diet-plan.service';
import { LibraryCreateExerciseService } from '@/backend_manager/modules/backend_manager/library/services/library-create-exercise.service';
import { LibraryDeleteDietPlanService } from '@/backend_manager/modules/backend_manager/library/services/library-delete-diet-plan.service';
import { LibraryDeleteExerciseService } from '@/backend_manager/modules/backend_manager/library/services/library-delete-exercise.service';
import { LibraryFetchDietPlansService } from '@/backend_manager/modules/backend_manager/library/services/library-fetch-diet-plans.service';
import { LibraryFetchExercisesService } from '@/backend_manager/modules/backend_manager/library/services/library-fetch-exercises.service';
import { LibraryOrchestratorService } from '@/backend_manager/modules/backend_manager/library/services/library-orchestrator.service';
import { LibraryUpdateDietPlanService } from '@/backend_manager/modules/backend_manager/library/services/library-update-diet-plan.service';
import { LibraryUpdateExerciseService } from '@/backend_manager/modules/backend_manager/library/services/library-update-exercise.service';

@Module({
  controllers: [LibraryQueryController, LibraryCommandController],
  providers: [LibraryCreateExerciseService, LibraryUpdateExerciseService, LibraryDeleteExerciseService, LibraryCreateDietPlanService, LibraryUpdateDietPlanService, LibraryDeleteDietPlanService, LibraryFetchExercisesService, LibraryFetchDietPlansService, LibraryRepository, LibraryOrchestratorService],
  exports: [LibraryRepository],
})
export class LibraryModule {}
