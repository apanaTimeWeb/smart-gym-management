// RESPONSIBILITY: Registers the isolated library feature slice and its controller/service/repository graph.
// FLOW: Nest bootstrap → TrainerLibraryModule → feature-owned providers/controllers.

import { Module } from '@nestjs/common';
import { TrainerLibraryQueryController } from '@/backend_trainer/backend_trainer_modules/trainer_library/library_controllers/trainer-library-query.controller'; import { TrainerLibraryMemberDietCommandController } from '@/backend_trainer/backend_trainer_modules/trainer_library/library_controllers/trainer-library-member-diet-command.controller'; import { TrainerLibraryQueryService } from '@/backend_trainer/backend_trainer_modules/trainer_library/library_services/trainer-library-query.service'; import { TrainerLibraryDietAssignmentService } from '@/backend_trainer/backend_trainer_modules/trainer_library/library_services/trainer-library-diet-assignment.service'; import { TrainerLibraryDietPlanUpdateService } from '@/backend_trainer/backend_trainer_modules/trainer_library/library_services/trainer-library-diet-plan-update.service'; import { TrainerLibraryDietPlanDeleteService } from '@/backend_trainer/backend_trainer_modules/trainer_library/library_services/trainer-library-diet-plan-delete.service'; import { TrainerLibraryAuthorizationService } from '@/backend_trainer/backend_trainer_modules/trainer_library/library_services/trainer-library-authorization.service'; import { TrainerLibraryDietPlanRepository } from '@/backend_trainer/backend_trainer_modules/trainer_library/library_repositories/trainer-library-diet-plan.repository';

/**
 * Intent: Defines the TrainerLibraryModule boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@Module({controllers:[TrainerLibraryQueryController,TrainerLibraryMemberDietCommandController],providers:[TrainerLibraryQueryService,TrainerLibraryDietAssignmentService,TrainerLibraryDietPlanUpdateService,TrainerLibraryDietPlanDeleteService,TrainerLibraryDietPlanRepository,TrainerLibraryAuthorizationService]}) export class TrainerLibraryModule {}
