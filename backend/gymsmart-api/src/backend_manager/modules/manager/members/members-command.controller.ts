// RESPONSIBILITY: Owns the Manager members command/write HTTP boundary; contains no business logic or direct ORM access.
// FLOW: HTTP request -> DTO/query validation -> feature use-case service -> repository/domain -> canonical response.
import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CoreRole } from '@/core/auth/core-role.constants';
import { Roles } from '@/core/auth/core-roles.decorator';
import { MembersAddMemberPaymentRequestDto } from '@/modules/manager/members/dtos/members-add-member-payment.request.dto';
import { MembersAddMemberPaymentResponseDto } from '@/modules/manager/members/dtos/members-add-member-payment.response.dto';
import { MembersAddMemberPaymentService } from '@/modules/manager/members/services/members-add-member-payment.service';
import { MembersAssignDietPlanRequestDto } from '@/modules/manager/members/dtos/members-assign-diet-plan.request.dto';
import { MembersAssignDietPlanResponseDto } from '@/modules/manager/members/dtos/members-assign-diet-plan.response.dto';
import { MembersAssignDietPlanService } from '@/modules/manager/members/services/members-assign-diet-plan.service';
import { MembersAssignWorkoutRequestDto } from '@/modules/manager/members/dtos/members-assign-workout.request.dto';
import { MembersAssignWorkoutResponseDto } from '@/modules/manager/members/dtos/members-assign-workout.response.dto';
import { MembersAssignWorkoutService } from '@/modules/manager/members/services/members-assign-workout.service';
import { MembersCreateMemberRequestDto } from '@/modules/manager/members/dtos/members-create-member.request.dto';
import { MembersCreateMemberResponseDto } from '@/modules/manager/members/dtos/members-create-member.response.dto';
import { MembersCreateMemberService } from '@/modules/manager/members/services/members-create-member.service';
import { MembersDeleteMemberResponseDto } from '@/modules/manager/members/dtos/members-delete-member.response.dto';
import { MembersDeleteMemberService } from '@/modules/manager/members/services/members-delete-member.service';
import { MembersQueryDto } from '@/modules/manager/members/dtos/members-query.dto';
import { MembersRenewMemberRequestDto } from '@/modules/manager/members/dtos/members-renew-member.request.dto';
import { MembersRenewMemberResponseDto } from '@/modules/manager/members/dtos/members-renew-member.response.dto';
import { MembersRenewMemberService } from '@/modules/manager/members/services/members-renew-member.service';
import { MembersUpdateMemberRequestDto } from '@/modules/manager/members/dtos/members-update-member.request.dto';
import { MembersUpdateMemberResponseDto } from '@/modules/manager/members/dtos/members-update-member.response.dto';
import { MembersUpdateMemberService } from '@/modules/manager/members/services/members-update-member.service';

@Controller('manager')
@ApiTags('Manager members')
@Roles(CoreRole.MANAGER)
export class MembersCommandController {
  constructor(private readonly createMemberService: MembersCreateMemberService, private readonly updateMemberService: MembersUpdateMemberService, private readonly deleteMemberService: MembersDeleteMemberService, private readonly renewMemberService: MembersRenewMemberService, private readonly addMemberPaymentService: MembersAddMemberPaymentService, private readonly assignDietPlanService: MembersAssignDietPlanService, private readonly assignWorkoutService: MembersAssignWorkoutService) {}

  // SLA: STANDARD
  @Post("members")
  @ApiOperation({ summary: 'createMember for Manager members' })
  @ApiHeader({ name: 'Idempotency-Key', required: false })
  @ApiResponse({ status: HttpStatus.CREATED, type: MembersCreateMemberResponseDto })
  createMember(@Body() dto: MembersCreateMemberRequestDto): Promise<MembersCreateMemberResponseDto> {  return this.createMemberService.createMember(dto) as Promise<MembersCreateMemberResponseDto>;  }


  // SLA: STANDARD
  @Post("members/:id/renew")
  @ApiOperation({ summary: 'renewMember for Manager members' })
  @ApiHeader({ name: 'Idempotency-Key', required: false })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: HttpStatus.CREATED, type: MembersRenewMemberResponseDto })
  renewMember(@Param('id') id: string, @Body() dto: MembersRenewMemberRequestDto): Promise<MembersRenewMemberResponseDto> {  return this.renewMemberService.renewMember(dto, id) as Promise<MembersRenewMemberResponseDto>;  }


  // SLA: STANDARD
  @Post("members/:memberId/diet-plans")
  @ApiOperation({ summary: 'assignDietPlan for Manager members' })
  @ApiHeader({ name: 'Idempotency-Key', required: false })
  @ApiParam({ name: 'memberId', required: true })
  @ApiResponse({ status: HttpStatus.CREATED, type: MembersAssignDietPlanResponseDto })
  assignDietPlan(@Param('memberId') memberId: string, @Body() dto: MembersAssignDietPlanRequestDto): Promise<MembersAssignDietPlanResponseDto> {  return this.assignDietPlanService.assignDietPlan(dto, memberId) as Promise<MembersAssignDietPlanResponseDto>;  }


  // SLA: STANDARD
  @Post("members/:memberId/payments")
  @ApiOperation({ summary: 'addMemberPayment for Manager members' })
  @ApiHeader({ name: 'Idempotency-Key', required: false })
  @ApiParam({ name: 'memberId', required: true })
  @ApiResponse({ status: HttpStatus.CREATED, type: MembersAddMemberPaymentResponseDto })
  addMemberPayment(@Param('memberId') memberId: string, @Body() dto: MembersAddMemberPaymentRequestDto): Promise<MembersAddMemberPaymentResponseDto> {  return this.addMemberPaymentService.addMemberPayment(dto, memberId) as Promise<MembersAddMemberPaymentResponseDto>;  }


  // SLA: STANDARD
  @Post("members/:memberId/workouts")
  @ApiOperation({ summary: 'assignWorkout for Manager members' })
  @ApiHeader({ name: 'Idempotency-Key', required: false })
  @ApiParam({ name: 'memberId', required: true })
  @ApiResponse({ status: HttpStatus.CREATED, type: MembersAssignWorkoutResponseDto })
  assignWorkout(@Param('memberId') memberId: string, @Body() dto: MembersAssignWorkoutRequestDto): Promise<MembersAssignWorkoutResponseDto> {  return this.assignWorkoutService.assignWorkout(dto, memberId) as Promise<MembersAssignWorkoutResponseDto>;  }


  // SLA: STANDARD
  @Patch("members/:id")
  @ApiOperation({ summary: 'updateMember for Manager members' })
  @ApiHeader({ name: 'Idempotency-Key', required: false })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: MembersUpdateMemberResponseDto })
  updateMember(@Param('id') id: string, @Body() dto: MembersUpdateMemberRequestDto): Promise<MembersUpdateMemberResponseDto> {  return this.updateMemberService.updateMember(dto, id) as Promise<MembersUpdateMemberResponseDto>;  }


  // SLA: STANDARD
  @Delete("members/:id")
  @ApiOperation({ summary: 'deleteMember for Manager members' })
  @ApiHeader({ name: 'Idempotency-Key', required: false })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: MembersDeleteMemberResponseDto })
  deleteMember(@Param('id') id: string): Promise<MembersDeleteMemberResponseDto> {  return this.deleteMemberService.deleteMember(id); }


}
