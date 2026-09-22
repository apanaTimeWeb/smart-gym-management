// RESPONSIBILITY: Owns the Manager plans command/write HTTP boundary; contains no business logic or direct ORM access.
// FLOW: HTTP request -> DTO/query validation -> feature use-case service -> repository/domain -> canonical response.
import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CoreRole } from '@/core/auth/core-role.constants';
import { Roles } from '@/core/auth/core-roles.decorator';
import { PlansActivateMembershipRequestDto } from '@/modules/manager/plans/dtos/plans-activate-membership.request.dto';
import { PlansActivateMembershipResponseDto } from '@/modules/manager/plans/dtos/plans-activate-membership.response.dto';
import { PlansActivateMembershipService } from '@/modules/manager/plans/services/plans-activate-membership.service';
import { PlansCreateChangeRequestRequestDto } from '@/modules/manager/plans/dtos/plans-create-change-request.request.dto';
import { PlansCreateChangeRequestResponseDto } from '@/modules/manager/plans/dtos/plans-create-change-request.response.dto';
import { PlansCreateChangeRequestService } from '@/modules/manager/plans/services/plans-create-change-request.service';
import { PlansCreatePlanRequestDto } from '@/modules/manager/plans/dtos/plans-create-plan.request.dto';
import { PlansCreatePlanResponseDto } from '@/modules/manager/plans/dtos/plans-create-plan.response.dto';
import { PlansCreatePlanService } from '@/modules/manager/plans/services/plans-create-plan.service';
import { PlansDeletePlanResponseDto } from '@/modules/manager/plans/dtos/plans-delete-plan.response.dto';
import { PlansDeletePlanService } from '@/modules/manager/plans/services/plans-delete-plan.service';
import { PlansFreezeMembershipRequestDto } from '@/modules/manager/plans/dtos/plans-freeze-membership.request.dto';
import { PlansFreezeMembershipResponseDto } from '@/modules/manager/plans/dtos/plans-freeze-membership.response.dto';
import { PlansFreezeMembershipService } from '@/modules/manager/plans/services/plans-freeze-membership.service';
import { PlansQueryDto } from '@/modules/manager/plans/dtos/plans-query.dto';
import { PlansRenewMembershipRequestDto } from '@/modules/manager/plans/dtos/plans-renew-membership.request.dto';
import { PlansRenewMembershipResponseDto } from '@/modules/manager/plans/dtos/plans-renew-membership.response.dto';
import { PlansRenewMembershipService } from '@/modules/manager/plans/services/plans-renew-membership.service';
import { PlansUpdatePlanRequestDto } from '@/modules/manager/plans/dtos/plans-update-plan.request.dto';
import { PlansUpdatePlanResponseDto } from '@/modules/manager/plans/dtos/plans-update-plan.response.dto';
import { PlansUpdatePlanService } from '@/modules/manager/plans/services/plans-update-plan.service';

@Controller('manager')
@ApiTags('Manager plans')
@Roles(CoreRole.MANAGER)
export class PlansCommandController {
  constructor(private readonly createPlanService: PlansCreatePlanService, private readonly updatePlanService: PlansUpdatePlanService, private readonly deletePlanService: PlansDeletePlanService, private readonly createChangeRequestService: PlansCreateChangeRequestService, private readonly activateMembershipService: PlansActivateMembershipService, private readonly renewMembershipService: PlansRenewMembershipService, private readonly freezeMembershipService: PlansFreezeMembershipService) {}

  // SLA: STANDARD
  @Post("plans/change-requests")
  @ApiOperation({ summary: 'createChangeRequest for Manager plans' })
  @ApiHeader({ name: 'Idempotency-Key', required: false })
  @ApiResponse({ status: HttpStatus.CREATED, type: PlansCreateChangeRequestResponseDto })
  createChangeRequest(@Body() dto: PlansCreateChangeRequestRequestDto): Promise<PlansCreateChangeRequestResponseDto> {  return this.createChangeRequestService.createChangeRequest(dto) as Promise<PlansCreateChangeRequestResponseDto>;  }


  // SLA: STANDARD
  @Post("plans/membership-activate")
  @ApiOperation({ summary: 'activateMembership for Manager plans' })
  @ApiHeader({ name: 'Idempotency-Key', required: false })
  @ApiResponse({ status: HttpStatus.CREATED, type: PlansActivateMembershipResponseDto })
  activateMembership(@Body() dto: PlansActivateMembershipRequestDto): Promise<PlansActivateMembershipResponseDto> {  return this.activateMembershipService.activateMembership(dto) as Promise<PlansActivateMembershipResponseDto>;  }


  // SLA: STANDARD
  @Post("plans/membership-freeze")
  @ApiOperation({ summary: 'freezeMembership for Manager plans' })
  @ApiHeader({ name: 'Idempotency-Key', required: false })
  @ApiResponse({ status: HttpStatus.CREATED, type: PlansFreezeMembershipResponseDto })
  freezeMembership(@Body() dto: PlansFreezeMembershipRequestDto): Promise<PlansFreezeMembershipResponseDto> {  return this.freezeMembershipService.freezeMembership(dto) as Promise<PlansFreezeMembershipResponseDto>;  }


  // SLA: STANDARD
  @Post("plans/membership-renew")
  @ApiOperation({ summary: 'renewMembership for Manager plans' })
  @ApiHeader({ name: 'Idempotency-Key', required: false })
  @ApiResponse({ status: HttpStatus.CREATED, type: PlansRenewMembershipResponseDto })
  renewMembership(@Body() dto: PlansRenewMembershipRequestDto): Promise<PlansRenewMembershipResponseDto> {  return this.renewMembershipService.renewMembership(dto) as Promise<PlansRenewMembershipResponseDto>;  }


  // SLA: STANDARD
  @Post("plans")
  @ApiOperation({ summary: 'createPlan for Manager plans' })
  @ApiHeader({ name: 'Idempotency-Key', required: false })
  @ApiResponse({ status: HttpStatus.CREATED, type: PlansCreatePlanResponseDto })
  createPlan(@Body() dto: PlansCreatePlanRequestDto): Promise<PlansCreatePlanResponseDto> {  return this.createPlanService.createPlan(dto) as Promise<PlansCreatePlanResponseDto>;  }


  // SLA: STANDARD
  @Patch("plans/:id")
  @ApiOperation({ summary: 'updatePlan for Manager plans' })
  @ApiHeader({ name: 'Idempotency-Key', required: false })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: PlansUpdatePlanResponseDto })
  updatePlan(@Param('id') id: string, @Body() dto: PlansUpdatePlanRequestDto): Promise<PlansUpdatePlanResponseDto> {  return this.updatePlanService.updatePlan(dto, id) as Promise<PlansUpdatePlanResponseDto>;  }


  // SLA: STANDARD
  @Delete("plans/:id")
  @ApiOperation({ summary: 'deletePlan for Manager plans' })
  @ApiHeader({ name: 'Idempotency-Key', required: false })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: PlansDeletePlanResponseDto })
  deletePlan(@Param('id') id: string): Promise<PlansDeletePlanResponseDto> {  return this.deletePlanService.deletePlan(id); }


}
