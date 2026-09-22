// RESPONSIBILITY: Owns the Manager members query/read HTTP boundary; contains no business logic or direct ORM access.
// FLOW: HTTP request -> DTO/query validation -> feature use-case service -> repository/domain -> canonical response.
import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CoreRole } from '@/core/auth/core-role.constants';
import { Roles } from '@/core/auth/core-roles.decorator';
import { MembersExportMembersReportResponseDto } from '@/modules/manager/members/dtos/members-export-members-report.response.dto';
import { MembersExportMembersReportService } from '@/modules/manager/members/services/members-export-members-report.service';
import { MembersFetchMemberAttendanceResponseDto } from '@/modules/manager/members/dtos/members-fetch-member-attendance.response.dto';
import { MembersFetchMemberAttendanceService } from '@/modules/manager/members/services/members-fetch-member-attendance.service';
import { MembersFetchMemberByIdResponseDto } from '@/modules/manager/members/dtos/members-fetch-member-by-id.response.dto';
import { MembersFetchMemberByIdService } from '@/modules/manager/members/services/members-fetch-member-by-id.service';
import { MembersFetchMemberDietPlansResponseDto } from '@/modules/manager/members/dtos/members-fetch-member-diet-plans.response.dto';
import { MembersFetchMemberDietPlansService } from '@/modules/manager/members/services/members-fetch-member-diet-plans.service';
import { MembersFetchMemberPaymentsResponseDto } from '@/modules/manager/members/dtos/members-fetch-member-payments.response.dto';
import { MembersFetchMemberPaymentsService } from '@/modules/manager/members/services/members-fetch-member-payments.service';
import { MembersFetchMemberPlansResponseDto } from '@/modules/manager/members/dtos/members-fetch-member-plans.response.dto';
import { MembersFetchMemberPlansService } from '@/modules/manager/members/services/members-fetch-member-plans.service';
import { MembersFetchMemberStatsResponseDto } from '@/modules/manager/members/dtos/members-fetch-member-stats.response.dto';
import { MembersFetchMemberStatsService } from '@/modules/manager/members/services/members-fetch-member-stats.service';
import { MembersFetchMemberTrainersResponseDto } from '@/modules/manager/members/dtos/members-fetch-member-trainers.response.dto';
import { MembersFetchMemberTrainersService } from '@/modules/manager/members/services/members-fetch-member-trainers.service';
import { MembersFetchMemberWorkoutsResponseDto } from '@/modules/manager/members/dtos/members-fetch-member-workouts.response.dto';
import { MembersFetchMemberWorkoutsService } from '@/modules/manager/members/services/members-fetch-member-workouts.service';
import { MembersFetchMembersResponseDto } from '@/modules/manager/members/dtos/members-fetch-members.response.dto';
import { MembersFetchMembersService } from '@/modules/manager/members/services/members-fetch-members.service';
import { MembersQueryDto } from '@/modules/manager/members/dtos/members-query.dto';

@Controller('manager')
@ApiTags('Manager members')
@Roles(CoreRole.MANAGER)
export class MembersQueryController {
  constructor(private readonly fetchMembersService: MembersFetchMembersService, private readonly fetchMemberByIdService: MembersFetchMemberByIdService, private readonly fetchMemberStatsService: MembersFetchMemberStatsService, private readonly exportMembersReportService: MembersExportMembersReportService, private readonly fetchMemberTrainersService: MembersFetchMemberTrainersService, private readonly fetchMemberPlansService: MembersFetchMemberPlansService, private readonly fetchMemberPaymentsService: MembersFetchMemberPaymentsService, private readonly fetchMemberAttendanceService: MembersFetchMemberAttendanceService, private readonly fetchMemberDietPlansService: MembersFetchMemberDietPlansService, private readonly fetchMemberWorkoutsService: MembersFetchMemberWorkoutsService) {}

  // SLA: STANDARD
  @Get("members/diet-plans")
  @ApiOperation({ summary: 'fetchMemberDietPlans for Manager members' })
  @ApiResponse({ status: HttpStatus.OK, type: [MembersFetchMemberDietPlansResponseDto] })
  fetchMemberDietPlans(@Query() query: MembersQueryDto): Promise<MembersFetchMemberDietPlansResponseDto[]> {  return this.fetchMemberDietPlansService.fetchMemberDietPlans(query) as Promise<MembersFetchMemberDietPlansResponseDto[]>;  }


