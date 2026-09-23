// RESPONSIBILITY: Owns the backend application HTTP controller boundary.
// FLOW: HTTP request → guards/decorators → DTO validation → feature service → canonical response envelope.
import { Controller, Get, HttpStatus, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CoreRole } from '@/backend_manager/core/auth/core-role.constants';
import { Roles } from '@/backend_manager/core/auth/core-roles.decorator';

import { MembersExportMembersReportResponseDto } from '@/backend_manager/modules/backend_manager/members/dtos/members-export-members-report.response.dto';
import { MembersFetchMemberAttendanceResponseDto } from '@/backend_manager/modules/backend_manager/members/dtos/members-fetch-member-attendance.response.dto';
import { MembersFetchMemberByIdResponseDto } from '@/backend_manager/modules/backend_manager/members/dtos/members-fetch-member-by-id.response.dto';
import { MembersFetchMemberDietPlansResponseDto } from '@/backend_manager/modules/backend_manager/members/dtos/members-fetch-member-diet-plans.response.dto';
import { MembersFetchMemberPaymentsResponseDto } from '@/backend_manager/modules/backend_manager/members/dtos/members-fetch-member-payments.response.dto';
import { MembersFetchMemberPlansResponseDto } from '@/backend_manager/modules/backend_manager/members/dtos/members-fetch-member-plans.response.dto';
import { MembersFetchMemberStatsResponseDto } from '@/backend_manager/modules/backend_manager/members/dtos/members-fetch-member-stats.response.dto';
import { MembersFetchMemberTrainersResponseDto } from '@/backend_manager/modules/backend_manager/members/dtos/members-fetch-member-trainers.response.dto';
import { MembersFetchMemberWorkoutsResponseDto } from '@/backend_manager/modules/backend_manager/members/dtos/members-fetch-member-workouts.response.dto';
import { MembersFetchMembersResponseDto } from '@/backend_manager/modules/backend_manager/members/dtos/members-fetch-members.response.dto';
import { MembersQueryDto } from '@/backend_manager/modules/backend_manager/members/dtos/members-query.dto';
import { MembersExportMembersReportService } from '@/backend_manager/modules/backend_manager/members/services/members-export-members-report.service';
import { MembersFetchMemberAttendanceService } from '@/backend_manager/modules/backend_manager/members/services/members-fetch-member-attendance.service';
import { MembersFetchMemberByIdService } from '@/backend_manager/modules/backend_manager/members/services/members-fetch-member-by-id.service';
import { MembersFetchMemberDietPlansService } from '@/backend_manager/modules/backend_manager/members/services/members-fetch-member-diet-plans.service';
import { MembersFetchMemberPaymentsService } from '@/backend_manager/modules/backend_manager/members/services/members-fetch-member-payments.service';
import { MembersFetchMemberPlansService } from '@/backend_manager/modules/backend_manager/members/services/members-fetch-member-plans.service';
import { MembersFetchMemberStatsService } from '@/backend_manager/modules/backend_manager/members/services/members-fetch-member-stats.service';
import { MembersFetchMemberTrainersService } from '@/backend_manager/modules/backend_manager/members/services/members-fetch-member-trainers.service';
import { MembersFetchMemberWorkoutsService } from '@/backend_manager/modules/backend_manager/members/services/members-fetch-member-workouts.service';
import { MembersFetchMembersService } from '@/backend_manager/modules/backend_manager/members/services/members-fetch-members.service';

@Controller('manager')
@ApiTags('Manager members')
@Roles(CoreRole.MANAGER)
export class MembersQueryController {
  constructor(private readonly fetchMembersService: MembersFetchMembersService, private readonly fetchMemberByIdService: MembersFetchMemberByIdService, private readonly fetchMemberStatsService: MembersFetchMemberStatsService, private readonly exportMembersReportService: MembersExportMembersReportService, private readonly fetchMemberTrainersService: MembersFetchMemberTrainersService, private readonly fetchMemberPlansService: MembersFetchMemberPlansService, private readonly fetchMemberPaymentsService: MembersFetchMemberPaymentsService, private readonly fetchMemberAttendanceService: MembersFetchMemberAttendanceService, private readonly fetchMemberDietPlansService: MembersFetchMemberDietPlansService, private readonly fetchMemberWorkoutsService: MembersFetchMemberWorkoutsService) {}

