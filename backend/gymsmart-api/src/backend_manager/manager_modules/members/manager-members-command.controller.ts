// RESPONSIBILITY: Owns the backend application HTTP controller boundary.
// FLOW: HTTP request → guards/decorators → DTO validation → feature service → canonical response envelope.
import { Body, Controller, Delete, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ManagerCoreAuthorizeResourceParam } from '@/backend_manager/manager_core/manager_core_authorization/manager-core-authorize-resource.decorator';

import { ManagerCoreRole } from '@/backend_manager/manager_core/manager_core_auth/manager-core-role.constants';
import { Roles } from '@/backend_manager/manager_core/manager_core_auth/manager-core-roles.decorator';
import { RequireIdempotencyKey } from '@/backend_manager/manager_core/manager_core_idempotency/manager-core-require-idempotency-key.decorator';

import { ManagerMembersAddMemberPaymentRequestDto } from '@/backend_manager/manager_modules/members/members_dtos/manager-members-add-member-payment.request.dto';
import { ManagerMembersAddMemberPaymentResponseDto } from '@/backend_manager/manager_modules/members/members_responses/manager-members-add-member-payment.response.dto';
import { ManagerMembersAssignDietPlanRequestDto } from '@/backend_manager/manager_modules/members/members_dtos/manager-members-assign-diet-plan.request.dto';
import { ManagerMembersAssignDietPlanResponseDto } from '@/backend_manager/manager_modules/members/members_responses/manager-members-assign-diet-plan.response.dto';
import { ManagerMembersAssignWorkoutRequestDto } from '@/backend_manager/manager_modules/members/members_dtos/manager-members-assign-workout.request.dto';
import { ManagerMembersAssignWorkoutResponseDto } from '@/backend_manager/manager_modules/members/members_responses/manager-members-assign-workout.response.dto';
import { ManagerMembersCreateMemberRequestDto } from '@/backend_manager/manager_modules/members/members_dtos/manager-members-create-member.request.dto';
import { ManagerMembersCreateMemberResponseDto } from '@/backend_manager/manager_modules/members/members_responses/manager-members-create-member.response.dto';
import { ManagerMembersDeleteMemberResponseDto } from '@/backend_manager/manager_modules/members/members_responses/manager-members-delete-member.response.dto';
import { ManagerMembersRenewMemberRequestDto } from '@/backend_manager/manager_modules/members/members_dtos/manager-members-renew-member.request.dto';
import { ManagerMembersRenewMemberResponseDto } from '@/backend_manager/manager_modules/members/members_responses/manager-members-renew-member.response.dto';
import { ManagerMembersUpdateMemberRequestDto } from '@/backend_manager/manager_modules/members/members_dtos/manager-members-update-member.request.dto';
import { ManagerMembersUpdateMemberResponseDto } from '@/backend_manager/manager_modules/members/members_responses/manager-members-update-member.response.dto';
import { ManagerMembersAddMemberPaymentService } from '@/backend_manager/manager_modules/members/members_services/manager-members-add-member-payment.service';
import { ManagerMembersAssignDietPlanService } from '@/backend_manager/manager_modules/members/members_services/manager-members-assign-diet-plan.service';
import { ManagerMembersAssignWorkoutService } from '@/backend_manager/manager_modules/members/members_services/manager-members-assign-workout.service';
import { ManagerMembersCreateMemberService } from '@/backend_manager/manager_modules/members/members_services/manager-members-create-member.service';
import { ManagerMembersDeleteMemberService } from '@/backend_manager/manager_modules/members/members_services/manager-members-delete-member.service';
import { ManagerMembersRenewMemberService } from '@/backend_manager/manager_modules/members/members_services/manager-members-renew-member.service';
import { ManagerMembersUpdateMemberService } from '@/backend_manager/manager_modules/members/members_services/manager-members-update-member.service';

