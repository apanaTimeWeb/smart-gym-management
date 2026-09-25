// RESPONSIBILITY: Owns Gym export HTTP compatibility and asynchronous export command transport; no CSV generation here.
// FLOW: HTTP request -> operational service -> queued export job/download lifecycle -> canonical response envelope.
import { Controller, Get, HttpCode, HttpStatus, Post, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuperadminCoreJwtAuthGuard } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-jwt-auth.guard';
import { SuperadminCoreRolesGuard } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-auth.constants';
import { SuperadminCoreRateLimitGuard } from '@/backend_superadmin/superadmin_core/superadmin_core_cache/superadmin-core-rate-limit.guard';
import { RequireIdempotencyKey } from '@/backend_superadmin/superadmin_core/superadmin_core_cache/superadmin-core-idempotency.decorator';
import { SuperadminGymsOperationalService } from '@/backend_superadmin/superadmin_modules/gyms/gyms_services/superadmin-gyms-operational.service';
import { SuperadminGymsExportDownloadResponseDto, SuperadminGymsExportQueuedResponseDto } from '@/backend_superadmin/superadmin_modules/gyms/gyms_responses/superadmin-gyms-export-job-status-response.dto';

/**
 * Primary Intent: Owns the frontend-compatible GET export contract and canonical async export command. Edge Cases: GET must not perform heavy work; POST is idempotent.
 * Side-Effects: Export jobs may be queued and protected download URLs returned. AI-Note: Keep heavy generation out of the HTTP request thread.
 */
@ApiTags('gyms-export')
@Controller()
@UseGuards(SuperadminCoreJwtAuthGuard, SuperadminCoreRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminGymsExportController {
  constructor(private readonly operationalService: SuperadminGymsOperationalService) {}
  /**
   * Primary Intent: Provides the legacy frontend's GET export contract while preserving the asynchronous job architecture.
   * Edge Cases: GET clients cannot provide an idempotency header, so repeated identical requests must be made safe by deterministic job reuse at the service boundary.
   * Side-Effects: May queue an export job and returns its protected download URL; it never performs heavy CSV generation inline.
   * AI-Note: Keep this compatibility route read-compatible with the existing frontend while retaining the versioned POST command as the canonical mutation.
   */
  // SLA: HEAVY
  @Get(['superadmin/gyms/export', 'superadmin/gyms/export'])
  @ApiResponse({ status: HttpStatus.OK, type: SuperadminGymsExportDownloadResponseDto })
  @ApiOperation({ summary: 'exportGet' })
  /**
   * Primary Intent: Executes the exportGet use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async exportGet(@Query('search') search?: string, @Query('status') status?: string, @Query('plan') plan?: string): Promise<SuperadminGymsExportDownloadResponseDto> {
    const job = await this.operationalService.exportGymsCompatibility({ search, status, plan });
    return { downloadUrl: job.downloadUrl };
  }
/**
 * Primary Intent: Executes the export use case within the owning backend feature boundary. Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them. AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */
  /** Starts an asynchronous Gym CSV export job using the architecture-mandated POST command contract. */
  @RequireIdempotencyKey()
  // SLA: HEAVY
  @Post(['superadmin/gyms/export', 'superadmin/gyms/export'])
  @HttpCode(HttpStatus.ACCEPTED)
  @UseGuards(SuperadminCoreRateLimitGuard)
  @ApiOperation({ summary: 'Start asynchronous gym CSV export' })
  @ApiResponse({ status: HttpStatus.ACCEPTED, type: SuperadminGymsExportQueuedResponseDto, description: 'Gym export queued.' })
  /**
   * Primary Intent: Executes the export use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async export(@Query('search') search?: string, @Query('status') status?: string, @Query('plan') plan?: string): Promise<SuperadminGymsExportQueuedResponseDto> {
    return this.operationalService.exportGyms({ search, status, plan });
  }
}
