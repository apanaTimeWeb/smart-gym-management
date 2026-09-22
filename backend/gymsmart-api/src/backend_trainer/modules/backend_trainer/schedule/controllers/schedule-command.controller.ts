// RESPONSIBILITY: Owns the HTTP boundary for the schedule command side.
// FLOW: HTTP request → ScheduleCommandController → feature service → canonical response interceptor.

import { Body, Patch, Post, Put, UsePipes, Controller, HttpStatus } from '@nestjs/common'; import { ApiResponse, ApiTags } from '@nestjs/swagger'; import { CoreRoles } from '@/backend_trainer/core/security/core-roles.decorator';
import { CoreRole } from '@/backend_trainer/core/types/core-auth.types'; import { CoreIdempotency } from '@/backend_trainer/core/security/core-idempotency.decorator'; import { ScheduleAvailabilityUpdateService } from '@/backend_trainer/modules/backend_trainer/schedule/services/schedule-availability-update.service'; import { ScheduleLeaveCreateService } from '@/backend_trainer/modules/backend_trainer/schedule/services/schedule-leave-create.service'; import { ScheduleAvailabilityNormalizerPipe } from '@/backend_trainer/modules/backend_trainer/schedule/pipes/schedule-availability-normalizer.pipe'; import { ScheduleUpdateAvailabilityBodyDto } from '@/backend_trainer/modules/backend_trainer/schedule/dtos/schedule-update-availability-body.dto'; import { ScheduleCreateLeaveDto } from '@/backend_trainer/modules/backend_trainer/schedule/dtos/schedule-create-leave.dto';
@Controller('/trainer/schedule')
@ApiTags('trainer/schedule')
export class ScheduleCommandController {
  constructor(private readonly availability:ScheduleAvailabilityUpdateService,private readonly leave:ScheduleLeaveCreateService){}
// SLA: STANDARD
  // SLA: STANDARD
@Put('availability') @CoreRoles(CoreRole.TRAINER) @CoreIdempotency() @UsePipes(ScheduleAvailabilityNormalizerPipe) @ApiResponse({status:HttpStatus.OK}) /** Supports the actual frontend PUT availability contract. */ async putAvailability(@Body() dto:ScheduleUpdateAvailabilityBodyDto){return this.availability.update(dto);}
  // SLA: STANDARD
@Patch('availability') @CoreRoles(CoreRole.TRAINER) @CoreIdempotency() @UsePipes(ScheduleAvailabilityNormalizerPipe) @ApiResponse({status:HttpStatus.OK}) /** Supports the documented PATCH compatibility contract. */ async patchAvailability(@Body() dto:ScheduleUpdateAvailabilityBodyDto){return this.availability.update(dto);}
// SLA: STANDARD
  // SLA: STANDARD
@Post('leaves') @CoreRoles(CoreRole.TRAINER) @CoreIdempotency() @ApiResponse({status:HttpStatus.CREATED}) /** Creates a trainer leave request. */ async createLeave(@Body() dto:ScheduleCreateLeaveDto){return this.leave.create(dto);}
}
