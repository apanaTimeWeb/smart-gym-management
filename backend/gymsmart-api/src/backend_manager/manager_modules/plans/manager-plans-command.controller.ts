// RESPONSIBILITY: Owns the backend application HTTP controller boundary.
// FLOW: HTTP request → guards/decorators → DTO validation → feature service → canonical response envelope.
import { Body, Controller, Delete, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ManagerCoreAuthorizeResourceParam } from '@/backend_manager/manager_core/manager_core_authorization/manager-core-authorize-resource.decorator';

import { ManagerCoreRole } from '@/backend_manager/manager_core/manager_core_auth/manager-core-role.constants';
import { Roles } from '@/backend_manager/manager_core/manager_core_auth/manager-core-roles.decorator';
import { RequireIdempotencyKey } from '@/backend_manager/manager_core/manager_core_idempotency/manager-core-require-idempotency-key.decorator';

import { ManagerPlansActivateMembershipRequestDto } from '@/backend_manager/manager_modules/plans/plans_dtos/manager-plans-activate-membership.request.dto';
import { ManagerPlansActivateMembershipResponseDto } from '@/backend_manager/manager_modules/plans/plans_responses/manager-plans-activate-membership.response.dto';
import { ManagerPlansCreateChangeRequestRequestDto } from '@/backend_manager/manager_modules/plans/plans_dtos/manager-plans-create-change-request.request.dto';
import { ManagerPlansCreateChangeRequestResponseDto } from '@/backend_manager/manager_modules/plans/plans_responses/manager-plans-create-change-request.response.dto';
import { ManagerPlansCreatePlanRequestDto } from '@/backend_manager/manager_modules/plans/plans_dtos/manager-plans-create-plan.request.dto';
import { ManagerPlansCreatePlanResponseDto } from '@/backend_manager/manager_modules/plans/plans_responses/manager-plans-create-plan.response.dto';
import { ManagerPlansDeletePlanResponseDto } from '@/backend_manager/manager_modules/plans/plans_responses/manager-plans-delete-plan.response.dto';
import { ManagerPlansFreezeMembershipRequestDto } from '@/backend_manager/manager_modules/plans/plans_dtos/manager-plans-freeze-membership.request.dto';
import { ManagerPlansFreezeMembershipResponseDto } from '@/backend_manager/manager_modules/plans/plans_responses/manager-plans-freeze-membership.response.dto';
import { ManagerPlansRenewMembershipRequestDto } from '@/backend_manager/manager_modules/plans/plans_dtos/manager-plans-renew-membership.request.dto';
import { ManagerPlansRenewMembershipResponseDto } from '@/backend_manager/manager_modules/plans/plans_responses/manager-plans-renew-membership.response.dto';
import { ManagerPlansUpdatePlanRequestDto } from '@/backend_manager/manager_modules/plans/plans_dtos/manager-plans-update-plan.request.dto';
import { ManagerPlansUpdatePlanResponseDto } from '@/backend_manager/manager_modules/plans/plans_responses/manager-plans-update-plan.response.dto';
import { ManagerPlansActivateMembershipService } from '@/backend_manager/manager_modules/plans/plans_services/manager-plans-activate-membership.service';
import { ManagerPlansCreateChangeRequestService } from '@/backend_manager/manager_modules/plans/plans_services/manager-plans-create-change-request.service';
import { ManagerPlansCreatePlanService } from '@/backend_manager/manager_modules/plans/plans_services/manager-plans-create-plan.service';
import { ManagerPlansDeletePlanService } from '@/backend_manager/manager_modules/plans/plans_services/manager-plans-delete-plan.service';
import { ManagerPlansFreezeMembershipService } from '@/backend_manager/manager_modules/plans/plans_services/manager-plans-freeze-membership.service';
import { ManagerPlansRenewMembershipService } from '@/backend_manager/manager_modules/plans/plans_services/manager-plans-renew-membership.service';
import { ManagerPlansUpdatePlanService } from '@/backend_manager/manager_modules/plans/plans_services/manager-plans-update-plan.service';

