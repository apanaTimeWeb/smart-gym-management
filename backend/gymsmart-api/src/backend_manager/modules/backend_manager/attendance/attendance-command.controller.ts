// RESPONSIBILITY: Owns the backend application HTTP controller boundary.
// FLOW: HTTP request → guards/decorators → DTO validation → feature service → canonical response envelope.
import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CoreRole } from '@/backend_manager/core/auth/core-role.constants';
import { Roles } from '@/backend_manager/core/auth/core-roles.decorator';
import { CoreRequireIdempotencyKey } from '@/backend_manager/core/idempotency/core-require-idempotency-key.decorator';

import { AttendanceMarkAttendanceRequestDto } from '@/backend_manager/modules/backend_manager/attendance/dtos/attendance-mark-attendance.request.dto';
import { AttendanceMarkAttendanceResponseDto } from '@/backend_manager/modules/backend_manager/attendance/dtos/attendance-mark-attendance.response.dto';
import { AttendanceMarkAttendanceService } from '@/backend_manager/modules/backend_manager/attendance/services/attendance-mark-attendance.service';

@Controller('manager')
@ApiTags('Manager attendance')
@Roles(CoreRole.MANAGER)
export class AttendanceCommandController {
  constructor(private readonly markAttendanceService: AttendanceMarkAttendanceService) {}

  // SLA: STANDARD
  @CoreRequireIdempotencyKey()
  @Post("attendance")
  @ApiOperation({ summary: 'markAttendance for Manager attendance' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiResponse({ status: HttpStatus.CREATED, type: AttendanceMarkAttendanceResponseDto })
  markAttendance(@Body() dto: AttendanceMarkAttendanceRequestDto): ReturnType<AttendanceMarkAttendanceService['markAttendance']> { return this.markAttendanceService.markAttendance(dto as any); }


}
