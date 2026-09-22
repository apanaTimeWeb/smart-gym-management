// RESPONSIBILITY: Owns the Manager plans query/read HTTP boundary; contains no business logic or direct ORM access.
// FLOW: HTTP request -> DTO/query validation -> feature use-case service -> repository/domain -> canonical response.
import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CoreRole } from '@/core/auth/core-role.constants';
import { Roles } from '@/core/auth/core-roles.decorator';
import { PlansFetchMembershipOverviewResponseDto } from '@/modules/manager/plans/dtos/plans-fetch-membership-overview.response.dto';
import { PlansFetchMembershipOverviewService } from '@/modules/manager/plans/services/plans-fetch-membership-overview.service';
import { PlansFetchPlanByIdResponseDto } from '@/modules/manager/plans/dtos/plans-fetch-plan-by-id.response.dto';
import { PlansFetchPlanByIdService } from '@/modules/manager/plans/services/plans-fetch-plan-by-id.service';
import { PlansFetchPlansResponseDto } from '@/modules/manager/plans/dtos/plans-fetch-plans.response.dto';
import { PlansFetchPlansService } from '@/modules/manager/plans/services/plans-fetch-plans.service';
import { PlansQueryDto } from '@/modules/manager/plans/dtos/plans-query.dto';

@Controller('manager')
@ApiTags('Manager plans')
@Roles(CoreRole.MANAGER)
export class PlansQueryController {
  constructor(private readonly fetchPlansService: PlansFetchPlansService, private readonly fetchPlanByIdService: PlansFetchPlanByIdService, private readonly fetchMembershipOverviewService: PlansFetchMembershipOverviewService) {}

  // SLA: STANDARD
  @Get("plans/membership-overview")
  @ApiOperation({ summary: 'fetchMembershipOverview for Manager plans' })
  @ApiResponse({ status: HttpStatus.OK, type: PlansFetchMembershipOverviewResponseDto })
  fetchMembershipOverview(@Query() query: PlansQueryDto): Promise<PlansFetchMembershipOverviewResponseDto> {  return this.fetchMembershipOverviewService.fetchMembershipOverview(query) as Promise<PlansFetchMembershipOverviewResponseDto>;  }


  // SLA: STANDARD
  @Get("plans")
  @ApiOperation({ summary: 'fetchPlans for Manager plans' })
  @ApiResponse({ status: HttpStatus.OK, type: PlansFetchPlansResponseDto })
  fetchPlans(@Query() query: PlansQueryDto): Promise<PlansFetchPlansResponseDto> {  return this.fetchPlansService.fetchPlans(query) as Promise<PlansFetchPlansResponseDto>;  }


  // SLA: STANDARD
  @Get("plans/:id")
  @ApiOperation({ summary: 'fetchPlanById for Manager plans' })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: PlansFetchPlanByIdResponseDto })
  fetchPlanById(@Param('id') id: string, @Query() query: PlansQueryDto): Promise<PlansFetchPlanByIdResponseDto> {  return this.fetchPlanByIdService.fetchPlanById(id, query) as Promise<PlansFetchPlanByIdResponseDto>;  }


}
