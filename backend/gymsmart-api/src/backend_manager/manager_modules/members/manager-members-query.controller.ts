// RESPONSIBILITY: Owns the backend application HTTP controller boundary.
// FLOW: HTTP request → guards/decorators → DTO validation → feature service → canonical response envelope.
import { Controller, Get, HttpStatus, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ManagerCoreAuthorizeResourceParam } from '@/backend_manager/manager_core/manager_core_authorization/manager-core-authorize-resource.decorator';
import { ManagerCoreExposeSensitiveFields } from '@/backend_manager/manager_core/manager_core_http/manager-core-sensitive-fields.decorator';

import { ManagerCoreRole } from '@/backend_manager/manager_core/manager_core_auth/manager-core-role.constants';
import { Roles } from '@/backend_manager/manager_core/manager_core_auth/manager-core-roles.decorator';

import { ManagerMembersExportMembersReportResponseDto } from '@/backend_manager/manager_modules/members/members_responses/manager-members-export-members-report.response.dto';
import { ManagerMembersFetchMemberAttendanceResponseDto } from '@/backend_manager/manager_modules/members/members_responses/manager-members-fetch-member-attendance.response.dto';
import { ManagerMembersFetchMemberByIdResponseDto } from '@/backend_manager/manager_modules/members/members_responses/manager-members-fetch-member-by-id.response.dto';
import { ManagerMembersFetchMemberDietPlansResponseDto } from '@/backend_manager/manager_modules/members/members_responses/manager-members-fetch-member-diet-plans.response.dto';
import { ManagerMembersFetchMemberPaymentsResponseDto } from '@/backend_manager/manager_modules/members/members_responses/manager-members-fetch-member-payments.response.dto';
import { ManagerMembersFetchMemberPlansResponseDto } from '@/backend_manager/manager_modules/members/members_responses/manager-members-fetch-member-plans.response.dto';
import { ManagerMembersFetchMemberStatsResponseDto } from '@/backend_manager/manager_modules/members/members_responses/manager-members-fetch-member-stats.response.dto';
import { ManagerMembersFetchMemberTrainersResponseDto } from '@/backend_manager/manager_modules/members/members_responses/manager-members-fetch-member-trainers.response.dto';
import { ManagerMembersFetchMemberWorkoutsResponseDto } from '@/backend_manager/manager_modules/members/members_responses/manager-members-fetch-member-workouts.response.dto';
import { ManagerMembersFetchMembersResponseDto } from '@/backend_manager/manager_modules/members/members_responses/manager-members-fetch-members.response.dto';
import { ManagerMembersQueryDto } from '@/backend_manager/manager_modules/members/members_dtos/manager-members-query.dto';
import { ManagerMembersExportMembersReportService } from '@/backend_manager/manager_modules/members/members_services/manager-members-export-members-report.service';
import { ManagerMembersFindMemberAttendanceService } from '@/backend_manager/manager_modules/members/members_services/manager-members-find-member-attendance.service';
import { ManagerMembersFindMemberByIdService } from '@/backend_manager/manager_modules/members/members_services/manager-members-find-member-by-id.service';
import { ManagerMembersFindMemberDietPlansService } from '@/backend_manager/manager_modules/members/members_services/manager-members-find-member-diet-plans.service';
import { ManagerMembersFindMemberPaymentsService } from '@/backend_manager/manager_modules/members/members_services/manager-members-find-member-payments.service';
import { ManagerMembersFindMemberPlansService } from '@/backend_manager/manager_modules/members/members_services/manager-members-find-member-plans.service';
import { ManagerMembersFindMemberStatsService } from '@/backend_manager/manager_modules/members/members_services/manager-members-find-member-stats.service';
import { ManagerMembersFindMemberTrainersService } from '@/backend_manager/manager_modules/members/members_services/manager-members-find-member-trainers.service';
import { ManagerMembersFindMemberWorkoutsService } from '@/backend_manager/manager_modules/members/members_services/manager-members-find-member-workouts.service';
import { ManagerMembersFindMembersService } from '@/backend_manager/manager_modules/members/members_services/manager-members-find-members.service';

@Controller('manager')
@ApiTags('Manager members')
@Roles(ManagerCoreRole.MANAGER)
@ManagerCoreExposeSensitiveFields('aadhaar', 'medicalHistory')
export class ManagerMembersQueryController {
  constructor(private readonly fetchMembersService: ManagerMembersFindMembersService, private readonly fetchMemberByIdService: ManagerMembersFindMemberByIdService, private readonly fetchMemberStatsService: ManagerMembersFindMemberStatsService, private readonly exportMembersReportService: ManagerMembersExportMembersReportService, private readonly fetchMemberTrainersService: ManagerMembersFindMemberTrainersService, private readonly fetchMemberPlansService: ManagerMembersFindMemberPlansService, private readonly fetchMemberPaymentsService: ManagerMembersFindMemberPaymentsService, private readonly fetchMemberAttendanceService: ManagerMembersFindMemberAttendanceService, private readonly fetchMemberDietPlansService: ManagerMembersFindMemberDietPlansService, private readonly fetchMemberWorkoutsService: ManagerMembersFindMemberWorkoutsService) {}

