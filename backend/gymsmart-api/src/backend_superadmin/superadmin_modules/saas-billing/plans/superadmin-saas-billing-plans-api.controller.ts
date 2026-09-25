// RESPONSIBILITY: Owns the frontend-compatible API alias for plan business-control data.
// FLOW: GET /api/superadmin/saas-billing/plans/business-controls -> query service -> canonical response interceptor.
import { Controller, Get, HttpStatus, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuperadminCoreJwtAuthGuard } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-jwt-auth.guard';
import { SuperadminCoreRolesGuard } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-auth.constants';
import { SuperadminSaasBillingPlansBusinessControlsService } from '@/backend_superadmin/superadmin_modules/saas-billing/plans/plans_services/superadmin-saas-billing-plans-business-controls.service';
import { SuperadminQueryDto } from '@/backend_superadmin/superadmin_core/superadmin_core_pagination/superadmin-query.dto';

/**
 * Primary Intent: Defines SuperadminSaasBillingPlansApiController as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@ApiTags('plans-api')
@Controller()
@UseGuards(SuperadminCoreJwtAuthGuard, SuperadminCoreRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminSaasBillingPlansApiController {
  constructor(private readonly service: SuperadminSaasBillingPlansBusinessControlsService) {}
/**
 * Primary Intent: Executes the businessControls use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /** Returns plan-level business controls through the frontend-compatible API route. */
  // SLA: FAST
  @Get(['api/superadmin/saas-billing/plans/business-controls', 'api/superadmin/saas-billing/plans/business-controls'])
  @ApiOperation({ summary: 'Get plan business controls' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Plan business controls.' })
  /**
   * Primary Intent: Executes the businessControls use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async businessControls(@Query() query: SuperadminQueryDto): Promise<Awaited<ReturnType<SuperadminSaasBillingPlansBusinessControlsService['findPlansBusinessControls']>>> { return this.service.findPlansBusinessControls({ query }); }
}
