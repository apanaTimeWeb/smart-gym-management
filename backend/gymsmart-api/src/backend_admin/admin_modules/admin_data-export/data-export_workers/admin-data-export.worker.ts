// RESPONSIBILITY: Completes Admin tenant-data exports into disk-backed CSV/ZIP artifacts without buffering full datasets in memory.
// FLOW: Redis job -> trusted tenant context -> paginated QueryBuilder batches -> streamed CSV files -> disk ZIP -> object storage -> signed reference.
import { randomUUID } from 'node:crypto';
import { once } from 'node:events';
import { createWriteStream, promises as fs } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { Injectable } from '@nestjs/common';

import { AdminCoreAuditTrailService } from '@/backend_admin/admin_core/admin_core_audit/admin-core-audit-trail.service'
import { AdminCoreRequestContextService } from '@/backend_admin/admin_core/admin_core_context/admin-core-request-context.service'
import { AdminCoreTenantDataSourceManager } from '@/backend_admin/admin_core/admin_core_database/admin-core-tenant-data-source.manager'
import { AdminCoreEventBusService } from '@/backend_admin/admin_core/admin_core_events/admin-core-event-bus.service'
import { CORE_EVENT_REGISTRY } from '@/backend_admin/admin_core/admin_core_events/admin-core-event-registry.constants'
import { AdminCoreJobMessage } from '@/backend_admin/admin_core/admin_core_jobs/admin-core-job-message'
import { AdminCoreMetricsService } from '@/backend_admin/admin_core/admin_core_metrics/admin-core-metrics.service'
import { AdminCoreRedisService } from '@/backend_admin/admin_core/admin_core_redis/admin-core-redis.service'
import { AdminCoreObjectStorageService } from '@/backend_admin/admin_core/admin_core_storage/admin-core-object-storage.service'

import { AdminDataExportRepository } from '@/backend_admin/admin_modules/admin_data-export/data-export_repositories/admin-data-export-repository'
import { AdminDataExportStreamingZipUtils } from '@/backend_admin/admin_modules/admin_data-export/data-export_utils/admin-data-export-streaming-zip.utils'

export interface AdminDataExportJobPayload { dataType?: string; format?: string; gymIds?: string[]; dateFrom?: string; dateTo?: string; }
type ExportRow = Record<string, unknown>;

