// RESPONSIBILITY: Owns HTTP transport for the infrastructure-query.controller controller surface; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning service -> canonical response envelope.
import { HttpStatus, Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags, ApiOperation } from '@nestjs/swagger';
import { SuperadminCoreJwtAuthGuard } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-jwt-auth.guard';
import { SuperadminCoreRolesGuard } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-auth.constants';
import { SuperadminSystemOpsInfrastructureQueryDto } from '@/backend_superadmin/superadmin_modules/system-ops/infrastructure/infrastructure_dtos/superadmin-system-ops-infrastructure-query.dto';
import { SuperadminSystemOpsInfrastructureListService } from '@/backend_superadmin/superadmin_modules/system-ops/infrastructure/infrastructure_services/superadmin-system-ops-infrastructure-list.service';
import { SuperadminSystemOpsInfrastructureFindService } from '@/backend_superadmin/superadmin_modules/system-ops/infrastructure/infrastructure_services/superadmin-system-ops-infrastructure-find.service';

/**
 * Primary Intent: Defines SuperadminSystemOpsInfrastructureQueryController as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@ApiTags('infrastructure')
@Controller('/superadmin/system-ops/infrastructure')
@UseGuards(SuperadminCoreJwtAuthGuard, SuperadminCoreRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminSystemOpsInfrastructureQueryController {
  constructor(private readonly listService: SuperadminSystemOpsInfrastructureListService, private readonly findService: SuperadminSystemOpsInfrastructureFindService) {}
/**
 * Primary Intent: Executes the findAll use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /** Returns a paginated infrastructure list. */
  // SLA: FAST
  @Get()
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  @ApiOperation({ summary: 'findAll' })
  /**
   * Primary Intent: Executes the findAll use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async findAll(@Query() query: SuperadminSystemOpsInfrastructureQueryDto): Promise<Awaited<ReturnType<SuperadminSystemOpsInfrastructureListService['findInfrastructurePage']>>> { return await this.listService.findInfrastructurePage(query); }
/**
 * Primary Intent: Executes the findOne use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /** Returns one infrastructure record. */
  // SLA: FAST
  @Get(':id')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  @ApiOperation({ summary: 'findOne' })
  /**
   * Primary Intent: Executes the findOne use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async findOne(@Param('id') id: string): Promise<Awaited<ReturnType<SuperadminSystemOpsInfrastructureFindService['findInfrastructureById']>>> { return await this.findService.findInfrastructureById(id); }
}
