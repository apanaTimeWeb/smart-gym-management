// RESPONSIBILITY: Accepts shared Superadmin export requests and creates the durable asynchronous job record.
// FLOW: SuperadminExportDataController -> SuperadminExportDataService -> SuperadminExportDataJobRepository -> background job queue lifecycle.
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createHmac, timingSafeEqual } from 'node:crypto';
import { SuperadminExportDataAcceptedResponseDto } from '@/backend_superadmin/superadmin_modules/export-data/export-data_responses/superadmin-export-data-accepted-response.dto';
import { SuperadminExportDataRequestDto } from '@/backend_superadmin/superadmin_modules/export-data/export-data_dtos/superadmin-export-data-request.dto';
import { SuperadminExportDataJobRepository } from '@/backend_superadmin/superadmin_modules/export-data/export-data_repositories/superadmin-export-data-job.repository';
import { getRequestContext } from '@/backend_superadmin/superadmin_core/superadmin_core_observability/superadmin-core-request-context';
import { SuperadminCoreTenantAuthorizationService } from '@/backend_superadmin/superadmin_core/superadmin_core_tenancy/superadmin-core-tenant-authorization.service';
import { SuperadminExportDataStatusResponseDto } from '@/backend_superadmin/superadmin_modules/export-data/export-data_responses/superadmin-export-data-status-response.dto';

