// RESPONSIBILITY: Owns HTTP transport for the reports-query.controller controller surface; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning service -> canonical response envelope.
import { HttpStatus, Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags, ApiOperation } from '@nestjs/swagger';
import { SuperadminCoreJwtAuthGuard } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-jwt-auth.guard';
import { SuperadminCoreRolesGuard } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-auth.constants';
import { SuperadminReportsQueryDto } from '@/backend_superadmin/superadmin_modules/reports/reports_dtos/superadmin-reports-query.dto';
import { SuperadminReportsListService } from '@/backend_superadmin/superadmin_modules/reports/reports_services/superadmin-reports-list.service';
import { SuperadminReportsFindService } from '@/backend_superadmin/superadmin_modules/reports/reports_services/superadmin-reports-find.service';
import { SuperadminReportsDataService } from '@/backend_superadmin/superadmin_modules/reports/reports_services/superadmin-reports-data.service';
import { SuperadminReportsDataQueryDto } from '@/backend_superadmin/superadmin_modules/reports/reports_dtos/superadmin-reports-data-query.dto';

/**
 * Primary Intent: Defines SuperadminReportsQueryController as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@ApiTags('reports')
@Controller('/superadmin/reports')
@UseGuards(SuperadminCoreJwtAuthGuard, SuperadminCoreRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminReportsQueryController {
  constructor(private readonly listService: SuperadminReportsListService, private readonly findService: SuperadminReportsFindService, private readonly dataService: SuperadminReportsDataService) {}
/**
 * Primary Intent: Executes the revenue use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /** Returns revenue report rows. */
  // SLA: FAST
  @Get('revenue')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  @ApiOperation({ summary: 'revenue' })
  /**
   * Primary Intent: Executes the revenue use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async revenue(@Query() query: SuperadminReportsDataQueryDto): Promise<SuperadminReportsDataService['revenue'] extends (...args: never[]) => infer R ? R : never> { return this.dataService.revenue(query); }
/**
 * Primary Intent: Executes the cancellations use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /** Returns cancellation report rows. */
  // SLA: FAST
  @Get('cancellations')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  @ApiOperation({ summary: 'cancellations' })
  /**
   * Primary Intent: Executes the cancellations use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async cancellations(@Query() query: SuperadminReportsDataQueryDto): Promise<SuperadminReportsDataService['cancellations'] extends (...args: never[]) => infer R ? R : never> { return this.dataService.cancellations(query); }
/**
 * Primary Intent: Executes the health use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /** Returns tenant health score report rows. */
  // SLA: FAST
  @Get('health')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  @ApiOperation({ summary: 'health' })
  /**
   * Primary Intent: Executes the health use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async health(@Query() query: SuperadminReportsDataQueryDto): Promise<SuperadminReportsDataService['health'] extends (...args: never[]) => infer R ? R : never> { return this.dataService.health(query); }
/**
 * Primary Intent: Executes the findOne use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /** Returns one reports record. */
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
  async findOne(@Param('id') id: string): Promise<Awaited<ReturnType<SuperadminReportsFindService['findReportsById']>>> { return await this.findService.findReportsById(id); }
}
