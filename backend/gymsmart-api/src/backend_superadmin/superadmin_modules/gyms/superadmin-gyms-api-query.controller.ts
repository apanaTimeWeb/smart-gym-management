// RESPONSIBILITY: Serves frontend-compatible read-only /api/gyms queries, statistics, and export retrieval.
// FLOW: HTTP GET -> guards -> query service/repository -> response DTO or protected stream.
import { Controller, Get, HttpStatus, Param, Public, Query, Res, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { createReadStream } from 'node:fs';
import type { Response } from 'express';
import { SuperadminCoreJwtAuthGuard } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-jwt-auth.guard';
import { SuperadminCoreRolesGuard } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-auth.constants';
import { SuperadminGymsQueryDto } from '@/backend_superadmin/superadmin_modules/gyms/gyms_dtos/superadmin-gyms-query.dto';
import { SuperadminGymsListService } from '@/backend_superadmin/superadmin_modules/gyms/gyms_services/superadmin-gyms-list.service';
import { SuperadminGymsFindService } from '@/backend_superadmin/superadmin_modules/gyms/gyms_services/superadmin-gyms-find.service';
import { SuperadminGymsOperationalService } from '@/backend_superadmin/superadmin_modules/gyms/gyms_services/superadmin-gyms-operational.service';
import { SuperadminGymsExportJobRepository } from '@/backend_superadmin/superadmin_modules/gyms/gyms_repositories/superadmin-gyms-export-job.repository';
import { SuperadminGymsExportDownloadTokenService } from '@/backend_superadmin/superadmin_modules/gyms/gyms_services/superadmin-gyms-export-download-token.service';
import { SuperadminGymsResponseDto } from '@/backend_superadmin/superadmin_modules/gyms/gyms_responses/superadmin-gyms-response.dto';
import { SuperadminGymsExportJobStatusResponseDto } from '@/backend_superadmin/superadmin_modules/gyms/gyms_responses/superadmin-gyms-export-job-status-response.dto';
import { SuperadminGymsExportDownloadTokenMismatchException, SuperadminGymsExportArtifactNotReadyException } from '@/backend_superadmin/superadmin_modules/gyms/superadmin-gyms.exceptions';
import { SuperadminPaginatedResult } from '@/backend_superadmin/superadmin_core/superadmin_core_pagination/superadmin-core-paginated-result';

/**
 * Primary Intent: Defines SuperadminGymsApiQueryController as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@ApiTags('gyms-api')
@Controller()
@UseGuards(SuperadminCoreJwtAuthGuard, SuperadminCoreRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminGymsApiQueryController {
  constructor(
    private readonly listService: SuperadminGymsListService,
    private readonly findService: SuperadminGymsFindService,
    private readonly operationalService: SuperadminGymsOperationalService,
    private readonly exportJobs: SuperadminGymsExportJobRepository,
    private readonly downloadTokens: SuperadminGymsExportDownloadTokenService,
  ) {}
/**
 * Primary Intent: Executes the findAll use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /** Returns the tenant collection consumed by frontend /api/gyms callers. */
  // SLA: STANDARD
  // SLA: FAST
  @Get('api/gyms')
  @ApiOperation({ summary: 'List gyms via frontend-compatible /api path' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Paginated gym response.' })
  /**
   * Primary Intent: Executes the findAll use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async findAll(@Query() query: SuperadminGymsQueryDto): Promise<SuperadminPaginatedResult<SuperadminGymsResponseDto>> {
    return this.listService.findGymsPage(query);
  }
/**
 * Primary Intent: Executes the stats use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /** Returns fixed aggregate statistics for the gyms landing page. */
  // SLA: STANDARD
  // SLA: FAST
  @Get('api/gyms/stats')
  @ApiOperation({ summary: 'Return gym aggregate statistics' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Tenant statistics.' })
  /**
   * Primary Intent: Executes the stats use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async stats(): Promise<{ totalActive: number; totalSuspended: number; mrrContribution: number }> {
    return this.operationalService.stats();
  }
/**
 * Primary Intent: Executes the exportStatus use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /** Returns durable export job status. */
  // SLA: HEAVY
  @Get('api/gyms/export/:jobId')
  @ApiResponse({ status: HttpStatus.OK, type: SuperadminGymsExportJobStatusResponseDto, description: 'Gym export job status.' })
  @ApiOperation({ summary: 'exportStatus' })
  /**
   * Primary Intent: Executes the exportStatus use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async exportStatus(@Param('jobId') jobId: string): Promise<SuperadminGymsExportJobStatusResponseDto> {
    return this.exportJobs.findByIdOrThrow(jobId);
  }
/**
 * Primary Intent: Executes the exportDownload use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /** Streams a completed protected Gym CSV export artifact after token verification. */
  @Public()
  // SLA: HEAVY
  @Get('api/gyms/export/:jobId/download')
  @ApiResponse({ status: HttpStatus.OK, description: 'Gym CSV export. Requires a short-lived signed download token.' })
  @ApiOperation({ summary: 'exportDownload' })
  /**
   * Primary Intent: Executes the exportDownload use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async exportDownload(@Param('jobId') jobId: string, @Query('token') token: string, @Res() response: Response): Promise<void> {
    const payload = this.downloadTokens.verify(token);
    if (payload.jobId !== jobId) throw new SuperadminGymsExportDownloadTokenMismatchException();
    const job = await this.exportJobs.findById(jobId);
    if (!job?.resultPath) throw new SuperadminGymsExportArtifactNotReadyException();
    response.status(HttpStatus.OK).type('text/csv').setHeader('Content-Disposition', `attachment; filename=gyms-${jobId}.csv`);
    await new Promise<void>((resolve, reject) => { const stream = createReadStream(job.resultPath!); stream.on('error', reject); stream.on('end', resolve); stream.pipe(response); });
  }
/**
 * Primary Intent: Executes the findOne use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /** Returns one tenant by identifier through the frontend-compatible alias. */
  // SLA: STANDARD
  // SLA: FAST
  @Get('api/gyms/:id')
  @ApiOperation({ summary: 'Find one gym via frontend-compatible /api path' })
  @ApiResponse({ status: HttpStatus.OK, type: SuperadminGymsResponseDto })
  /**
   * Primary Intent: Executes the findOne use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async findOne(@Param('id') id: string): Promise<SuperadminGymsResponseDto> {
    return this.findService.findGymsById(id);
  }
}
