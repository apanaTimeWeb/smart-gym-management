// RESPONSIBILITY: Registers the isolated attendance feature slice and its controller/service/repository graph.
// FLOW: Nest bootstrap → TrainerAttendanceModule → feature-owned providers/controllers.

import { Module } from '@nestjs/common';
import { TrainerAttendanceQueryController } from '@/backend_trainer/backend_trainer_modules/trainer_attendance/attendance_controllers/trainer-attendance-query.controller'; import { TrainerAttendanceCommandController } from '@/backend_trainer/backend_trainer_modules/trainer_attendance/attendance_controllers/trainer-attendance-command.controller'; import { TrainerAttendanceQueryService } from '@/backend_trainer/backend_trainer_modules/trainer_attendance/attendance_services/trainer-attendance-query.service'; import { TrainerAttendanceCreateService } from '@/backend_trainer/backend_trainer_modules/trainer_attendance/attendance_services/trainer-attendance-create.service'; import { TrainerAttendanceCheckoutService } from '@/backend_trainer/backend_trainer_modules/trainer_attendance/attendance_services/trainer-attendance-checkout.service'; import { TrainerAttendanceRepository } from '@/backend_trainer/backend_trainer_modules/trainer_attendance/attendance_repositories/trainer-attendance-repository';

/**
 * Intent: Defines the TrainerAttendanceModule boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@Module({controllers:[TrainerAttendanceQueryController,TrainerAttendanceCommandController],providers:[TrainerAttendanceQueryService,TrainerAttendanceCreateService,TrainerAttendanceCheckoutService,TrainerAttendanceRepository]}) export class TrainerAttendanceModule {}
