// RESPONSIBILITY: Owns the backend application HTTP controller boundary.
// FLOW: HTTP request → guards/decorators → DTO validation → feature service → canonical response envelope.
import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ManagerCoreRole } from '@/backend_manager/manager_core/manager_core_auth/manager-core-role.constants';
import { Roles } from '@/backend_manager/manager_core/manager_core_auth/manager-core-roles.decorator';
import { RequireIdempotencyKey } from '@/backend_manager/manager_core/manager_core_idempotency/manager-core-require-idempotency-key.decorator';

import { ManagerAttendanceMarkAttendanceRequestDto } from '@/backend_manager/manager_modules/attendance/attendance_dtos/manager-attendance-mark-attendance.request.dto';
import { ManagerAttendanceMarkAttendanceResponseDto } from '@/backend_manager/manager_modules/attendance/attendance_responses/manager-attendance-mark-attendance.response.dto';
import { ManagerAttendanceMarkAttendanceService } from '@/backend_manager/manager_modules/attendance/attendance_services/manager-attendance-mark-attendance.service';

@Controller('manager')
@ApiTags('Manager attendance')
@Roles(ManagerCoreRole.MANAGER)
export class ManagerAttendanceCommandController {
  constructor(private readonly markAttendanceService: ManagerAttendanceMarkAttendanceService) {}

  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post("attendance")
  @ApiOperation({ summary: 'updateAttendance for Manager attendance' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiResponse({ status: HttpStatus.CREATED, type: ManagerAttendanceMarkAttendanceResponseDto })
  markAttendance(@Body() dto: ManagerAttendanceMarkAttendanceRequestDto): ReturnType<ManagerAttendanceMarkAttendanceService['markAttendance']> { return this.markAttendanceService.markAttendance(dto); }


}

export { ManagerAttendanceCommandController as AttendanceCommandController };
