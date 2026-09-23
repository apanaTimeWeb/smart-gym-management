// RESPONSIBILITY: Owns the backend application HTTP controller boundary.
// FLOW: HTTP request → guards/decorators → DTO validation → feature service → canonical response envelope.
import { Body, Controller, Delete, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CoreRole } from '@/backend_manager/core/auth/core-role.constants';
import { Roles } from '@/backend_manager/core/auth/core-roles.decorator';
import { CoreRequireIdempotencyKey } from '@/backend_manager/core/idempotency/core-require-idempotency-key.decorator';

import { PlansActivateMembershipRequestDto } from '@/backend_manager/modules/backend_manager/plans/dtos/plans-activate-membership.request.dto';
import { PlansActivateMembershipResponseDto } from '@/backend_manager/modules/backend_manager/plans/dtos/plans-activate-membership.response.dto';
import { PlansCreateChangeRequestRequestDto } from '@/backend_manager/modules/backend_manager/plans/dtos/plans-create-change-request.request.dto';
import { PlansCreateChangeRequestResponseDto } from '@/backend_manager/modules/backend_manager/plans/dtos/plans-create-change-request.response.dto';
import { PlansCreatePlanRequestDto } from '@/backend_manager/modules/backend_manager/plans/dtos/plans-create-plan.request.dto';
import { PlansCreatePlanResponseDto } from '@/backend_manager/modules/backend_manager/plans/dtos/plans-create-plan.response.dto';
import { PlansDeletePlanResponseDto } from '@/backend_manager/modules/backend_manager/plans/dtos/plans-delete-plan.response.dto';
import { PlansFreezeMembershipRequestDto } from '@/backend_manager/modules/backend_manager/plans/dtos/plans-freeze-membership.request.dto';
import { PlansFreezeMembershipResponseDto } from '@/backend_manager/modules/backend_manager/plans/dtos/plans-freeze-membership.response.dto';
import { PlansRenewMembershipRequestDto } from '@/backend_manager/modules/backend_manager/plans/dtos/plans-renew-membership.request.dto';
import { PlansRenewMembershipResponseDto } from '@/backend_manager/modules/backend_manager/plans/dtos/plans-renew-membership.response.dto';
import { PlansUpdatePlanRequestDto } from '@/backend_manager/modules/backend_manager/plans/dtos/plans-update-plan.request.dto';
import { PlansUpdatePlanResponseDto } from '@/backend_manager/modules/backend_manager/plans/dtos/plans-update-plan.response.dto';
import { PlansActivateMembershipService } from '@/backend_manager/modules/backend_manager/plans/services/plans-activate-membership.service';
import { PlansCreateChangeRequestService } from '@/backend_manager/modules/backend_manager/plans/services/plans-create-change-request.service';
import { PlansCreatePlanService } from '@/backend_manager/modules/backend_manager/plans/services/plans-create-plan.service';
import { PlansDeletePlanService } from '@/backend_manager/modules/backend_manager/plans/services/plans-delete-plan.service';
import { PlansFreezeMembershipService } from '@/backend_manager/modules/backend_manager/plans/services/plans-freeze-membership.service';
import { PlansRenewMembershipService } from '@/backend_manager/modules/backend_manager/plans/services/plans-renew-membership.service';
import { PlansUpdatePlanService } from '@/backend_manager/modules/backend_manager/plans/services/plans-update-plan.service';

@Controller('manager')
@ApiTags('Manager plans')
@Roles(CoreRole.MANAGER)
export class PlansCommandController {
  constructor(private readonly createPlanService: PlansCreatePlanService, private readonly updatePlanService: PlansUpdatePlanService, private readonly deletePlanService: PlansDeletePlanService, private readonly createChangeRequestService: PlansCreateChangeRequestService, private readonly activateMembershipService: PlansActivateMembershipService, private readonly renewMembershipService: PlansRenewMembershipService, private readonly freezeMembershipService: PlansFreezeMembershipService) {}

  // SLA: STANDARD
  @CoreRequireIdempotencyKey()
  @Post("plans/change-requests")
  @ApiOperation({ summary: 'createChangeRequest for Manager plans' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiResponse({ status: HttpStatus.CREATED, type: PlansCreateChangeRequestResponseDto })
  createChangeRequest(@Body() dto: PlansCreateChangeRequestRequestDto): ReturnType<PlansCreateChangeRequestService['createChangeRequest']> { return this.createChangeRequestService.createChangeRequest(dto as any); }


  // SLA: STANDARD
  @CoreRequireIdempotencyKey()
  @Post("plans/membership-activate")
  @ApiOperation({ summary: 'activateMembership for Manager plans' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiResponse({ status: HttpStatus.CREATED, type: PlansActivateMembershipResponseDto })
  activateMembership(@Body() dto: PlansActivateMembershipRequestDto): ReturnType<PlansActivateMembershipService['activateMembership']> { return this.activateMembershipService.activateMembership(dto as any); }


  // SLA: STANDARD
  @CoreRequireIdempotencyKey()
  @Post("plans/membership-freeze")
  @ApiOperation({ summary: 'freezeMembership for Manager plans' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiResponse({ status: HttpStatus.CREATED, type: PlansFreezeMembershipResponseDto })
  freezeMembership(@Body() dto: PlansFreezeMembershipRequestDto): ReturnType<PlansFreezeMembershipService['freezeMembership']> { return this.freezeMembershipService.freezeMembership(dto as any); }


  // SLA: STANDARD
  @CoreRequireIdempotencyKey()
  @Post("plans/membership-renew")
  @ApiOperation({ summary: 'renewMembership for Manager plans' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiResponse({ status: HttpStatus.CREATED, type: PlansRenewMembershipResponseDto })
  renewMembership(@Body() dto: PlansRenewMembershipRequestDto): ReturnType<PlansRenewMembershipService['renewMembership']> { return this.renewMembershipService.renewMembership(dto as any); }


  // SLA: STANDARD
  @CoreRequireIdempotencyKey()
  @Post("plans")
  @ApiOperation({ summary: 'createPlan for Manager plans' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiResponse({ status: HttpStatus.CREATED, type: PlansCreatePlanResponseDto })
  createPlan(@Body() dto: PlansCreatePlanRequestDto): ReturnType<PlansCreatePlanService['createPlan']> { return this.createPlanService.createPlan(dto as any); }


  // SLA: STANDARD
  @CoreRequireIdempotencyKey()
  @Patch("plans/:id")
  @ApiOperation({ summary: 'updatePlan for Manager plans' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: PlansUpdatePlanResponseDto })
  updatePlan(@Param('id') id: string, @Body() dto: PlansUpdatePlanRequestDto): ReturnType<PlansUpdatePlanService['updatePlan']> { return this.updatePlanService.updatePlan(dto as any, id); }


  // SLA: STANDARD
  @CoreRequireIdempotencyKey()
  @Delete("plans/:id")
  @ApiOperation({ summary: 'deletePlan for Manager plans' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: PlansDeletePlanResponseDto })
  deletePlan(@Param('id') id: string): ReturnType<PlansDeletePlanService['deletePlan']> {  return this.deletePlanService.deletePlan(id); }


}
