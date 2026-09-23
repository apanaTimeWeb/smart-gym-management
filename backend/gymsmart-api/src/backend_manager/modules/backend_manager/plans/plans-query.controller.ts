// RESPONSIBILITY: Owns the backend application HTTP controller boundary.
// FLOW: HTTP request → guards/decorators → DTO validation → feature service → canonical response envelope.
import { Controller, Get, HttpStatus, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CoreRole } from '@/backend_manager/core/auth/core-role.constants';
import { Roles } from '@/backend_manager/core/auth/core-roles.decorator';

import { PlansFetchMembershipOverviewResponseDto } from '@/backend_manager/modules/backend_manager/plans/dtos/plans-fetch-membership-overview.response.dto';
import { PlansFetchPlanByIdResponseDto } from '@/backend_manager/modules/backend_manager/plans/dtos/plans-fetch-plan-by-id.response.dto';
import { PlansFetchPlansResponseDto } from '@/backend_manager/modules/backend_manager/plans/dtos/plans-fetch-plans.response.dto';
import { PlansQueryDto } from '@/backend_manager/modules/backend_manager/plans/dtos/plans-query.dto';
import { PlansFetchMembershipOverviewService } from '@/backend_manager/modules/backend_manager/plans/services/plans-fetch-membership-overview.service';
import { PlansFetchPlanByIdService } from '@/backend_manager/modules/backend_manager/plans/services/plans-fetch-plan-by-id.service';
import { PlansFetchPlansService } from '@/backend_manager/modules/backend_manager/plans/services/plans-fetch-plans.service';

@Controller('manager')
@ApiTags('Manager plans')
@Roles(CoreRole.MANAGER)
export class PlansQueryController {
  constructor(private readonly fetchPlansService: PlansFetchPlansService, private readonly fetchPlanByIdService: PlansFetchPlanByIdService, private readonly fetchMembershipOverviewService: PlansFetchMembershipOverviewService) {}

  // SLA: STANDARD
  @Get("plans/membership-overview")
  @ApiOperation({ summary: 'fetchMembershipOverview for Manager plans' })
  @ApiResponse({ status: HttpStatus.OK, type: PlansFetchMembershipOverviewResponseDto })
  fetchMembershipOverview(@Query() query: PlansQueryDto): ReturnType<PlansFetchMembershipOverviewService['fetchMembershipOverview']> { return this.fetchMembershipOverviewService.fetchMembershipOverview(query as any); }


  // SLA: STANDARD
  @Get("plans")
  @ApiOperation({ summary: 'fetchPlans for Manager plans' })
  @ApiResponse({ status: HttpStatus.OK, type: PlansFetchPlansResponseDto })
  fetchPlans(@Query() query: PlansQueryDto): ReturnType<PlansFetchPlansService['fetchPlans']> { return this.fetchPlansService.fetchPlans(query as any); }


  // SLA: STANDARD
  @Get("plans/:id")
  @ApiOperation({ summary: 'fetchPlanById for Manager plans' })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: PlansFetchPlanByIdResponseDto })
  fetchPlanById(@Param('id') id: string, @Query() query: PlansQueryDto): ReturnType<PlansFetchPlanByIdService['fetchPlanById']> { return this.fetchPlanByIdService.fetchPlanById(id, query as any); }


}
