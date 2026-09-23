// RESPONSIBILITY: Accepts shared Superadmin export requests and creates the durable asynchronous job record.
// FLOW: ExportDataController -> ExportDataService -> ExportDataJobRepository -> background job queue lifecycle.
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createHmac, timingSafeEqual } from 'node:crypto';
import { ExportDataAcceptedResponseDto } from '@/backend_superadmin/modules/superadmin/export-data/responses/export-data-accepted-response.dto';
import { ExportDataRequestDto } from '@/backend_superadmin/modules/superadmin/export-data/dtos/export-data-request.dto';
import { ExportDataJobRepository } from '@/backend_superadmin/modules/superadmin/export-data/repositories/export-data-job.repository';
import { getRequestContext } from '@/backend_superadmin/core/observability/request-context';
import { TenantAuthorizationService } from '@/backend_superadmin/core/tenancy/tenant-authorization.service';
import { ExportDataStatusResponseDto } from '@/backend_superadmin/modules/superadmin/export-data/responses/export-data-status-response.dto';

@Injectable()
export class ExportDataService {
  constructor(private readonly jobRepository: ExportDataJobRepository, private readonly tenantAuthorization: TenantAuthorizationService, private readonly config: ConfigService) {}

  /** Creates the export job and returns immediately so the HTTP request remains bounded. */
  async startExport(request: ExportDataRequestDto): Promise<ExportDataAcceptedResponseDto> {
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

  /** Returns the durable export job state without exposing internal queue details. */
  async getExportStatus(jobId: string): Promise<ExportDataStatusResponseDto> {
    const job = await this.jobRepository.findExportJobById(jobId);
    if (!job) throw new NotFoundException({ error: 'NOT_FOUND', errorCode: 'EXPORT.JOB.NOT_FOUND', message: { key: 'export-data.ERRORS.NOT_FOUND' } });
    await this.authorizeJobAccess(job);
    const expired = Boolean(job.expiresAt && job.expiresAt.getTime() <= Date.now());
    const token = !expired && job.expiresAt ? this.downloadToken(job.id, job.expiresAt) : null;
    return { jobId: job.id, status: String(job.status), ...(job.resultPath && token && job.downloadTokenHash ? { downloadUrl: `/api/superadmin/export-data/download/${job.id}/${token}`, expiresAt: job.expiresAt!.toISOString() } : {}), ...(job.errorCode ? { errorCode: job.errorCode } : {}) };
  }

  /** Resolves a protected archive path only when its signed token and expiry are valid. */
  async getDownloadPath(jobId: string, token: string): Promise<{ path: string; contentType: string }> {
    const job = await this.jobRepository.findExportJobById(jobId);
    if (!job?.resultPath || !job.expiresAt || job.expiresAt.getTime() <= Date.now()) throw new NotFoundException({ error: 'NOT_FOUND', errorCode: 'EXPORT.ARTIFACT.NOT_AVAILABLE', message: { key: 'export-data.ERRORS.NOT_FOUND' } });
    await this.authorizeJobAccess(job);
    const expected = this.downloadToken(job.id, job.expiresAt);
    if (!this.safeEqual(token, expected)) throw new ForbiddenException({ error: 'FORBIDDEN', errorCode: 'EXPORT.ARTIFACT.TOKEN_INVALID', message: { key: 'export-data.ERRORS.FORBIDDEN' } });
    return { path: job.resultPath, contentType: 'application/zip' };
  }

  /** Enforces actor ownership and re-checks every tenant scope before exposing job state or artifacts. */
  private async authorizeJobAccess(job: { requestedByUserId: string | null; tenantId: string | null; payload: Record<string, unknown> }): Promise<void> {
    const actorId = getRequestContext()?.userId;
    if (!actorId || job.requestedByUserId !== actorId) throw new ForbiddenException({ error: 'FORBIDDEN', errorCode: 'EXPORT.JOB.ACCESS.FORBIDDEN', message: { key: 'export-data.ERRORS.FORBIDDEN' } });
    const tenantIds = Array.isArray(job.payload.tenantIds) ? job.payload.tenantIds.filter((value): value is string => typeof value === 'string') : (job.tenantId ? [job.tenantId] : []);
    for (const tenantId of [...new Set(tenantIds)]) await this.tenantAuthorization.authorize(actorId, tenantId);
  }

  /** Generates the HMAC token used by status and download responses. */
  private downloadToken(jobId: string, expiresAt: Date): string { return createHmac('sha256', this.config.getOrThrow<string>('app.exportDownloadSecret')).update(`${jobId}:${expiresAt.toISOString()}`).digest('hex'); }

  /** Compares signed tokens without leaking timing differences. */
  private safeEqual(a: string, b: string): boolean { const aa = Buffer.from(a); const bb = Buffer.from(b); return aa.length === bb.length && timingSafeEqual(aa, bb); }
}
