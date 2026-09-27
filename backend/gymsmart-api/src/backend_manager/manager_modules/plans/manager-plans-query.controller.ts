// RESPONSIBILITY: Owns the backend application HTTP controller boundary.
// FLOW: HTTP request → guards/decorators → DTO validation → feature service → canonical response envelope.
import { Controller, Get, HttpStatus, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ManagerCoreAuthorizeResourceParam } from '@/backend_manager/manager_core/manager_core_authorization/manager-core-authorize-resource.decorator';

import { ManagerCoreRole } from '@/backend_manager/manager_core/manager_core_auth/manager-core-role.constants';
import { Roles } from '@/backend_manager/manager_core/manager_core_auth/manager-core-roles.decorator';

import { ManagerPlansFetchMembershipOverviewResponseDto } from '@/backend_manager/manager_modules/plans/plans_responses/manager-plans-fetch-membership-overview.response.dto';
import { ManagerPlansFetchPlanByIdResponseDto } from '@/backend_manager/manager_modules/plans/plans_responses/manager-plans-fetch-plan-by-id.response.dto';
import { ManagerPlansFetchPlansResponseDto } from '@/backend_manager/manager_modules/plans/plans_responses/manager-plans-fetch-plans.response.dto';
import { ManagerPlansQueryDto } from '@/backend_manager/manager_modules/plans/plans_dtos/manager-plans-query.dto';
import { ManagerPlansFindMembershipOverviewService } from '@/backend_manager/manager_modules/plans/plans_services/manager-plans-find-membership-overview.service';
import { ManagerPlansFindPlanByIdService } from '@/backend_manager/manager_modules/plans/plans_services/manager-plans-find-plan-by-id.service';
import { ManagerPlansFindPlansService } from '@/backend_manager/manager_modules/plans/plans_services/manager-plans-find-plans.service';

@Controller('manager')
@ApiTags('Manager plans')
@Roles(ManagerCoreRole.MANAGER)
export class ManagerPlansQueryController {
  constructor(private readonly fetchPlansService: ManagerPlansFindPlansService, private readonly fetchPlanByIdService: ManagerPlansFindPlanByIdService, private readonly fetchMembershipOverviewService: ManagerPlansFindMembershipOverviewService) {}

  // SLA: STANDARD
  @Get("plans/membership-overview")
  @ApiOperation({ summary: 'findMembershipOverview for Manager plans' })
  @ApiResponse({ status: HttpStatus.OK, type: ManagerPlansFetchMembershipOverviewResponseDto })
  findMembershipOverview(@Query() query: ManagerPlansQueryDto): ReturnType<ManagerPlansFindMembershipOverviewService['findMembershipOverview']> { return this.fetchMembershipOverviewService.findMembershipOverview(query); }


  // SLA: STANDARD
  @Get("plans")
  @ApiOperation({ summary: 'findPlans for Manager plans' })
  @ApiResponse({ status: HttpStatus.OK, type: ManagerPlansFetchPlansResponseDto })
  findPlans(@Query() query: ManagerPlansQueryDto): ReturnType<ManagerPlansFindPlansService['findPlans']> { return this.fetchPlansService.findPlans(query); }


  // SLA: STANDARD
  @Get("plans/:id")
  @ApiOperation({ summary: 'findPlanById for Manager plans' })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: ManagerPlansFetchPlanByIdResponseDto })
  @ManagerCoreAuthorizeResourceParam('id')
  findPlanById(@Param('id') id: string, @Query() query: ManagerPlansQueryDto): ReturnType<ManagerPlansFindPlanByIdService['findPlanById']> { return this.fetchPlanByIdService.findPlanById(id, query); }


}

export { ManagerPlansQueryController as PlansQueryController };
