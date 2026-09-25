// RESPONSIBILITY: Accepts Superadmin export mutations and enqueues durable export jobs.
// FLOW: HTTP POST -> DTO validation -> SuperadminExportDataService.startExport -> durable queue -> 202.
import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuperadminCoreJwtAuthGuard } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-jwt-auth.guard';
import { SuperadminCoreRolesGuard } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-roles.guard';
import { SuperadminCoreRateLimitGuard } from '@/backend_superadmin/superadmin_core/superadmin_core_cache/superadmin-core-rate-limit.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-auth.constants';
import { RequireIdempotencyKey } from '@/backend_superadmin/superadmin_core/superadmin_core_cache/superadmin-core-idempotency.decorator';
import { SuperadminExportDataRequestDto } from '@/backend_superadmin/superadmin_modules/export-data/export-data_dtos/superadmin-export-data-request.dto';
import { SuperadminExportDataAcceptedResponseDto } from '@/backend_superadmin/superadmin_modules/export-data/export-data_responses/superadmin-export-data-accepted-response.dto';
import { SuperadminExportDataService } from '@/backend_superadmin/superadmin_modules/export-data/export-data_services/superadmin-export-data.service';

/**
 * Primary Intent: Defines SuperadminExportDataCommandController as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@ApiTags('export-data')
@Controller()
@UseGuards(SuperadminCoreJwtAuthGuard, SuperadminCoreRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminExportDataCommandController {
  constructor(private readonly service: SuperadminExportDataService) {}
/**
 * Primary Intent: Executes the start use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /** Starts the asynchronous export job. */
  @ApiOperation({ summary: 'Start asynchronous Superadmin export job' })
  @RequireIdempotencyKey()
  // SLA: HEAVY
  @Post('superadmin/export-data')
  @HttpCode(HttpStatus.ACCEPTED)
  @UseGuards(SuperadminCoreRateLimitGuard)
  @ApiResponse({ status: HttpStatus.ACCEPTED, type: SuperadminExportDataAcceptedResponseDto })
  @ApiOperation({ summary: 'start' })
  /**
   * Primary Intent: Executes the start use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async start(@Body() body: SuperadminExportDataRequestDto): Promise<SuperadminExportDataAcceptedResponseDto> { return this.service.startExport(body); }
}
