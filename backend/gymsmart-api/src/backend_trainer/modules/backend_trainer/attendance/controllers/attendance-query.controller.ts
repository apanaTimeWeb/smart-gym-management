// RESPONSIBILITY: Owns the HTTP boundary for the attendance query side.
// FLOW: HTTP request → AttendanceQueryController → feature service → canonical response interceptor.

import { Controller, Get, Query, HttpStatus } from '@nestjs/common'; import { ApiResponse, ApiTags } from '@nestjs/swagger'; import { CoreRoles } from '@/backend_trainer/core/security/core-roles.decorator';
import { CoreRole } from '@/backend_trainer/core/types/core-auth.types'; import { AttendanceQueryService } from '@/backend_trainer/modules/backend_trainer/attendance/services/attendance-query.service'; import { AttendanceQueryDto } from '@/backend_trainer/modules/backend_trainer/attendance/dtos/attendance-query.dto';
@Controller('/trainer/attendance')
@ApiTags('trainer/attendance')
export class AttendanceQueryController {
  constructor(private readonly service:AttendanceQueryService){}
// SLA: STANDARD
  // SLA: STANDARD
@Get() @CoreRoles(CoreRole.TRAINER) @ApiResponse({status:HttpStatus.OK}) /** Returns filtered attendance records. */ async getAttendance(@Query() query:AttendanceQueryDto){return this.service.findMany(query);}
  // SLA: STANDARD
@Get('stats') @CoreRoles(CoreRole.TRAINER) @ApiResponse({status:HttpStatus.OK}) /** Returns attendance KPI counts. */ async getStats(){return this.service.findStats();}
// SLA: STANDARD
  // SLA: FAST
// SLA: STANDARD
@Get('today-stats')
@CoreRoles(CoreRole.TRAINER)
getTodayStats() { return this.service.findStats(); }
// SLA: STANDARD
@Get('members-basic') @CoreRoles(CoreRole.TRAINER) @ApiResponse({status:HttpStatus.OK}) /** Returns member options for attendance entry. */ async getMemberOptions(){return this.service.findMemberOptions();}
}