/**
 * Primary Intent: Defines SuperadminExportDataService as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Injectable()
export class SuperadminExportDataService {
  constructor(private readonly jobRepository: SuperadminExportDataJobRepository, private readonly tenantAuthorization: SuperadminCoreTenantAuthorizationService, private readonly config: ConfigService) {}
/**
 * Primary Intent: Executes the startExport use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /**
 * Primary Intent: Executes the startExport use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async startExport(request: SuperadminExportDataRequestDto): Promise<SuperadminExportDataAcceptedResponseDto> {
    const context = getRequestContext();
    const actorId = context?.userId;
    const requestedTenantIds = [...new Set(request.tenantIds ?? [])];
    if (requestedTenantIds.length && !actorId) throw new ForbiddenException({ error: 'FORBIDDEN', errorCode: 'EXPORT.ACTOR.REQUIRED', message: { key: 'export-data.ERRORS.FORBIDDEN' } });
    if (actorId) {
      for (const requestedTenantId of requestedTenantIds) {
        await this.tenantAuthorization.authorize(actorId, requestedTenantId);
      }
    }
    const tenantId = context?.tenantId ?? requestedTenantIds[0] ?? null;
    const resources = request.resources?.join(',') ?? 'all';
    const jobId = await this.jobRepository.createExportJob(tenantId, `export:${resources}`, actorId ?? null, { resources: request.resources ?? [], tenantIds: requestedTenantIds, format: request.format, deliveryMedium: request.deliveryMedium, requestedByUserId: actorId ?? null });
    return { jobId, status: 'QUEUED' };
  }

  /**
 * Primary Intent: Executes the `getExportStatus` responsibility owned by this superadmin-export-data.service construct.
   * Edge Cases: Invalid or unavailable dependencies must fail fast according to the owning module contract.
   * Side-Effects: Any writes, events, external calls, cache changes, or queue operations are limited to the documented method responsibility.
   * AI-Note: Keep this method single-purpose, preserve explicit return types, and do not move logic across feature boundaries.
   */
  /**
   * Primary Intent: Executes the getExportStatus use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async getExportStatus(jobId: string): Promise<SuperadminExportDataStatusResponseDto> {
    const job = await this.jobRepository.findExportJobById(jobId);
    if (!job) throw new NotFoundException({ error: 'NOT_FOUND', errorCode: 'EXPORT.JOB.NOT_FOUND', message: { key: 'export-data.ERRORS.NOT_FOUND' } });
    await this.authorizeJobAccess(job);
    const expired = Boolean(job.expiresAt && job.expiresAt.getTime() <= Date.now());
    const token = !expired && job.expiresAt ? this.downloadToken(job.id, job.expiresAt) : null;
    return { jobId: job.id, status: String(job.status), ...(job.resultPath && token && job.downloadTokenHash ? { downloadUrl: `/api/superadmin/export-data/download/${job.id}/${token}`, expiresAt: job.expiresAt!.toISOString() } : {}), ...(job.errorCode ? { errorCode: job.errorCode } : {}) };
  }

  /**
 * Primary Intent: Executes the `getDownloadPath` responsibility owned by this superadmin-export-data.service construct.
   * Edge Cases: Invalid or unavailable dependencies must fail fast according to the owning module contract.
   * Side-Effects: Any writes, events, external calls, cache changes, or queue operations are limited to the documented method responsibility.
   * AI-Note: Keep this method single-purpose, preserve explicit return types, and do not move logic across feature boundaries.
   */
  /**
   * Primary Intent: Executes the getDownloadPath use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async getDownloadPath(jobId: string, token: string): Promise<{ path: string; contentType: string }> {
    const job = await this.jobRepository.findExportJobById(jobId);
    if (!job?.resultPath || !job.expiresAt || job.expiresAt.getTime() <= Date.now()) throw new NotFoundException({ error: 'NOT_FOUND', errorCode: 'EXPORT.ARTIFACT.NOT_AVAILABLE', message: { key: 'export-data.ERRORS.NOT_FOUND' } });
    await this.authorizeJobAccess(job);
    const expected = this.downloadToken(job.id, job.expiresAt);
    if (!this.safeEqual(token, expected)) throw new ForbiddenException({ error: 'FORBIDDEN', errorCode: 'EXPORT.ARTIFACT.TOKEN_INVALID', message: { key: 'export-data.ERRORS.FORBIDDEN' } });
    return { path: job.resultPath, contentType: 'application/zip' };
  }

  /**
 * Primary Intent: Executes the `authorizeJobAccess` responsibility owned by this superadmin-export-data.service construct.
   * Edge Cases: Invalid or unavailable dependencies must fail fast according to the owning module contract.
   * Side-Effects: Any writes, events, external calls, cache changes, or queue operations are limited to the documented method responsibility.
   * AI-Note: Keep this method single-purpose, preserve explicit return types, and do not move logic across feature boundaries.
   */
  private async authorizeJobAccess(job: { requestedByUserId: string | null; tenantId: string | null; payload: Record<string, unknown> }): Promise<void> {
    const actorId = getRequestContext()?.userId;
    if (!actorId || job.requestedByUserId !== actorId) throw new ForbiddenException({ error: 'FORBIDDEN', errorCode: 'EXPORT.JOB.ACCESS.FORBIDDEN', message: { key: 'export-data.ERRORS.FORBIDDEN' } });
    const tenantIds = Array.isArray(job.payload.tenantIds) ? job.payload.tenantIds.filter((value): value is string => typeof value === 'string') : (job.tenantId ? [job.tenantId] : []);
    for (const tenantId of [...new Set(tenantIds)]) await this.tenantAuthorization.authorize(actorId, tenantId);
  }

  /**
 * Primary Intent: Executes the `downloadToken` responsibility owned by this superadmin-export-data.service construct.
   * Edge Cases: Invalid or unavailable dependencies must fail fast according to the owning module contract.
   * Side-Effects: Any writes, events, external calls, cache changes, or queue operations are limited to the documented method responsibility.
   * AI-Note: Keep this method single-purpose, preserve explicit return types, and do not move logic across feature boundaries.
   */
  /**
   * Primary Intent: Executes the downloadToken use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  private downloadToken(jobId: string, expiresAt: Date): string { return createHmac('sha256', this.config.getOrThrow<string>('app.exportDownloadSecret')).update(`${jobId}:${expiresAt.toISOString()}`).digest('hex'); }

  /**
 * Primary Intent: Executes the `safeEqual` responsibility owned by this superadmin-export-data.service construct.
   * Edge Cases: Invalid or unavailable dependencies must fail fast according to the owning module contract.
   * Side-Effects: Any writes, events, external calls, cache changes, or queue operations are limited to the documented method responsibility.
   * AI-Note: Keep this method single-purpose, preserve explicit return types, and do not move logic across feature boundaries.
   */
  /**
   * Primary Intent: Executes the safeEqual use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  private safeEqual(a: string, b: string): boolean { const aa = Buffer.from(a); const bb = Buffer.from(b); return aa.length === bb.length && timingSafeEqual(aa, bb); }
}