  // SLA: STANDARD
  @Get("members/diet-plans")
  @ApiOperation({ summary: 'findMemberDietPlans for Manager members' })
  @ApiResponse({ status: HttpStatus.OK, type: [ManagerMembersFetchMemberDietPlansResponseDto] })
  findMemberDietPlans(@Query() query: ManagerMembersQueryDto): ReturnType<ManagerMembersFindMemberDietPlansService['findMemberDietPlans']> { return this.fetchMemberDietPlansService.findMemberDietPlans(query); }


  // SLA: STANDARD
  @Get("members/export")
  @ApiOperation({ summary: 'createMemberReportExport for Manager members' })
  @ApiResponse({ status: HttpStatus.OK, type: ManagerMembersExportMembersReportResponseDto })
  createMemberReportExport(@Query() query: ManagerMembersQueryDto): ReturnType<ManagerMembersExportMembersReportService['createMemberReportExport']> { return this.exportMembersReportService.createMemberReportExport(query); }


  // SLA: STANDARD
  @Get("members/plans")
  @ApiOperation({ summary: 'findMemberPlans for Manager members' })
  @ApiResponse({ status: HttpStatus.OK, type: [ManagerMembersFetchMemberPlansResponseDto] })
  findMemberPlans(@Query() query: ManagerMembersQueryDto): ReturnType<ManagerMembersFindMemberPlansService['findMemberPlans']> { return this.fetchMemberPlansService.findMemberPlans(query); }


  // SLA: FAST
  @Get("members/stats")
  @ApiOperation({ summary: 'findMemberStats for Manager members' })
  @ApiResponse({ status: HttpStatus.OK, type: ManagerMembersFetchMemberStatsResponseDto })
  findMemberStats(@Query() query: ManagerMembersQueryDto): ReturnType<ManagerMembersFindMemberStatsService['findMemberStats']> { return this.fetchMemberStatsService.findMemberStats(query); }


  // SLA: STANDARD
  @Get("members/trainers")
  @ApiOperation({ summary: 'findMemberTrainers for Manager members' })
  @ApiResponse({ status: HttpStatus.OK, type: ManagerMembersFetchMemberTrainersResponseDto })
  findMemberTrainers(@Query() query: ManagerMembersQueryDto): ReturnType<ManagerMembersFindMemberTrainersService['findMemberTrainers']> { return this.fetchMemberTrainersService.findMemberTrainers(query); }


  // SLA: STANDARD
  @Get("members/workouts")
  @ApiOperation({ summary: 'findMemberWorkouts for Manager members' })
  @ApiResponse({ status: HttpStatus.OK, type: [ManagerMembersFetchMemberWorkoutsResponseDto] })
  findMemberWorkouts(@Query() query: ManagerMembersQueryDto): ReturnType<ManagerMembersFindMemberWorkoutsService['findMemberWorkouts']> { return this.fetchMemberWorkoutsService.findMemberWorkouts(query); }


  // SLA: STANDARD
  @Get("members")
  @ApiOperation({ summary: 'findMembers for Manager members' })
  @ApiResponse({ status: HttpStatus.OK, type: ManagerMembersFetchMembersResponseDto })
  findMembers(@Query() query: ManagerMembersQueryDto): ReturnType<ManagerMembersFindMembersService['findMembers']> { return this.fetchMembersService.findMembers(query); }


  // SLA: STANDARD
  @Get("members/:memberId/attendance")
  @ApiOperation({ summary: 'findMemberAttendance for Manager members' })
  @ApiParam({ name: 'memberId', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: [ManagerMembersFetchMemberAttendanceResponseDto] })
  @ManagerCoreAuthorizeResourceParam('memberId')
  findMemberAttendance(@Param('memberId') memberId: string, @Query() query: ManagerMembersQueryDto): ReturnType<ManagerMembersFindMemberAttendanceService['findMemberAttendance']> { return this.fetchMemberAttendanceService.findMemberAttendance(memberId, query); }


  // SLA: STANDARD
  @Get("members/:memberId/payments")
  @ApiOperation({ summary: 'findMemberPayments for Manager members' })
  @ApiParam({ name: 'memberId', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: [ManagerMembersFetchMemberPaymentsResponseDto] })
  @ManagerCoreAuthorizeResourceParam('memberId')
  findMemberPayments(@Param('memberId') memberId: string, @Query() query: ManagerMembersQueryDto): ReturnType<ManagerMembersFindMemberPaymentsService['findMemberPayments']> { return this.fetchMemberPaymentsService.findMemberPayments(memberId, query); }


  // SLA: STANDARD
  @Get("members/:id")
  @ApiOperation({ summary: 'findMemberById for Manager members' })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: ManagerMembersFetchMemberByIdResponseDto })
  @ManagerCoreAuthorizeResourceParam('id')
  findMemberById(@Param('id') id: string, @Query() query: ManagerMembersQueryDto): ReturnType<ManagerMembersFindMemberByIdService['findMemberById']> { return this.fetchMemberByIdService.findMemberById(id, query); }


}

export { ManagerMembersQueryController as MembersQueryController };
