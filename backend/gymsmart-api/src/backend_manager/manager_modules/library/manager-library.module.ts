import { TypeOrmModule } from '@nestjs/typeorm';
// RESPONSIBILITY: Owns the backend application module infrastructure/code contract.
// FLOW: Module-owned input/configuration → focused backend behavior → typed output.
import { Module } from '@nestjs/common';
import { ManagerLibraryEntity } from '@/backend_manager/manager_modules/library/manager-library.entity';
import { ManagerLibraryMutationService } from '@/backend_manager/manager_modules/library/library_services/manager-library-mutation.service';
import { ManagerCoreResourceAuthorizationRegistry } from '@/backend_manager/manager_core/manager_core_authorization/manager-core-resource-authorization.registry';
import { ManagerLibraryAuthorizationService } from '@/backend_manager/manager_modules/library/library_services/manager-library-authorization.service';

import { ManagerLibraryCommandController } from '@/backend_manager/manager_modules/library/manager-library-command.controller';
import { ManagerLibraryQueryController } from '@/backend_manager/manager_modules/library/manager-library-query.controller';
import { ManagerLibraryRepository } from '@/backend_manager/manager_modules/library/manager-library.repository';
import { ManagerLibraryCreateDietPlanService } from '@/backend_manager/manager_modules/library/library_services/manager-library-create-diet-plan.service';
import { ManagerLibraryCreateExerciseService } from '@/backend_manager/manager_modules/library/library_services/manager-library-create-exercise.service';
import { ManagerLibraryDeleteDietPlanService } from '@/backend_manager/manager_modules/library/library_services/manager-library-delete-diet-plan.service';
import { ManagerLibraryDeleteExerciseService } from '@/backend_manager/manager_modules/library/library_services/manager-library-delete-exercise.service';
import { ManagerLibraryFindDietPlansService } from '@/backend_manager/manager_modules/library/library_services/manager-library-find-diet-plans.service';
import { ManagerLibraryFindExercisesService } from '@/backend_manager/manager_modules/library/library_services/manager-library-find-exercises.service';
import { ManagerLibraryOrchestratorService } from '@/backend_manager/manager_modules/library/library_services/manager-library-orchestrator.service';
import { ManagerLibraryUpdateDietPlanService } from '@/backend_manager/manager_modules/library/library_services/manager-library-update-diet-plan.service';
import { ManagerLibraryUpdateExerciseService } from '@/backend_manager/manager_modules/library/library_services/manager-library-update-exercise.service';

/**
 * Primary Intent: Defines ManagerLibraryModule as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Module({
  imports: [TypeOrmModule.forFeature([ManagerLibraryEntity])],
  controllers: [ManagerLibraryQueryController, ManagerLibraryCommandController],
  providers: [ManagerLibraryMutationService, ManagerLibraryCreateExerciseService, ManagerLibraryUpdateExerciseService, ManagerLibraryDeleteExerciseService, ManagerLibraryCreateDietPlanService, ManagerLibraryUpdateDietPlanService, ManagerLibraryDeleteDietPlanService, ManagerLibraryFindExercisesService, ManagerLibraryFindDietPlansService, ManagerLibraryRepository, ManagerLibraryOrchestratorService,
  ManagerLibraryAuthorizationService,
  { provide: `CORE_RESOURCE_AUTHORIZER:library`, useFactory: (authorization: ManagerLibraryAuthorizationService, registry: ManagerCoreResourceAuthorizationRegistry) => { registry.register('library', authorization); return authorization; }, inject: [ManagerLibraryAuthorizationService, ManagerCoreResourceAuthorizationRegistry] },
  ],
  exports: [ManagerLibraryRepository],
})
export class ManagerLibraryModule {}

export { ManagerLibraryModule as LibraryModule };
