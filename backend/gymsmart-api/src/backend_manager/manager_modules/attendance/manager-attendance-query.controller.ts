// RESPONSIBILITY: Owns the backend application HTTP controller boundary.
// FLOW: HTTP request → guards/decorators → DTO validation → feature service → canonical response envelope.
import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ManagerCoreRole } from '@/backend_manager/manager_core/manager_core_auth/manager-core-role.constants';
import { Roles } from '@/backend_manager/manager_core/manager_core_auth/manager-core-roles.decorator';

import { ManagerAttendanceFetchAttendanceHistoryResponseDto } from '@/backend_manager/manager_modules/attendance/attendance_responses/manager-attendance-fetch-attendance-history.response.dto';
import { ManagerAttendanceFetchAttendanceMembersResponseDto } from '@/backend_manager/manager_modules/attendance/attendance_responses/manager-attendance-fetch-attendance-members.response.dto';
import { ManagerAttendanceFetchAttendanceRecordsResponseDto } from '@/backend_manager/manager_modules/attendance/attendance_responses/manager-attendance-fetch-attendance-records.response.dto';
import { ManagerAttendanceFetchAttendanceStaffResponseDto } from '@/backend_manager/manager_modules/attendance/attendance_responses/manager-attendance-fetch-attendance-staff.response.dto';
import { ManagerAttendanceFetchAttendanceStatsResponseDto } from '@/backend_manager/manager_modules/attendance/attendance_responses/manager-attendance-fetch-attendance-stats.response.dto';
import { ManagerAttendanceQueryDto } from '@/backend_manager/manager_modules/attendance/attendance_dtos/manager-attendance-query.dto';
import { ManagerAttendanceFindAttendanceHistoryService } from '@/backend_manager/manager_modules/attendance/attendance_services/manager-attendance-find-attendance-history.service';
import { ManagerAttendanceFindAttendanceMembersService } from '@/backend_manager/manager_modules/attendance/attendance_services/manager-attendance-find-attendance-members.service';
import { ManagerAttendanceFindAttendanceRecordsService } from '@/backend_manager/manager_modules/attendance/attendance_services/manager-attendance-find-attendance-records.service';
import { ManagerAttendanceFindAttendanceStaffService } from '@/backend_manager/manager_modules/attendance/attendance_services/manager-attendance-find-attendance-staff.service';
import { ManagerAttendanceFindAttendanceStatsService } from '@/backend_manager/manager_modules/attendance/attendance_services/manager-attendance-find-attendance-stats.service';

@Controller('manager')
@ApiTags('Manager attendance')
@Roles(ManagerCoreRole.MANAGER)
export class ManagerAttendanceQueryController {
  constructor(private readonly fetchAttendanceRecordsService: ManagerAttendanceFindAttendanceRecordsService, private readonly fetchAttendanceStatsService: ManagerAttendanceFindAttendanceStatsService, private readonly fetchAttendanceHistoryService: ManagerAttendanceFindAttendanceHistoryService, private readonly fetchAttendanceMembersService: ManagerAttendanceFindAttendanceMembersService, private readonly fetchAttendanceStaffService: ManagerAttendanceFindAttendanceStaffService) {}

  // SLA: STANDARD
  @Get("attendance/history")
  @ApiOperation({ summary: 'findAttendanceHistory for Manager attendance' })
  @ApiResponse({ status: HttpStatus.OK, type: [ManagerAttendanceFetchAttendanceHistoryResponseDto] })
  findAttendanceHistory(@Query() query: ManagerAttendanceQueryDto): ReturnType<ManagerAttendanceFindAttendanceHistoryService['findAttendanceHistory']> { return this.fetchAttendanceHistoryService.findAttendanceHistory(query); }


  // SLA: STANDARD
  @Get("attendance/members")
  @ApiOperation({ summary: 'findAttendanceMembers for Manager attendance' })
  @ApiResponse({ status: HttpStatus.OK, type: ManagerAttendanceFetchAttendanceMembersResponseDto })
  findAttendanceMembers(@Query() query: ManagerAttendanceQueryDto): ReturnType<ManagerAttendanceFindAttendanceMembersService['findAttendanceMembers']> { return this.fetchAttendanceMembersService.findAttendanceMembers(query); }


  // SLA: STANDARD
  @Get("attendance/staff")
  @ApiOperation({ summary: 'findAttendanceStaff for Manager attendance' })
  @ApiResponse({ status: HttpStatus.OK, type: ManagerAttendanceFetchAttendanceStaffResponseDto })
  findAttendanceStaff(@Query() query: ManagerAttendanceQueryDto): ReturnType<ManagerAttendanceFindAttendanceStaffService['findAttendanceStaff']> { return this.fetchAttendanceStaffService.findAttendanceStaff(query); }


  // SLA: FAST
  @Get("attendance/stats")
  @ApiOperation({ summary: 'findAttendanceStats for Manager attendance' })
  @ApiResponse({ status: HttpStatus.OK, type: ManagerAttendanceFetchAttendanceStatsResponseDto })
  findAttendanceStats(@Query() query: ManagerAttendanceQueryDto): ReturnType<ManagerAttendanceFindAttendanceStatsService['findAttendanceStats']> { return this.fetchAttendanceStatsService.findAttendanceStats(query); }


  // SLA: STANDARD
  @Get("attendance")
  @ApiOperation({ summary: 'findAttendanceRecords for Manager attendance' })
  @ApiResponse({ status: HttpStatus.OK, type: ManagerAttendanceFetchAttendanceRecordsResponseDto })
  findAttendanceRecords(@Query() query: ManagerAttendanceQueryDto): ReturnType<ManagerAttendanceFindAttendanceRecordsService['findAttendanceRecords']> { return this.fetchAttendanceRecordsService.findAttendanceRecords(query); }


}

export { ManagerAttendanceQueryController as AttendanceQueryController };