@Controller('manager')
@ApiTags('Manager members')
@Roles(ManagerCoreRole.MANAGER)
export class ManagerMembersCommandController {
  constructor(private readonly createMemberService: ManagerMembersCreateMemberService, private readonly updateMemberService: ManagerMembersUpdateMemberService, private readonly deleteMemberService: ManagerMembersDeleteMemberService, private readonly renewMemberService: ManagerMembersRenewMemberService, private readonly addMemberPaymentService: ManagerMembersAddMemberPaymentService, private readonly assignDietPlanService: ManagerMembersAssignDietPlanService, private readonly assignWorkoutService: ManagerMembersAssignWorkoutService) {}

  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post("members")
  @ApiOperation({ summary: 'createMember for Manager members' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiResponse({ status: HttpStatus.CREATED, type: ManagerMembersCreateMemberResponseDto })
  createMember(@Body() dto: ManagerMembersCreateMemberRequestDto): ReturnType<ManagerMembersCreateMemberService['createMember']> { return this.createMemberService.createMember(dto); }


  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post("members/:id/renew")
  @ApiOperation({ summary: 'renewMember for Manager members' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: HttpStatus.CREATED, type: ManagerMembersRenewMemberResponseDto })
  @ManagerCoreAuthorizeResourceParam('id')
  renewMember(@Param('id') id: string, @Body() dto: ManagerMembersRenewMemberRequestDto): ReturnType<ManagerMembersRenewMemberService['updateMember']> { return this.renewMemberService.updateMember(dto, id); }


  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post("members/:memberId/diet-plans")
  @ApiOperation({ summary: 'assignDietPlan for Manager members' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiParam({ name: 'memberId', required: true })
  @ApiResponse({ status: HttpStatus.CREATED, type: ManagerMembersAssignDietPlanResponseDto })
  @ManagerCoreAuthorizeResourceParam('memberId')
  assignDietPlan(@Param('memberId') memberId: string, @Body() dto: ManagerMembersAssignDietPlanRequestDto): ReturnType<ManagerMembersAssignDietPlanService['assignDietPlan']> { return this.assignDietPlanService.assignDietPlan(dto, memberId); }


  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post("members/:memberId/payments")
  @ApiOperation({ summary: 'createMemberPayment for Manager members' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiParam({ name: 'memberId', required: true })
  @ApiResponse({ status: HttpStatus.CREATED, type: ManagerMembersAddMemberPaymentResponseDto })
  @ManagerCoreAuthorizeResourceParam('memberId')
  createMemberPayment(@Param('memberId') memberId: string, @Body() dto: ManagerMembersAddMemberPaymentRequestDto): ReturnType<ManagerMembersAddMemberPaymentService['createMemberPayment']> { return this.addMemberPaymentService.createMemberPayment(dto, memberId); }


  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post("members/:memberId/workouts")
  @ApiOperation({ summary: 'assignWorkout for Manager members' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiParam({ name: 'memberId', required: true })
  @ApiResponse({ status: HttpStatus.CREATED, type: ManagerMembersAssignWorkoutResponseDto })
  @ManagerCoreAuthorizeResourceParam('memberId')
  assignWorkout(@Param('memberId') memberId: string, @Body() dto: ManagerMembersAssignWorkoutRequestDto): ReturnType<ManagerMembersAssignWorkoutService['assignWorkout']> { return this.assignWorkoutService.assignWorkout(dto, memberId); }


  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Patch("members/:id")
  @ApiOperation({ summary: 'updateMember for Manager members' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: ManagerMembersUpdateMemberResponseDto })
  @ManagerCoreAuthorizeResourceParam('id')
  updateMember(@Param('id') id: string, @Body() dto: ManagerMembersUpdateMemberRequestDto): ReturnType<ManagerMembersUpdateMemberService['updateMember']> { return this.updateMemberService.updateMember(dto, id); }


  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Delete("members/:id")
  @ApiOperation({ summary: 'deleteMember for Manager members' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: ManagerMembersDeleteMemberResponseDto })
  @ManagerCoreAuthorizeResourceParam('id')
  deleteMember(@Param('id') id: string): ReturnType<ManagerMembersDeleteMemberService['deleteMember']> {  return this.deleteMemberService.deleteMember(id); }


}

export { ManagerMembersCommandController as MembersCommandController };
