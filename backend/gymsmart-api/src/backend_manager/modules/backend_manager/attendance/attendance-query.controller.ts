// RESPONSIBILITY: Owns the backend application HTTP controller boundary.
// FLOW: HTTP request → guards/decorators → DTO validation → feature service → canonical response envelope.
import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CoreRole } from '@/backend_manager/core/auth/core-role.constants';
import { Roles } from '@/backend_manager/core/auth/core-roles.decorator';

import { AttendanceFetchAttendanceHistoryResponseDto } from '@/backend_manager/modules/backend_manager/attendance/dtos/attendance-fetch-attendance-history.response.dto';
import { AttendanceFetchAttendanceMembersResponseDto } from '@/backend_manager/modules/backend_manager/attendance/dtos/attendance-fetch-attendance-members.response.dto';
import { AttendanceFetchAttendanceRecordsResponseDto } from '@/backend_manager/modules/backend_manager/attendance/dtos/attendance-fetch-attendance-records.response.dto';
import { AttendanceFetchAttendanceStaffResponseDto } from '@/backend_manager/modules/backend_manager/attendance/dtos/attendance-fetch-attendance-staff.response.dto';
import { AttendanceFetchAttendanceStatsResponseDto } from '@/backend_manager/modules/backend_manager/attendance/dtos/attendance-fetch-attendance-stats.response.dto';
import { AttendanceQueryDto } from '@/backend_manager/modules/backend_manager/attendance/dtos/attendance-query.dto';
import { AttendanceFetchAttendanceHistoryService } from '@/backend_manager/modules/backend_manager/attendance/services/attendance-fetch-attendance-history.service';
import { AttendanceFetchAttendanceMembersService } from '@/backend_manager/modules/backend_manager/attendance/services/attendance-fetch-attendance-members.service';
import { AttendanceFetchAttendanceRecordsService } from '@/backend_manager/modules/backend_manager/attendance/services/attendance-fetch-attendance-records.service';
import { AttendanceFetchAttendanceStaffService } from '@/backend_manager/modules/backend_manager/attendance/services/attendance-fetch-attendance-staff.service';
import { AttendanceFetchAttendanceStatsService } from '@/backend_manager/modules/backend_manager/attendance/services/attendance-fetch-attendance-stats.service';

@Controller('manager')
@ApiTags('Manager attendance')
@Roles(CoreRole.MANAGER)
export class AttendanceQueryController {
  constructor(private readonly fetchAttendanceRecordsService: AttendanceFetchAttendanceRecordsService, private readonly fetchAttendanceStatsService: AttendanceFetchAttendanceStatsService, private readonly fetchAttendanceHistoryService: AttendanceFetchAttendanceHistoryService, private readonly fetchAttendanceMembersService: AttendanceFetchAttendanceMembersService, private readonly fetchAttendanceStaffService: AttendanceFetchAttendanceStaffService) {}

  // SLA: STANDARD
  @Get("attendance/history")
  @ApiOperation({ summary: 'fetchAttendanceHistory for Manager attendance' })
  @ApiResponse({ status: HttpStatus.OK, type: [AttendanceFetchAttendanceHistoryResponseDto] })
  fetchAttendanceHistory(@Query() query: AttendanceQueryDto): ReturnType<AttendanceFetchAttendanceHistoryService['fetchAttendanceHistory']> { return this.fetchAttendanceHistoryService.fetchAttendanceHistory(query as any); }


  // SLA: STANDARD
  @Get("attendance/members")
  @ApiOperation({ summary: 'fetchAttendanceMembers for Manager attendance' })
  @ApiResponse({ status: HttpStatus.OK, type: AttendanceFetchAttendanceMembersResponseDto })
  fetchAttendanceMembers(@Query() query: AttendanceQueryDto): ReturnType<AttendanceFetchAttendanceMembersService['fetchAttendanceMembers']> { return this.fetchAttendanceMembersService.fetchAttendanceMembers(query as any); }


  // SLA: STANDARD
  @Get("attendance/staff")
  @ApiOperation({ summary: 'fetchAttendanceStaff for Manager attendance' })
  @ApiResponse({ status: HttpStatus.OK, type: AttendanceFetchAttendanceStaffResponseDto })
  fetchAttendanceStaff(@Query() query: AttendanceQueryDto): ReturnType<AttendanceFetchAttendanceStaffService['fetchAttendanceStaff']> { return this.fetchAttendanceStaffService.fetchAttendanceStaff(query as any); }


  // SLA: FAST
  @Get("attendance/stats")
  @ApiOperation({ summary: 'fetchAttendanceStats for Manager attendance' })
  @ApiResponse({ status: HttpStatus.OK, type: AttendanceFetchAttendanceStatsResponseDto })
  fetchAttendanceStats(@Query() query: AttendanceQueryDto): ReturnType<AttendanceFetchAttendanceStatsService['fetchAttendanceStats']> { return this.fetchAttendanceStatsService.fetchAttendanceStats(query as any); }


  // SLA: STANDARD
  @Get("attendance")
  @ApiOperation({ summary: 'fetchAttendanceRecords for Manager attendance' })
  @ApiResponse({ status: HttpStatus.OK, type: AttendanceFetchAttendanceRecordsResponseDto })
  fetchAttendanceRecords(@Query() query: AttendanceQueryDto): ReturnType<AttendanceFetchAttendanceRecordsService['fetchAttendanceRecords']> { return this.fetchAttendanceRecordsService.fetchAttendanceRecords(query as any); }


}