  // SLA: STANDARD
  @Get("members/diet-plans")
  @ApiOperation({ summary: 'fetchMemberDietPlans for Manager members' })
  @ApiResponse({ status: HttpStatus.OK, type: [MembersFetchMemberDietPlansResponseDto] })
  fetchMemberDietPlans(@Query() query: MembersQueryDto): ReturnType<MembersFetchMemberDietPlansService['fetchMemberDietPlans']> { return this.fetchMemberDietPlansService.fetchMemberDietPlans(query as any); }


  // SLA: STANDARD
  @Get("members/export")
  @ApiOperation({ summary: 'exportMembersReport for Manager members' })
  @ApiResponse({ status: HttpStatus.OK, type: MembersExportMembersReportResponseDto })
  exportMembersReport(@Query() query: MembersQueryDto): ReturnType<MembersExportMembersReportService['exportMembersReport']> { return this.exportMembersReportService.exportMembersReport(query as any); }


  // SLA: STANDARD
  @Get("members/plans")
  @ApiOperation({ summary: 'fetchMemberPlans for Manager members' })
  @ApiResponse({ status: HttpStatus.OK, type: [MembersFetchMemberPlansResponseDto] })
  fetchMemberPlans(@Query() query: MembersQueryDto): ReturnType<MembersFetchMemberPlansService['fetchMemberPlans']> { return this.fetchMemberPlansService.fetchMemberPlans(query as any); }


  // SLA: FAST
  @Get("members/stats")
  @ApiOperation({ summary: 'fetchMemberStats for Manager members' })
  @ApiResponse({ status: HttpStatus.OK, type: MembersFetchMemberStatsResponseDto })
  fetchMemberStats(@Query() query: MembersQueryDto): ReturnType<MembersFetchMemberStatsService['fetchMemberStats']> { return this.fetchMemberStatsService.fetchMemberStats(query as any); }


  // SLA: STANDARD
  @Get("members/trainers")
  @ApiOperation({ summary: 'fetchMemberTrainers for Manager members' })
  @ApiResponse({ status: HttpStatus.OK, type: MembersFetchMemberTrainersResponseDto })
  fetchMemberTrainers(@Query() query: MembersQueryDto): ReturnType<MembersFetchMemberTrainersService['fetchMemberTrainers']> { return this.fetchMemberTrainersService.fetchMemberTrainers(query as any); }


  // SLA: STANDARD
  @Get("members/workouts")
  @ApiOperation({ summary: 'fetchMemberWorkouts for Manager members' })
  @ApiResponse({ status: HttpStatus.OK, type: [MembersFetchMemberWorkoutsResponseDto] })
  fetchMemberWorkouts(@Query() query: MembersQueryDto): ReturnType<MembersFetchMemberWorkoutsService['fetchMemberWorkouts']> { return this.fetchMemberWorkoutsService.fetchMemberWorkouts(query as any); }


  // SLA: STANDARD
  @Get("members")
  @ApiOperation({ summary: 'fetchMembers for Manager members' })
  @ApiResponse({ status: HttpStatus.OK, type: MembersFetchMembersResponseDto })
  fetchMembers(@Query() query: MembersQueryDto): ReturnType<MembersFetchMembersService['fetchMembers']> { return this.fetchMembersService.fetchMembers(query as any); }


  // SLA: STANDARD
  @Get("members/:memberId/attendance")
  @ApiOperation({ summary: 'fetchMemberAttendance for Manager members' })
  @ApiParam({ name: 'memberId', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: [MembersFetchMemberAttendanceResponseDto] })
  fetchMemberAttendance(@Param('memberId') memberId: string, @Query() query: MembersQueryDto): ReturnType<MembersFetchMemberAttendanceService['fetchMemberAttendance']> { return this.fetchMemberAttendanceService.fetchMemberAttendance(memberId, query as any); }


  // SLA: STANDARD
  @Get("members/:memberId/payments")
  @ApiOperation({ summary: 'fetchMemberPayments for Manager members' })
  @ApiParam({ name: 'memberId', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: [MembersFetchMemberPaymentsResponseDto] })
  fetchMemberPayments(@Param('memberId') memberId: string, @Query() query: MembersQueryDto): ReturnType<MembersFetchMemberPaymentsService['fetchMemberPayments']> { return this.fetchMemberPaymentsService.fetchMemberPayments(memberId, query as any); }


  // SLA: STANDARD
  @Get("members/:id")
  @ApiOperation({ summary: 'fetchMemberById for Manager members' })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: MembersFetchMemberByIdResponseDto })
  fetchMemberById(@Param('id') id: string, @Query() query: MembersQueryDto): ReturnType<MembersFetchMemberByIdService['fetchMemberById']> { return this.fetchMemberByIdService.fetchMemberById(id, query as any); }


}