@Controller('manager')
@ApiTags('Manager plans')
@Roles(ManagerCoreRole.MANAGER)
export class ManagerPlansCommandController {
  constructor(private readonly createPlanService: ManagerPlansCreatePlanService, private readonly updatePlanService: ManagerPlansUpdatePlanService, private readonly deletePlanService: ManagerPlansDeletePlanService, private readonly createChangeRequestService: ManagerPlansCreateChangeRequestService, private readonly activateMembershipService: ManagerPlansActivateMembershipService, private readonly renewMembershipService: ManagerPlansRenewMembershipService, private readonly freezeMembershipService: ManagerPlansFreezeMembershipService) {}

  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post("plans/change-requests")
  @ApiOperation({ summary: 'createChangeRequest for Manager plans' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiResponse({ status: HttpStatus.CREATED, type: ManagerPlansCreateChangeRequestResponseDto })
  createChangeRequest(@Body() dto: ManagerPlansCreateChangeRequestRequestDto): ReturnType<ManagerPlansCreateChangeRequestService['createChangeRequest']> { return this.createChangeRequestService.createChangeRequest(dto); }


  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post("plans/membership-activate")
  @ApiOperation({ summary: 'activateMembership for Manager plans' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiResponse({ status: HttpStatus.CREATED, type: ManagerPlansActivateMembershipResponseDto })
  activateMembership(@Body() dto: ManagerPlansActivateMembershipRequestDto): ReturnType<ManagerPlansActivateMembershipService['activateMembership']> { return this.activateMembershipService.activateMembership(dto); }


  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post("plans/membership-freeze")
  @ApiOperation({ summary: 'freezeMembership for Manager plans' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiResponse({ status: HttpStatus.CREATED, type: ManagerPlansFreezeMembershipResponseDto })
  freezeMembership(@Body() dto: ManagerPlansFreezeMembershipRequestDto): ReturnType<ManagerPlansFreezeMembershipService['freezeMembership']> { return this.freezeMembershipService.freezeMembership(dto); }


  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post("plans/membership-renew")
  @ApiOperation({ summary: 'renewMembership for Manager plans' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiResponse({ status: HttpStatus.CREATED, type: ManagerPlansRenewMembershipResponseDto })
  renewMembership(@Body() dto: ManagerPlansRenewMembershipRequestDto): ReturnType<ManagerPlansRenewMembershipService['renewMembership']> { return this.renewMembershipService.renewMembership(dto); }


  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post("plans")
  @ApiOperation({ summary: 'createPlan for Manager plans' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiResponse({ status: HttpStatus.CREATED, type: ManagerPlansCreatePlanResponseDto })
  createPlan(@Body() dto: ManagerPlansCreatePlanRequestDto): ReturnType<ManagerPlansCreatePlanService['createPlan']> { return this.createPlanService.createPlan(dto); }


  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Patch("plans/:id")
  @ApiOperation({ summary: 'updatePlan for Manager plans' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: ManagerPlansUpdatePlanResponseDto })
  @ManagerCoreAuthorizeResourceParam('id')
  updatePlan(@Param('id') id: string, @Body() dto: ManagerPlansUpdatePlanRequestDto): ReturnType<ManagerPlansUpdatePlanService['updatePlan']> { return this.updatePlanService.updatePlan(dto, id); }


  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Delete("plans/:id")
  @ApiOperation({ summary: 'deletePlan for Manager plans' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: ManagerPlansDeletePlanResponseDto })
  @ManagerCoreAuthorizeResourceParam('id')
  deletePlan(@Param('id') id: string): ReturnType<ManagerPlansDeletePlanService['deletePlan']> {  return this.deletePlanService.deletePlan(id); }


}

export { ManagerPlansCommandController as PlansCommandController };
