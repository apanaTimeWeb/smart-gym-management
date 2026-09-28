// RESPONSIBILITY: Owns the HTTP boundary for the schedule query side.
// FLOW: HTTP request → TrainerScheduleQueryController → feature service → canonical response interceptor.

import { TrainerScheduleResponseDto } from '@/backend_trainer/backend_trainer_modules/trainer_schedule/schedule_dtos/trainer-schedule-response.dto';
import { Controller, Get, HttpStatus } from '@nestjs/common'; import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'; import { CoreRoles } from '@/backend_trainer/backend_core/core_security/core-roles.decorator';
import { CoreRole } from '@/backend_trainer/backend_core/core_types/core-auth.types'; import { TrainerScheduleQueryService } from '@/backend_trainer/backend_trainer_modules/trainer_schedule/schedule_services/trainer-schedule-query.service';

/**
 * Intent: Defines the TrainerScheduleQueryController boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@Controller('/trainer/schedule')
@ApiTags('trainer/schedule')
export class TrainerScheduleQueryController {
  constructor(private readonly service:TrainerScheduleQueryService){}
// SLA: STANDARD
  // SLA: STANDARD
@ApiOperation({ summary: 'Get Trainer trainer-schedule-query.controller' })
@Get() @CoreRoles(CoreRole.TRAINER) @ApiResponse({ status: HttpStatus.OK, type: TrainerScheduleResponseDto }) /** Returns schedule availability and leave requests. */ async get(){return this.service.find();}
}