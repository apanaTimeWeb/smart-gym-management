// RESPONSIBILITY: Owns the HTTP boundary for the schedule query side.
// FLOW: HTTP request → ScheduleQueryController → feature service → canonical response interceptor.

import { Controller, Get, HttpStatus } from '@nestjs/common'; import { ApiResponse, ApiTags } from '@nestjs/swagger'; import { CoreRoles } from '@/backend_trainer/core/security/core-roles.decorator';
import { CoreRole } from '@/backend_trainer/core/types/core-auth.types'; import { ScheduleQueryService } from '@/backend_trainer/modules/backend_trainer/schedule/services/schedule-query.service';
@Controller('/trainer/schedule')
@ApiTags('trainer/schedule')
export class ScheduleQueryController {
  constructor(private readonly service:ScheduleQueryService){}
// SLA: STANDARD
  // SLA: STANDARD
@Get() @CoreRoles(CoreRole.TRAINER) @ApiResponse({status:HttpStatus.OK}) /** Returns schedule availability and leave requests. */ async get(){return this.service.find();}
}