function csvCell(value: unknown): string {
  const text = value === null || value === undefined ? '' : typeof value === 'object' ? JSON.stringify(value) : String(value);
  return /[",\n\r]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

@Injectable()
/**
 * @description Defines the AdminDataExportWorker boundary for the admin_data-export backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminDataExportWorker {
  private readonly queueKey = 'core:job:v1:admin-data-export';

  constructor(
    private readonly redis: AdminCoreRedisService,
    private readonly context: AdminCoreRequestContextService,
    private readonly repository: AdminDataExportRepository,
    private readonly storage: AdminCoreObjectStorageService,
    private readonly metrics: AdminCoreMetricsService,
    private readonly auditTrail: AdminCoreAuditTrailService,
    private readonly eventBus: AdminCoreEventBusService,
    private readonly tenantDataSourceManager: AdminCoreTenantDataSourceManager,
  ) {}

  /** @description Processes one queued export job. @returns Promise completion. */
  async processNext(): Promise<void> {
    const message = await this.redis.popJson<AdminCoreJobMessage<AdminDataExportJobPayload>>(this.queueKey, 1);
    if (message) await this.processMessage(message);
  }

  /** @description Runs the dedicated data-export worker loop. @returns Never-resolving worker promise. */
  async runForever(): Promise<never> {
    for (;;) {
      const message = await this.redis.popJson<AdminCoreJobMessage<AdminDataExportJobPayload>>(this.queueKey, 0);
      if (message) await this.processMessage(message);
    }
  }

  /** @description Writes one database-backed CSV file incrementally, keeping only one batch in memory. @param tableName Export table. @param outputPath Disk output path. @returns Number of exported rows. */
  private async writeCsvFile(tableName: string, outputPath: string): Promise<number> {
    const stream = createWriteStream(outputPath, { flags: 'wx', encoding: 'utf8' });
    let offset = 0;
    let rowsWritten = 0;
    let headers: string[] | null = null;
    const writeChunk = async (chunk: string): Promise<void> => {
      if (!stream.write(chunk)) await once(stream, 'drain');
    };
    try {
      for (;;) {
        const batch = await this.repository.collectRowsForExport(tableName, 'createdAt', offset, 250);
        if (!batch.length) break;
        headers ??= Object.keys(batch[0]);
        if (rowsWritten === 0) await writeChunk(`${headers.map(csvCell).join(',')}\n`);
        for (const row of batch as ExportRow[]) {
          await writeChunk(`${headers.map((key) => csvCell(row[key])).join(',')}\n`);
          rowsWritten += 1;
        }
        offset += batch.length;
        if (batch.length < 250) break;
      }
      if (!headers) await writeChunk('export_empty\n');
    } finally {
      stream.end();
      await once(stream, 'close');
    }
    return rowsWritten;
  }

  /** @description Writes all selected export files to a temporary directory without retaining full row arrays. @param dataType Export category. @param workDir Temporary directory. @returns File metadata list. */
  private async writeExportFiles(dataType: string, workDir: string): Promise<Array<{ name: string; filePath: string; rows: number }>> {
    const tableNames = await this.repository.listExportTables(dataType);
    const files: Array<{ name: string; filePath: string; rows: number }> = [];
    for (const tableName of tableNames) {
      const filePath = join(workDir, `${tableName}.csv`);
      const rows = await this.writeCsvFile(tableName, filePath);
      files.push({ name: `${tableName}.csv`, filePath, rows });
    }
    if (files.length) return files;
    const filePath = join(workDir, 'export.csv');
    await fs.writeFile(filePath, 'export_empty\n', { flag: 'wx' });
    return [{ name: 'export.csv', filePath, rows: 0 }];
  }

  /** @description Executes one tenant export job with retry/DLQ behavior and disk-backed artifact generation. @param message Queue message. @returns Promise completion. */
  private async processMessage(message: AdminCoreJobMessage<AdminDataExportJobPayload>): Promise<void> {
    this.metrics.recordJobStarted();
    await this.context.run({ tenantId: message.tenantId, userId: message.userId, userRole: message.userRole, requestId: `job-${message.jobId}`, traceId: `job-${message.jobId}`, spanId: `job-${message.attempt}` }, async () => {
      try {
        const job = await this.repository.findByIdOrThrow(message.jobId);
        const workDir = await fs.mkdtemp(join(tmpdir(), `admin-export-${randomUUID()}-`));
        try {
          const files = await this.writeExportFiles(message.payload.dataType ?? 'full_report', workDir);
          const archivePath = join(workDir, `tenant-export-${job.id}.zip`);
          await AdminDataExportStreamingZipUtils.create(files.map(({ name, filePath }) => ({ name, filePath })), archivePath);
          const archiveStat = await fs.stat(archivePath);
          const objectKey = this.storage.createObjectKey('zip');
          await this.storage.putFile(objectKey, archivePath);
          const expiresAt = Math.floor(Date.now() / 1000) + 48 * 60 * 60;
          const downloadReference = this.storage.createSignedReference(objectKey, expiresAt);
          const rowCount = files.reduce((total, file) => total + file.rows, 0);
          const downloadExpiresAt = new Date(expiresAt * 1000).toISOString();
          await this.repository.completeJob(job.id, { objectKey, fileName: `tenant-export-${job.id}.zip`, fileSizeKb: Math.max(1, Math.ceil(archiveStat.size / 1024)), rowCount, downloadReference, downloadExpiresAt });
          await this.auditTrail.record({ action: 'ADMIN_EXPORT_COMPLETED', entityType: 'AdminDataExportJob', entityId: job.id, oldValue: null, newValue: { rowCount, fileName: `tenant-export-${job.id}.zip` }, severity: 'low' as any, module: 'data-export' });
          await this.eventBus.emit(CORE_EVENT_REGISTRY.ADMIN_EXPORT_COMPLETED, { jobId: job.id, tenantId: message.tenantId, rowCount, downloadExpiresAt });
          this.metrics.recordJobCompleted();
        } finally {
          await fs.rm(workDir, { recursive: true, force: true });
        }
      } catch (error) {
        const reason = error instanceof Error ? error.message : 'JOB_FAILED';
        if (message.attempt < 2) {
          await this.redis.pushJson(this.queueKey, { ...message, attempt: message.attempt + 1 });
          return;
        }
        await this.redis.pushJson('core:job:v1:dlq', { ...message, attempt: message.attempt + 1, failedReason: reason.slice(0, 500) });
        await this.repository.failJob(message.jobId, reason);
        await this.auditTrail.record({ action: 'ADMIN_EXPORT_FAILED', entityType: 'AdminDataExportJob', entityId: message.jobId, oldValue: null, newValue: { reason: reason.slice(0, 500) }, severity: 'high' as any, module: 'data-export' });
        this.metrics.recordJobFailed();
      } finally {
        this.tenantDataSourceManager.releaseCurrent();
      }
    });
  }
}
