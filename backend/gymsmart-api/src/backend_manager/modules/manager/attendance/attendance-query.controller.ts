// RESPONSIBILITY: Owns the Manager attendance query/read HTTP boundary; contains no business logic or direct ORM access.
// FLOW: HTTP request -> DTO/query validation -> feature use-case service -> repository/domain -> canonical response.
import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CoreRole } from '@/backend_manager/core/auth/core-role.constants';
import { Roles } from '@/backend_manager/core/auth/core-roles.decorator';
import { AttendanceFetchAttendanceHistoryResponseDto } from '@/backend_manager/modules/manager/attendance/dtos/attendance-fetch-attendance-history.response.dto';
import { AttendanceFetchAttendanceHistoryService } from '@/backend_manager/modules/manager/attendance/services/attendance-fetch-attendance-history.service';
import { AttendanceFetchAttendanceMembersResponseDto } from '@/backend_manager/modules/manager/attendance/dtos/attendance-fetch-attendance-members.response.dto';
import { AttendanceFetchAttendanceMembersService } from '@/backend_manager/modules/manager/attendance/services/attendance-fetch-attendance-members.service';
import { AttendanceFetchAttendanceRecordsResponseDto } from '@/backend_manager/modules/manager/attendance/dtos/attendance-fetch-attendance-records.response.dto';
import { AttendanceFetchAttendanceRecordsService } from '@/backend_manager/modules/manager/attendance/services/attendance-fetch-attendance-records.service';
import { AttendanceFetchAttendanceStaffResponseDto } from '@/backend_manager/modules/manager/attendance/dtos/attendance-fetch-attendance-staff.response.dto';
import { AttendanceFetchAttendanceStaffService } from '@/backend_manager/modules/manager/attendance/services/attendance-fetch-attendance-staff.service';
import { AttendanceFetchAttendanceStatsResponseDto } from '@/backend_manager/modules/manager/attendance/dtos/attendance-fetch-attendance-stats.response.dto';
import { AttendanceFetchAttendanceStatsService } from '@/backend_manager/modules/manager/attendance/services/attendance-fetch-attendance-stats.service';
import { AttendanceQueryDto } from '@/backend_manager/modules/manager/attendance/dtos/attendance-query.dto';

@Controller('manager')
@ApiTags('Manager attendance')
@Roles(CoreRole.MANAGER)
export class AttendanceQueryController {
  constructor(private readonly fetchAttendanceRecordsService: AttendanceFetchAttendanceRecordsService, private readonly fetchAttendanceStatsService: AttendanceFetchAttendanceStatsService, private readonly fetchAttendanceHistoryService: AttendanceFetchAttendanceHistoryService, private readonly fetchAttendanceMembersService: AttendanceFetchAttendanceMembersService, private readonly fetchAttendanceStaffService: AttendanceFetchAttendanceStaffService) {}

  // SLA: STANDARD
  @Get("attendance/history")
  @ApiOperation({ summary: 'fetchAttendanceHistory for Manager attendance' })
  @ApiResponse({ status: HttpStatus.OK, type: [AttendanceFetchAttendanceHistoryResponseDto] })
  fetchAttendanceHistory(@Query() query: AttendanceQueryDto): Promise<AttendanceFetchAttendanceHistoryResponseDto[]> {  return this.fetchAttendanceHistoryService.fetchAttendanceHistory(query) as unknown as Promise<AttendanceFetchAttendanceHistoryResponseDto[]>;  }


  // SLA: STANDARD
  @Get("attendance/members")
  @ApiOperation({ summary: 'fetchAttendanceMembers for Manager attendance' })
  @ApiResponse({ status: HttpStatus.OK, type: AttendanceFetchAttendanceMembersResponseDto })
  fetchAttendanceMembers(@Query() query: AttendanceQueryDto): Promise<AttendanceFetchAttendanceMembersResponseDto> {  return this.fetchAttendanceMembersService.fetchAttendanceMembers(query) as unknown as Promise<AttendanceFetchAttendanceMembersResponseDto>;  }


  // SLA: STANDARD
  @Get("attendance/staff")
  @ApiOperation({ summary: 'fetchAttendanceStaff for Manager attendance' })
  @ApiResponse({ status: HttpStatus.OK, type: AttendanceFetchAttendanceStaffResponseDto })
  fetchAttendanceStaff(@Query() query: AttendanceQueryDto): Promise<AttendanceFetchAttendanceStaffResponseDto> {  return this.fetchAttendanceStaffService.fetchAttendanceStaff(query) as unknown as Promise<AttendanceFetchAttendanceStaffResponseDto>;  }


  // SLA: FAST
  @Get("attendance/stats")
  @ApiOperation({ summary: 'fetchAttendanceStats for Manager attendance' })
  @ApiResponse({ status: HttpStatus.OK, type: AttendanceFetchAttendanceStatsResponseDto })
  fetchAttendanceStats(@Query() query: AttendanceQueryDto): Promise<AttendanceFetchAttendanceStatsResponseDto> {  return this.fetchAttendanceStatsService.fetchAttendanceStats(query) as unknown as Promise<AttendanceFetchAttendanceStatsResponseDto>;  }


  // SLA: STANDARD
  @Get("attendance")
  @ApiOperation({ summary: 'fetchAttendanceRecords for Manager attendance' })
  @ApiResponse({ status: HttpStatus.OK, type: AttendanceFetchAttendanceRecordsResponseDto })
  fetchAttendanceRecords(@Query() query: AttendanceQueryDto): Promise<AttendanceFetchAttendanceRecordsResponseDto> {  return this.fetchAttendanceRecordsService.fetchAttendanceRecords(query) as unknown as Promise<AttendanceFetchAttendanceRecordsResponseDto>;  }


}
