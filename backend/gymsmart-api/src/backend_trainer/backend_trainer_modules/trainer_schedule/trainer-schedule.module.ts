// RESPONSIBILITY: Registers the isolated schedule feature slice and its controller/service/repository graph.
// FLOW: Nest bootstrap → TrainerScheduleModule → feature-owned providers/controllers.

import { Module } from '@nestjs/common';
import { TrainerScheduleQueryController } from '@/backend_trainer/backend_trainer_modules/trainer_schedule/schedule_controllers/trainer-schedule-query.controller'; import { TrainerScheduleCommandController } from '@/backend_trainer/backend_trainer_modules/trainer_schedule/schedule_controllers/trainer-schedule-command.controller'; import { TrainerScheduleQueryService } from '@/backend_trainer/backend_trainer_modules/trainer_schedule/schedule_services/trainer-schedule-query.service'; import { TrainerScheduleAvailabilityUpdateService } from '@/backend_trainer/backend_trainer_modules/trainer_schedule/schedule_services/trainer-schedule-availability-update.service'; import { TrainerScheduleLeaveCreateService } from '@/backend_trainer/backend_trainer_modules/trainer_schedule/schedule_services/trainer-schedule-leave-create.service'; import { TrainerScheduleRepository } from '@/backend_trainer/backend_trainer_modules/trainer_schedule/schedule_repositories/trainer-schedule-repository'; import { TrainerScheduleAvailabilityNormalizerPipe } from '@/backend_trainer/backend_trainer_modules/trainer_schedule/schedule_pipes/trainer-schedule-availability-normalizer.pipe';

/**
 * Intent: Defines the TrainerScheduleModule boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@Module({controllers:[TrainerScheduleQueryController,TrainerScheduleCommandController],providers:[TrainerScheduleQueryService,TrainerScheduleAvailabilityUpdateService,TrainerScheduleLeaveCreateService,TrainerScheduleRepository,TrainerScheduleAvailabilityNormalizerPipe]}) export class TrainerScheduleModule {}
