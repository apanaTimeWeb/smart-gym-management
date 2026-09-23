// RESPONSIBILITY: Owns the backend application HTTP controller boundary.
// FLOW: HTTP request → guards/decorators → DTO validation → feature service → canonical response envelope.
import { Body, Controller, Delete, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CoreRole } from '@/backend_manager/core/auth/core-role.constants';
import { Roles } from '@/backend_manager/core/auth/core-roles.decorator';
import { CoreRequireIdempotencyKey } from '@/backend_manager/core/idempotency/core-require-idempotency-key.decorator';

import { MembersAddMemberPaymentRequestDto } from '@/backend_manager/modules/backend_manager/members/dtos/members-add-member-payment.request.dto';
import { MembersAddMemberPaymentResponseDto } from '@/backend_manager/modules/backend_manager/members/dtos/members-add-member-payment.response.dto';
import { MembersAssignDietPlanRequestDto } from '@/backend_manager/modules/backend_manager/members/dtos/members-assign-diet-plan.request.dto';
import { MembersAssignDietPlanResponseDto } from '@/backend_manager/modules/backend_manager/members/dtos/members-assign-diet-plan.response.dto';
import { MembersAssignWorkoutRequestDto } from '@/backend_manager/modules/backend_manager/members/dtos/members-assign-workout.request.dto';
import { MembersAssignWorkoutResponseDto } from '@/backend_manager/modules/backend_manager/members/dtos/members-assign-workout.response.dto';
import { MembersCreateMemberRequestDto } from '@/backend_manager/modules/backend_manager/members/dtos/members-create-member.request.dto';
import { MembersCreateMemberResponseDto } from '@/backend_manager/modules/backend_manager/members/dtos/members-create-member.response.dto';
import { MembersDeleteMemberResponseDto } from '@/backend_manager/modules/backend_manager/members/dtos/members-delete-member.response.dto';
import { MembersRenewMemberRequestDto } from '@/backend_manager/modules/backend_manager/members/dtos/members-renew-member.request.dto';
import { MembersRenewMemberResponseDto } from '@/backend_manager/modules/backend_manager/members/dtos/members-renew-member.response.dto';
import { MembersUpdateMemberRequestDto } from '@/backend_manager/modules/backend_manager/members/dtos/members-update-member.request.dto';
import { MembersUpdateMemberResponseDto } from '@/backend_manager/modules/backend_manager/members/dtos/members-update-member.response.dto';
import { MembersAddMemberPaymentService } from '@/backend_manager/modules/backend_manager/members/services/members-add-member-payment.service';
import { MembersAssignDietPlanService } from '@/backend_manager/modules/backend_manager/members/services/members-assign-diet-plan.service';
import { MembersAssignWorkoutService } from '@/backend_manager/modules/backend_manager/members/services/members-assign-workout.service';
import { MembersCreateMemberService } from '@/backend_manager/modules/backend_manager/members/services/members-create-member.service';
import { MembersDeleteMemberService } from '@/backend_manager/modules/backend_manager/members/services/members-delete-member.service';
import { MembersRenewMemberService } from '@/backend_manager/modules/backend_manager/members/services/members-renew-member.service';
import { MembersUpdateMemberService } from '@/backend_manager/modules/backend_manager/members/services/members-update-member.service';

@Controller('manager')
@ApiTags('Manager members')
@Roles(CoreRole.MANAGER)
export class MembersCommandController {
  constructor(private readonly createMemberService: MembersCreateMemberService, private readonly updateMemberService: MembersUpdateMemberService, private readonly deleteMemberService: MembersDeleteMemberService, private readonly renewMemberService: MembersRenewMemberService, private readonly addMemberPaymentService: MembersAddMemberPaymentService, private readonly assignDietPlanService: MembersAssignDietPlanService, private readonly assignWorkoutService: MembersAssignWorkoutService) {}

  // SLA: STANDARD
  @CoreRequireIdempotencyKey()
  @Post("members")
  @ApiOperation({ summary: 'createMember for Manager members' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiResponse({ status: HttpStatus.CREATED, type: MembersCreateMemberResponseDto })
  createMember(@Body() dto: MembersCreateMemberRequestDto): ReturnType<MembersCreateMemberService['createMember']> { return this.createMemberService.createMember(dto as any); }


  // SLA: STANDARD
  @CoreRequireIdempotencyKey()
  @Post("members/:id/renew")
  @ApiOperation({ summary: 'renewMember for Manager members' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: HttpStatus.CREATED, type: MembersRenewMemberResponseDto })
  renewMember(@Param('id') id: string, @Body() dto: MembersRenewMemberRequestDto): ReturnType<MembersRenewMemberService['renewMember']> { return this.renewMemberService.renewMember(dto as any, id); }


  // SLA: STANDARD
  @CoreRequireIdempotencyKey()
  @Post("members/:memberId/diet-plans")
  @ApiOperation({ summary: 'assignDietPlan for Manager members' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiParam({ name: 'memberId', required: true })
  @ApiResponse({ status: HttpStatus.CREATED, type: MembersAssignDietPlanResponseDto })
  assignDietPlan(@Param('memberId') memberId: string, @Body() dto: MembersAssignDietPlanRequestDto): ReturnType<MembersAssignDietPlanService['assignMemberDietPlan']> { return this.assignDietPlanService.assignMemberDietPlan(dto as any, memberId); }


  // SLA: STANDARD
  @CoreRequireIdempotencyKey()
  @Post("members/:memberId/payments")
  @ApiOperation({ summary: 'addMemberPayment for Manager members' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiParam({ name: 'memberId', required: true })
  @ApiResponse({ status: HttpStatus.CREATED, type: MembersAddMemberPaymentResponseDto })
  addMemberPayment(@Param('memberId') memberId: string, @Body() dto: MembersAddMemberPaymentRequestDto): ReturnType<MembersAddMemberPaymentService['createMemberPayment']> { return this.addMemberPaymentService.createMemberPayment(dto as any, memberId); }


  // SLA: STANDARD
  @CoreRequireIdempotencyKey()
  @Post("members/:memberId/workouts")
  @ApiOperation({ summary: 'assignWorkout for Manager members' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiParam({ name: 'memberId', required: true })
  @ApiResponse({ status: HttpStatus.CREATED, type: MembersAssignWorkoutResponseDto })
  assignWorkout(@Param('memberId') memberId: string, @Body() dto: MembersAssignWorkoutRequestDto): ReturnType<MembersAssignWorkoutService['assignMemberWorkout']> { return this.assignWorkoutService.assignMemberWorkout(dto as any, memberId); }


  // SLA: STANDARD
  @CoreRequireIdempotencyKey()
  @Patch("members/:id")
  @ApiOperation({ summary: 'updateMember for Manager members' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: MembersUpdateMemberResponseDto })
  updateMember(@Param('id') id: string, @Body() dto: MembersUpdateMemberRequestDto): ReturnType<MembersUpdateMemberService['updateMember']> { return this.updateMemberService.updateMember(dto as any, id); }


  // SLA: STANDARD
  @CoreRequireIdempotencyKey()
  @Delete("members/:id")
  @ApiOperation({ summary: 'deleteMember for Manager members' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: MembersDeleteMemberResponseDto })
  deleteMember(@Param('id') id: string): ReturnType<MembersDeleteMemberService['deleteMember']> {  return this.deleteMemberService.deleteMember(id); }


}