  // SLA: STANDARD
  @Get("members/export")
  @ApiOperation({ summary: 'exportMembersReport for Manager members' })
  @ApiResponse({ status: HttpStatus.OK, type: MembersExportMembersReportResponseDto })
  exportMembersReport(@Query() query: MembersQueryDto): Promise<MembersExportMembersReportResponseDto> {  return this.exportMembersReportService.exportMembersReport(query) as Promise<MembersExportMembersReportResponseDto>;  }


  // SLA: STANDARD
  @Get("members/plans")
  @ApiOperation({ summary: 'fetchMemberPlans for Manager members' })
  @ApiResponse({ status: HttpStatus.OK, type: [MembersFetchMemberPlansResponseDto] })
  fetchMemberPlans(@Query() query: MembersQueryDto): Promise<MembersFetchMemberPlansResponseDto[]> {  return this.fetchMemberPlansService.fetchMemberPlans(query) as Promise<MembersFetchMemberPlansResponseDto[]>;  }


  // SLA: FAST
  @Get("members/stats")
  @ApiOperation({ summary: 'fetchMemberStats for Manager members' })
  @ApiResponse({ status: HttpStatus.OK, type: MembersFetchMemberStatsResponseDto })
  fetchMemberStats(@Query() query: MembersQueryDto): Promise<MembersFetchMemberStatsResponseDto> {  return this.fetchMemberStatsService.fetchMemberStats(query) as Promise<MembersFetchMemberStatsResponseDto>;  }


  // SLA: STANDARD
  @Get("members/trainers")
  @ApiOperation({ summary: 'fetchMemberTrainers for Manager members' })
  @ApiResponse({ status: HttpStatus.OK, type: MembersFetchMemberTrainersResponseDto })
  fetchMemberTrainers(@Query() query: MembersQueryDto): Promise<MembersFetchMemberTrainersResponseDto> {  return this.fetchMemberTrainersService.fetchMemberTrainers(query) as Promise<MembersFetchMemberTrainersResponseDto>;  }


  // SLA: STANDARD
  @Get("members/workouts")
  @ApiOperation({ summary: 'fetchMemberWorkouts for Manager members' })
  @ApiResponse({ status: HttpStatus.OK, type: [MembersFetchMemberWorkoutsResponseDto] })
  fetchMemberWorkouts(@Query() query: MembersQueryDto): Promise<MembersFetchMemberWorkoutsResponseDto[]> {  return this.fetchMemberWorkoutsService.fetchMemberWorkouts(query) as Promise<MembersFetchMemberWorkoutsResponseDto[]>;  }


  // SLA: STANDARD
  @Get("members")
  @ApiOperation({ summary: 'fetchMembers for Manager members' })
  @ApiResponse({ status: HttpStatus.OK, type: MembersFetchMembersResponseDto })
  fetchMembers(@Query() query: MembersQueryDto): Promise<MembersFetchMembersResponseDto> {  return this.fetchMembersService.fetchMembers(query) as Promise<MembersFetchMembersResponseDto>;  }


  // SLA: STANDARD
  @Get("members/:memberId/attendance")
  @ApiOperation({ summary: 'fetchMemberAttendance for Manager members' })
  @ApiParam({ name: 'memberId', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: [MembersFetchMemberAttendanceResponseDto] })
  fetchMemberAttendance(@Param('memberId') memberId: string, @Query() query: MembersQueryDto): Promise<MembersFetchMemberAttendanceResponseDto[]> {  return this.fetchMemberAttendanceService.fetchMemberAttendance(memberId, query) as Promise<MembersFetchMemberAttendanceResponseDto[]>;  }


  // SLA: STANDARD
  @Get("members/:memberId/payments")
  @ApiOperation({ summary: 'fetchMemberPayments for Manager members' })
  @ApiParam({ name: 'memberId', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: [MembersFetchMemberPaymentsResponseDto] })
  fetchMemberPayments(@Param('memberId') memberId: string, @Query() query: MembersQueryDto): Promise<MembersFetchMemberPaymentsResponseDto[]> {  return this.fetchMemberPaymentsService.fetchMemberPayments(memberId, query) as Promise<MembersFetchMemberPaymentsResponseDto[]>;  }


  // SLA: STANDARD
  @Get("members/:id")
  @ApiOperation({ summary: 'fetchMemberById for Manager members' })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: MembersFetchMemberByIdResponseDto })
  fetchMemberById(@Param('id') id: string, @Query() query: MembersQueryDto): Promise<MembersFetchMemberByIdResponseDto> {  return this.fetchMemberByIdService.fetchMemberById(id, query) as Promise<MembersFetchMemberByIdResponseDto>;  }


}
