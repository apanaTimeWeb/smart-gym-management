// RESPONSIBILITY: Owns HTTP transport for the plans-query.controller controller surface; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning service -> canonical response envelope.
import { HttpStatus, Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags, ApiOperation } from '@nestjs/swagger';
import { SuperadminCoreJwtAuthGuard } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-jwt-auth.guard';
import { SuperadminCoreRolesGuard } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-auth.constants';
import { SuperadminSaasBillingPlansQueryDto } from '@/backend_superadmin/superadmin_modules/saas-billing/plans/plans_dtos/superadmin-saas-billing-plans-query.dto';
import { SuperadminSaasBillingPlansListService } from '@/backend_superadmin/superadmin_modules/saas-billing/plans/plans_services/superadmin-saas-billing-plans-list.service';
import { SuperadminSaasBillingPlansFindService } from '@/backend_superadmin/superadmin_modules/saas-billing/plans/plans_services/superadmin-saas-billing-plans-find.service';
import { SuperadminSaasBillingPlansBusinessControlsService } from '@/backend_superadmin/superadmin_modules/saas-billing/plans/plans_services/superadmin-saas-billing-plans-business-controls.service';
import { SuperadminQueryDto } from '@/backend_superadmin/superadmin_core/superadmin_core_pagination/superadmin-query.dto';

/**
 * Primary Intent: Defines SuperadminSaasBillingPlansQueryController as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@ApiTags('plans')
@Controller()
@UseGuards(SuperadminCoreJwtAuthGuard, SuperadminCoreRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminSaasBillingPlansQueryController {
  constructor(private readonly listService: SuperadminSaasBillingPlansListService, private readonly findService: SuperadminSaasBillingPlansFindService, private readonly businessControlsService: SuperadminSaasBillingPlansBusinessControlsService) {}
/**
 * Primary Intent: Executes the findAll use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /** Returns a paginated plans list. */
  // SLA: FAST
  @Get(['superadmin/saas-billing/plans', 'api/superadmin/saas-billing/plans'])
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  @ApiOperation({ summary: 'findAll' })
  /**
   * Primary Intent: Executes the findAll use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async findAll(@Query() query: SuperadminSaasBillingPlansQueryDto): Promise<Awaited<ReturnType<SuperadminSaasBillingPlansListService['findPlansPage']>>> { return await this.listService.findPlansPage(query); }
/**
 * Primary Intent: Executes the businessControls use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /** Returns plan business-control insights. */
  // SLA: FAST
  @Get(['superadmin/saas-billing/plans/business-controls', 'api/superadmin/saas-billing/plans/business-controls'])
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  @ApiOperation({ summary: 'businessControls' })
  /**
   * Primary Intent: Executes the businessControls use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async businessControls(@Query() query: SuperadminQueryDto): Promise<Awaited<ReturnType<SuperadminSaasBillingPlansBusinessControlsService['findPlansBusinessControls']>>> { return this.businessControlsService.findPlansBusinessControls({ query }); }
/**
 * Primary Intent: Executes the findOne use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /** Returns one plans record. */
  // SLA: FAST
  @Get(['superadmin/saas-billing/plans/:id', 'api/superadmin/saas-billing/plans/:id'])
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  @ApiOperation({ summary: 'findOne' })
  /**
   * Primary Intent: Executes the findOne use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async findOne(@Param('id') id: string): Promise<Awaited<ReturnType<SuperadminSaasBillingPlansFindService['findPlansById']>>> { return await this.findService.findPlansById(id); }
}
