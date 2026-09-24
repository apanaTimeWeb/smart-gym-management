// RESPONSIBILITY: Owns query HTTP transport for health, schedule, job status, and protected downloads.
// FLOW: HTTP query -> owning service -> persisted state/artifact -> response or stream.
import { Controller, Get, HttpStatus, Param, Query, Res, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { createReadStream } from 'node:fs';
import type { Response } from 'express';
import { SuperadminCoreJwtAuthGuard } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-jwt-auth.guard';
import { SuperadminCoreRolesGuard } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-auth.constants';
import { SuperadminSystemOpsBackupsHealthService } from '@/backend_superadmin/superadmin_modules/system-ops/backups/backups_services/superadmin-system-ops-backups-health.service';
import { SuperadminSystemOpsBackupsDownloadService } from '@/backend_superadmin/superadmin_modules/system-ops/backups/backups_services/superadmin-system-ops-backups-download.service';
import { SuperadminSystemOpsBackupsScheduleService } from '@/backend_superadmin/superadmin_modules/system-ops/backups/backups_services/superadmin-system-ops-backups-schedule.service';
import { SuperadminSystemOpsBackupJobRepository } from '@/backend_superadmin/superadmin_modules/system-ops/backups/backups_repositories/superadmin-system-ops-backup-job.repository';
import { SuperadminSystemOpsBackupsJobStatusResponseDto } from '@/backend_superadmin/superadmin_modules/system-ops/backups/backups_responses/superadmin-system-ops-backups-job-status-response.dto';

/**
 * Primary Intent: Defines SuperadminSystemOpsBackupsOperationsQueryController as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@ApiTags('backupsoperationsquery')
@Controller()
@UseGuards(SuperadminCoreJwtAuthGuard, SuperadminCoreRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminSystemOpsBackupsOperationsQueryController {
  constructor(
    private readonly healthService:SuperadminSystemOpsBackupsHealthService,
    private readonly downloadService:SuperadminSystemOpsBackupsDownloadService,
    private readonly scheduleService:SuperadminSystemOpsBackupsScheduleService,
    private readonly jobs:SuperadminSystemOpsBackupJobRepository,
  ) {}
/**
 * Primary Intent: Executes the schedule use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /** Returns the persisted backup schedule required by the frontend. */
  // SLA: HEAVY
  // SLA: FAST
  @Get('superadmin/system-ops/backups/schedule')
  @ApiResponse({status:HttpStatus.OK,description:'Persisted backup schedule.'})
  @ApiOperation({ summary: 'schedule' })
  /**
   * Primary Intent: Executes the schedule use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async schedule(): Promise<Awaited<ReturnType<SuperadminSystemOpsBackupsScheduleService['findBackupsSchedule']>>> {
    return this.scheduleService.findBackupsSchedule();
  }
/**
 * Primary Intent: Executes the health use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /** Returns live backup health from persisted backup records. */
    @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  // SLA: FAST
@Get('superadmin/system-ops/backups/health')
  @Get('api/superadmin/system-ops/backups/health')
  @ApiResponse({status:HttpStatus.OK,description:'Backup health.'})
  @ApiOperation({ summary: 'health' })
  /**
   * Primary Intent: Executes the health use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async health(@Query() query: Record<string, string>): Promise<Awaited<ReturnType<SuperadminSystemOpsBackupsHealthService['findBackupsHealth']>>> {
    return this.healthService.findBackupsHealth({ query });
  }
/**
 * Primary Intent: Executes the jobStatus use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /** Returns a durable job status for polling. */
  // SLA: HEAVY
  // SLA: FAST
  @Get('superadmin/system-ops/backups/jobs/:jobId')
  @ApiResponse({status:HttpStatus.OK,type:SuperadminSystemOpsBackupsJobStatusResponseDto,description:'Backup job status.'})
  @ApiOperation({ summary: 'jobStatus' })
  /**
   * Primary Intent: Executes the jobStatus use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async jobStatus(@Param('jobId') jobId:string):Promise<SuperadminSystemOpsBackupsJobStatusResponseDto>{ return (await this.jobs.findByIdOrThrow(jobId)) as SuperadminSystemOpsBackupsJobStatusResponseDto; }
/**
 * Primary Intent: Executes the download use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /** Returns the protected application download resource metadata. */
  // SLA: HEAVY
  @Get('superadmin/system-ops/backups/:id/download')
  @ApiResponse({status:HttpStatus.OK,description:'Protected backup download URL.'})
  @ApiOperation({ summary: 'download' })
  /**
   * Primary Intent: Executes the download use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async download(@Param('id') id:string):Promise<SuperadminSystemOpsBackupsJobStatusResponseDto>{ return this.downloadService.findBackupsDownload(id); }
/**
 * Primary Intent: Executes the downloadFile use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /** Streams a completed backup artifact from protected storage after authorization. */
  // SLA: HEAVY
  @Get('superadmin/system-ops/backups/:id/download/file')
  @ApiResponse({status:HttpStatus.OK,description:'Protected backup artifact.'})
  @ApiOperation({ summary: 'downloadFile' })
  /**
   * Primary Intent: Executes the downloadFile use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async downloadFile(@Param('id') id:string,@Res() response:Response):Promise<void>{
    const artifact=await this.downloadService.findBackupsArtifact(id);
    response.status(HttpStatus.OK).type('application/octet-stream').setHeader('Content-Disposition',`attachment; filename=backup-${id}.dump`);
    await new Promise<void>((resolve,reject)=>{ const stream=createReadStream(artifact.path); stream.on('error',reject); stream.on('end',resolve); stream.pipe(response); });
  }
}
