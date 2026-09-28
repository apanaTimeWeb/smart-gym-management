// RESPONSIBILITY: Owns the HTTP boundary for the schedule command side.
// FLOW: HTTP request → TrainerScheduleCommandController → feature service → canonical response interceptor.

import { TrainerScheduleAvailabilityResponseDto, TrainerScheduleLeaveResponseDto } from '@/backend_trainer/backend_trainer_modules/trainer_schedule/schedule_dtos/trainer-schedule-response.dto';
import { Body, Patch, Post, Put, UsePipes, Controller, HttpStatus } from '@nestjs/common'; import { ApiOperation, ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger'; import { CoreRoles } from '@/backend_trainer/backend_core/core_security/core-roles.decorator';
import { CoreRole } from '@/backend_trainer/backend_core/core_types/core-auth.types'; import { RequireIdempotencyKey } from '@/backend_trainer/backend_core/core_security/core-idempotency.decorator'; import { TrainerScheduleAvailabilityUpdateService } from '@/backend_trainer/backend_trainer_modules/trainer_schedule/schedule_services/trainer-schedule-availability-update.service'; import { TrainerScheduleLeaveCreateService } from '@/backend_trainer/backend_trainer_modules/trainer_schedule/schedule_services/trainer-schedule-leave-create.service'; import { TrainerScheduleAvailabilityNormalizerPipe } from '@/backend_trainer/backend_trainer_modules/trainer_schedule/schedule_pipes/trainer-schedule-availability-normalizer.pipe'; import { TrainerScheduleUpdateAvailabilityBodyDto } from '@/backend_trainer/backend_trainer_modules/trainer_schedule/schedule_dtos/trainer-schedule-update-availability-body.dto'; import { TrainerScheduleCreateLeaveDto } from '@/backend_trainer/backend_trainer_modules/trainer_schedule/schedule_dtos/trainer-schedule-create-leave.dto';

/**
 * Intent: Defines the TrainerScheduleCommandController boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@Controller('/trainer/schedule')
@ApiTags('trainer/schedule')
export class TrainerScheduleCommandController {
  constructor(private readonly availability:TrainerScheduleAvailabilityUpdateService,private readonly leave:TrainerScheduleLeaveCreateService){}
// SLA: STANDARD
  // SLA: STANDARD
@ApiOperation({ summary: 'Put Trainer trainer-schedule-command.controller' })
@Put('availability') @CoreRoles(CoreRole.TRAINER) @RequireIdempotencyKey() @UsePipes(TrainerScheduleAvailabilityNormalizerPipe)@ApiBody({ type: TrainerScheduleUpdateAvailabilityBodyDto })
 @ApiResponse({ status: HttpStatus.OK, type: TrainerScheduleAvailabilityResponseDto, isArray: true }) /** Supports the actual frontend PUT availability contract. */ async putAvailability(@Body() dto:TrainerScheduleUpdateAvailabilityBodyDto){return this.availability.update(dto);}
  // SLA: STANDARD
@ApiOperation({ summary: 'Patch Trainer trainer-schedule-command.controller' })
@Patch('availability') @CoreRoles(CoreRole.TRAINER) @RequireIdempotencyKey() @UsePipes(TrainerScheduleAvailabilityNormalizerPipe)@ApiBody({ type: TrainerScheduleUpdateAvailabilityBodyDto })
 @ApiResponse({ status: HttpStatus.OK, type: TrainerScheduleAvailabilityResponseDto, isArray: true }) /** Supports the documented PATCH compatibility contract. */ async patchAvailability(@Body() dto:TrainerScheduleUpdateAvailabilityBodyDto){return this.availability.update(dto);}
// SLA: STANDARD
  // SLA: STANDARD
@ApiOperation({ summary: 'Post Trainer trainer-schedule-command.controller' })
@Post('leaves') @CoreRoles(CoreRole.TRAINER) @RequireIdempotencyKey()@ApiBody({ type: TrainerScheduleCreateLeaveDto })
 @ApiResponse({ status: HttpStatus.CREATED, type: TrainerScheduleLeaveResponseDto }) /** Creates a trainer leave request. */ async createLeave(@Body() dto:TrainerScheduleCreateLeaveDto){return this.leave.create(dto);}
}
