// RESPONSIBILITY: Registers the isolated sessions feature slice and its controller/service/repository graph.
// FLOW: Nest bootstrap → TrainerSessionsModule → feature-owned providers/controllers.

import { Module } from '@nestjs/common';
import { TrainerSessionsQueryController } from '@/backend_trainer/backend_trainer_modules/trainer_sessions/sessions_controllers/trainer-sessions-query.controller'; import { TrainerSessionsCommandController } from '@/backend_trainer/backend_trainer_modules/trainer_sessions/sessions_controllers/trainer-sessions-command.controller'; import { TrainerSessionsQueryService } from '@/backend_trainer/backend_trainer_modules/trainer_sessions/sessions_services/trainer-sessions-query.service'; import { TrainerSessionsCommandService } from '@/backend_trainer/backend_trainer_modules/trainer_sessions/sessions_services/trainer-sessions-command.service'; import { TrainerSessionsAuthorizationService } from '@/backend_trainer/backend_trainer_modules/trainer_sessions/sessions_services/trainer-sessions-authorization.service'; import { TrainerSessionsRepository } from '@/backend_trainer/backend_trainer_modules/trainer_sessions/sessions_repositories/trainer-sessions-repository';

/**
 * Intent: Defines the TrainerSessionsModule boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@Module({controllers:[TrainerSessionsQueryController,TrainerSessionsCommandController],providers:[TrainerSessionsQueryService,TrainerSessionsCommandService,TrainerSessionsRepository,TrainerSessionsAuthorizationService]}) export class TrainerSessionsModule {}
