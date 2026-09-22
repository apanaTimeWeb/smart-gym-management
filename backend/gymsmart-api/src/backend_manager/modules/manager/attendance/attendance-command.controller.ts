// RESPONSIBILITY: Owns the Manager attendance command/write HTTP boundary; contains no business logic or direct ORM access.
// FLOW: HTTP request -> DTO/query validation -> feature use-case service -> repository/domain -> canonical response.
import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CoreRole } from '@/core/auth/core-role.constants';
import { Roles } from '@/core/auth/core-roles.decorator';
import { AttendanceMarkAttendanceRequestDto } from '@/modules/manager/attendance/dtos/attendance-mark-attendance.request.dto';
import { AttendanceMarkAttendanceResponseDto } from '@/modules/manager/attendance/dtos/attendance-mark-attendance.response.dto';
import { AttendanceMarkAttendanceService } from '@/modules/manager/attendance/services/attendance-mark-attendance.service';
import { AttendanceQueryDto } from '@/modules/manager/attendance/dtos/attendance-query.dto';

@Controller('manager')
@ApiTags('Manager attendance')
@Roles(CoreRole.MANAGER)
export class AttendanceCommandController {
  constructor(private readonly markAttendanceService: AttendanceMarkAttendanceService) {}

  // SLA: STANDARD
  @Post("attendance")
  @ApiOperation({ summary: 'markAttendance for Manager attendance' })
  @ApiHeader({ name: 'Idempotency-Key', required: false })
  @ApiResponse({ status: HttpStatus.CREATED, type: AttendanceMarkAttendanceResponseDto })
  markAttendance(@Body() dto: AttendanceMarkAttendanceRequestDto): Promise<AttendanceMarkAttendanceResponseDto> {  return this.markAttendanceService.markAttendance(dto) as Promise<AttendanceMarkAttendanceResponseDto>;  }


}
