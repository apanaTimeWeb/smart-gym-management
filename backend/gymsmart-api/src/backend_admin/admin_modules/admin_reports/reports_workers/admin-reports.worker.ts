// RESPONSIBILITY: Completes Admin report export jobs with durable PDF/XLSX artifacts and bounded retry/DLQ handling.
// FLOW: Redis job -> trusted tenant context -> report snapshot -> format generator -> object storage -> completed/failed state.
import { Injectable } from '@nestjs/common';

import { AdminCoreRequestContextService } from '@/backend_admin/admin_core/admin_core_context/admin-core-request-context.service'
import { AdminCoreJobMessage } from '@/backend_admin/admin_core/admin_core_jobs/admin-core-job-message'
import { AdminCoreMetricsService } from '@/backend_admin/admin_core/admin_core_metrics/admin-core-metrics.service'
import { AdminCoreRedisService } from '@/backend_admin/admin_core/admin_core_redis/admin-core-redis.service'
import { AdminCoreObjectStorageService } from '@/backend_admin/admin_core/admin_core_storage/admin-core-object-storage.service'

import { AdminReportsRepository } from '@/backend_admin/admin_modules/admin_reports/reports_repositories/admin-reports-repository'
import { AdminReportsPdfGeneratorUtils } from '@/backend_admin/admin_modules/admin_reports/reports_utils/admin-reports-pdf-generator.utils'
import { AdminReportsXlsxGeneratorUtils } from '@/backend_admin/admin_modules/admin_reports/reports_utils/admin-reports-xlsx-generator.utils'

import { AdminReportsFormat } from '@/backend_admin/admin_modules/admin_reports/admin-reports.constants'

export interface AdminReportsJobPayload { tab?: string; format?: AdminReportsFormat; }

function rowsFromPayload(payload: Record<string, unknown>): string[][] {
  const rows: string[][] = [];
  for (const [section, value] of Object.entries(payload)) {
    if (section === 'objectKey' || section === 'fileName' || section.endsWith('At')) continue;
    if (Array.isArray(value)) {
      value.forEach((item, index) => rows.push([section, String(index + 1), typeof item === 'object' ? JSON.stringify(item) : String(item)]));
      continue;
    }
    rows.push([section, typeof value === 'object' && value !== null ? JSON.stringify(value) : String(value ?? '')]);
  }
  return rows.length ? rows : [['status', 'No report rows were available for the selected filters.']];
}

function exportConfig(format: AdminReportsFormat): { extension: string; contentType: string } {
  return format === 'excel'
    ? { extension: 'xlsx', contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }
    : { extension: 'pdf', contentType: 'application/pdf' };
}

@Injectable()
/**
 * @description Defines the AdminReportsWorker boundary for the admin_reports backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminReportsWorker {
  private readonly queueKey = 'core:job:v1:admin-reports';

  constructor(private readonly redis: AdminCoreRedisService, private readonly context: AdminCoreRequestContextService, private readonly repository: AdminReportsRepository, private readonly storage: AdminCoreObjectStorageService, private readonly metrics: AdminCoreMetricsService) {}

  /** @description Processes one queued report job. @returns Promise completion. */
  async processNext(): Promise<void> {
    const message = await this.redis.popJson<AdminCoreJobMessage<AdminReportsJobPayload>>(this.queueKey, 1);
    if (message) await this.processMessage(message);
  }

  /** @description Runs the dedicated report worker loop. @returns Never-resolving worker promise. */
  async runForever(): Promise<never> {
    for (;;) { const message = await this.redis.popJson<AdminCoreJobMessage<AdminReportsJobPayload>>(this.queueKey, 0); if (message) await this.processMessage(message); }
  }

  private async processMessage(message: AdminCoreJobMessage<AdminReportsJobPayload>): Promise<void> {
    this.metrics.recordJobStarted();
    await this.context.run({ tenantId: message.tenantId, userId: message.userId, userRole: message.userRole, requestId: `job-${message.jobId}`, traceId: `job-${message.jobId}`, spanId: `job-${message.attempt}` }, async () => {
      try {
        const job = await this.repository.findByIdOrThrow(message.jobId);
        const snapshot = await this.repository.findLatestReadModel();
        const payload = (snapshot?.data as any) ?? {};
        const format = message.payload.format === 'excel' ? 'excel' : 'pdf';
        const { extension } = exportConfig(format as any);
        const rows = rowsFromPayload(payload);
        const content = format === 'excel' ? AdminReportsXlsxGeneratorUtils.generate(`Admin Report - ${message.payload.tab ?? 'report'}`, rows) : AdminReportsPdfGeneratorUtils.generate(`Admin Report - ${message.payload.tab ?? 'report'}`, rows);
        const objectKey = this.storage.createObjectKey(extension);
        await this.storage.put(objectKey, content);
        await this.repository.completeJob(job.id, { objectKey, fileName: `report-${job.id}.${extension}`, fileSizeKb: Math.max(1, Math.ceil(content.length / 1024)) });
        this.metrics.recordJobCompleted();
      } catch (error) {
        const reason = error instanceof Error ? error.message : 'JOB_FAILED';
        if (message.attempt < 2) { await this.redis.pushJson(this.queueKey, { ...message, attempt: message.attempt + 1 }); return; }
        await this.redis.pushJson('core:job:v1:dlq', { ...message, attempt: message.attempt + 1, failedReason: reason.slice(0, 500) });
        await this.repository.failJob(message.jobId, reason); this.metrics.recordJobFailed();
      }
    });
  }
}
