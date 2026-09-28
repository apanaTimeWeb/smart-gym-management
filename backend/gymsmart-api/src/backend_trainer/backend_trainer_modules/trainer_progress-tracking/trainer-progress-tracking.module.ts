// RESPONSIBILITY: Registers the isolated progress-tracking feature slice and its controller/service/repository graph.
// FLOW: Nest bootstrap → TrainerProgressTrackingModule → feature-owned providers/controllers.

import { Module } from '@nestjs/common';
import { TrainerProgressTrackingQueryController } from '@/backend_trainer/backend_trainer_modules/trainer_progress-tracking/progress-tracking_controllers/trainer-progress-tracking-query.controller'; import { TrainerProgressTrackingCommandController } from '@/backend_trainer/backend_trainer_modules/trainer_progress-tracking/progress-tracking_controllers/trainer-progress-tracking-command.controller'; import { TrainerProgressTrackingQueryService } from '@/backend_trainer/backend_trainer_modules/trainer_progress-tracking/progress-tracking_services/trainer-progress-tracking-query.service'; import { TrainerProgressTrackingCommandService } from '@/backend_trainer/backend_trainer_modules/trainer_progress-tracking/progress-tracking_services/trainer-progress-tracking-command.service'; import { TrainerProgressTrackingAuthorizationService } from '@/backend_trainer/backend_trainer_modules/trainer_progress-tracking/progress-tracking_services/trainer-progress-tracking-authorization.service'; import { TrainerProgressTrackingRepository } from '@/backend_trainer/backend_trainer_modules/trainer_progress-tracking/progress-tracking_repositories/trainer-progress-tracking-repository';

/**
 * Intent: Defines the TrainerProgressTrackingModule boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@Module({controllers:[TrainerProgressTrackingQueryController,TrainerProgressTrackingCommandController],providers:[TrainerProgressTrackingQueryService,TrainerProgressTrackingCommandService,TrainerProgressTrackingRepository,TrainerProgressTrackingAuthorizationService]}) export class TrainerProgressTrackingModule {}
