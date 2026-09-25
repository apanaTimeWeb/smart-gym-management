// RESPONSIBILITY: Serves read-only Superadmin export status and protected artifact downloads.
// FLOW: HTTP GET -> export service -> durable job/artifact state -> canonical response or stream.
import { Controller, Get, HttpStatus, Param, Res, UseGuards } from '@nestjs/common';
import { createReadStream } from 'node:fs';
import type { Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuperadminCoreJwtAuthGuard } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-jwt-auth.guard';
import { SuperadminCoreRolesGuard } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-auth.constants';
import { SuperadminExportDataStatusResponseDto } from '@/backend_superadmin/superadmin_modules/export-data/export-data_responses/superadmin-export-data-status-response.dto';
import { SuperadminExportDataService } from '@/backend_superadmin/superadmin_modules/export-data/export-data_services/superadmin-export-data.service';

/**
 * Primary Intent: Defines SuperadminExportDataQueryController as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@ApiTags('export-data')
@Controller()
@UseGuards(SuperadminCoreJwtAuthGuard, SuperadminCoreRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminExportDataQueryController {
  constructor(private readonly service: SuperadminExportDataService) {}
/**
 * Primary Intent: Executes the status use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /** Returns one durable export job status. */
  // SLA: HEAVY
  @Get(['api/superadmin/export-data/:jobId', 'api/superadmin/export-data/:jobId'])
  @ApiOperation({ summary: 'Get Superadmin export job status' })
  @ApiResponse({ status: HttpStatus.OK, type: SuperadminExportDataStatusResponseDto })
  /**
   * Primary Intent: Executes the status use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async status(@Param('jobId') jobId: string): Promise<SuperadminExportDataStatusResponseDto> { return this.service.getExportStatus(jobId); }
/**
 * Primary Intent: Executes the download use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /** Streams one completed export artifact after the service validates authorization and token expiry. */
  // SLA: HEAVY
  @Get(['api/superadmin/export-data/download/:jobId/:token', 'api/superadmin/export-data/download/:jobId/:token'])
  @ApiOperation({ summary: 'Download completed Superadmin export' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Protected ZIP download.' })
  /**
   * Primary Intent: Executes the download use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async download(@Param('jobId') jobId: string, @Param('token') token: string, @Res() response: Response): Promise<void> {
    const artifact = await this.service.getDownloadPath(jobId, token);
    response.status(HttpStatus.OK).type(artifact.contentType).setHeader('Content-Disposition', `attachment; filename=superadmin-export-${jobId}.zip`);
    await new Promise<void>((resolve, reject) => { const stream = createReadStream(artifact.path); stream.on('error', reject); stream.on('end', resolve); stream.pipe(response); });
  }
}
