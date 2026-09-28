// RESPONSIBILITY: Owns the HTTP boundary for the attendance query side.
// FLOW: HTTP request → TrainerAttendanceQueryController → feature service → canonical response interceptor.

import { TrainerAttendanceListResponseDto, TrainerAttendanceMemberOptionResponseDto, TrainerAttendanceStatsResponseDto } from '@/backend_trainer/backend_trainer_modules/trainer_attendance/attendance_dtos/trainer-attendance-response.dto';
import { Controller, Get, Query, HttpStatus } from '@nestjs/common'; import { ApiOperation, ApiResponse, ApiTags, ApiQuery } from '@nestjs/swagger'; import { CoreRoles } from '@/backend_trainer/backend_core/core_security/core-roles.decorator';
import { CoreRole } from '@/backend_trainer/backend_core/core_types/core-auth.types'; import { TrainerAttendanceQueryService } from '@/backend_trainer/backend_trainer_modules/trainer_attendance/attendance_services/trainer-attendance-query.service'; import { TrainerAttendanceQueryDto } from '@/backend_trainer/backend_trainer_modules/trainer_attendance/attendance_dtos/trainer-attendance-query.dto';

/**
 * Intent: Defines the TrainerAttendanceQueryController boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@Controller('/trainer/attendance')
@ApiTags('trainer/attendance')
export class TrainerAttendanceQueryController {
  constructor(private readonly service:TrainerAttendanceQueryService){}
// SLA: STANDARD
@ApiOperation({ summary: 'Get Trainer trainer-attendance-query.controller' })
@Get() @CoreRoles(CoreRole.TRAINER)@ApiQuery({ type: TrainerAttendanceQueryDto })
 @ApiResponse({ status: HttpStatus.OK, type: TrainerAttendanceListResponseDto }) /** Returns filtered attendance records. */ async getAttendance(@Query() query:TrainerAttendanceQueryDto){return this.service.findMany(query);}
  // SLA: STANDARD
@ApiOperation({ summary: 'Get Trainer trainer-attendance-query.controller' })
@Get('stats') @CoreRoles(CoreRole.TRAINER) @ApiResponse({ status: HttpStatus.OK, type: TrainerAttendanceStatsResponseDto }) /** Returns attendance KPI counts. */ async getStats(){return this.service.findStats();}
// SLA: FAST
@ApiOperation({ summary: 'Get Trainer trainer-attendance-query.controller' })
@Get('today-stats')
@CoreRoles(CoreRole.TRAINER)
@ApiResponse({ status: HttpStatus.OK, type: TrainerAttendanceStatsResponseDto })
getTodayStats() { return this.service.findStats(); }
// SLA: STANDARD
@ApiOperation({ summary: 'Get Trainer trainer-attendance-query.controller' })
@Get('members-basic') @CoreRoles(CoreRole.TRAINER) @ApiResponse({ status: HttpStatus.OK, type: TrainerAttendanceMemberOptionResponseDto, isArray: true }) /** Returns member options for attendance entry. */ async getMemberOptions(){return this.service.findMemberOptions();}
}