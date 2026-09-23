// RESPONSIBILITY: Consumes the distributed Superadmin export queue and completes exports outside the HTTP request lifecycle.
// FLOW: Redis BRPOP -> durable job ACTIVE -> paginated archive -> protected storage -> email -> completion event / DLQ.
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PinoLogger } from 'nestjs-pino';
import { SuperadminRedisService } from '@/backend_superadmin/superadmin_core/cache/superadmin-core-redis.service';
import { SuperadminEventBusService } from '@/backend_superadmin/superadmin_core/events/superadmin-core-event-bus.service';
import { SuperadminTenantRegistryRepository } from '@/backend_superadmin/superadmin_core/tenancy/superadmin-core-tenant-registry.repository';
import { EVENT_REGISTRY } from '@/backend_superadmin/superadmin_core/events/superadmin-core-event-registry.constants';
import { SuperadminExportDataArchiveService } from '@/backend_superadmin/superadmin_modules/export-data/services/superadmin-export-data-archive.service';
import { SuperadminExportDataDeliveryService } from '@/backend_superadmin/superadmin_modules/export-data/services/superadmin-export-data-delivery.service';
import { ExportDataDeliveryMedium } from '@/backend_superadmin/superadmin_modules/export-data/dtos/superadmin-export-data-request.dto';
import { SuperadminExportDataStorageAdapter } from '@/backend_superadmin/superadmin_modules/export-data/adapters/superadmin-export-data-storage.adapter';
import { SuperadminExportDataJobRepository } from '@/backend_superadmin/superadmin_modules/export-data/repositories/superadmin-export-data-job.repository';
import { EXPORT_DATA_QUEUE_NAME } from '@/backend_superadmin/superadmin_modules/export-data/superadmin-export-data.constants';
import type { ExportDataResource } from '@/backend_superadmin/superadmin_modules/export-data/dtos/superadmin-export-data-request.dto';
import { createHmac } from 'node:crypto';

interface ExportQueuePayload { jobId: string; queueName: string; tenantId: string | null; payload: { resources?: ExportDataResource[]; tenantIds?: string[]; format?: 'ZIP' | 'CSV'; deliveryMedium?: ExportDataDeliveryMedium; }; }

@Injectable()
export class SuperadminExportDataWorkerService implements OnModuleInit, OnModuleDestroy {
  private running = true;
  private readonly secret: string;
  constructor(
    private readonly redis: SuperadminRedisService,
    private readonly jobs: SuperadminExportDataJobRepository,
    private readonly archive: SuperadminExportDataArchiveService,
    private readonly storage: SuperadminExportDataStorageAdapter,
    private readonly delivery: SuperadminExportDataDeliveryService,
    private readonly eventBus: SuperadminEventBusService,
    private readonly tenantRegistry: SuperadminTenantRegistryRepository,
    private readonly config: ConfigService,
    private readonly logger: PinoLogger,
  ) { this.secret = config.getOrThrow<string>('app.exportDownloadSecret'); }

  /** Starts the distributed queue consumer; Redis provides cross-instance job ownership. */
  async onModuleInit(): Promise<void> { void this.consume(); }

  /** Stops queue consumption at the module lifecycle boundary. */
  async onModuleDestroy(): Promise<void> { this.running = false; }

  /** Blocks on the Redis queue and hands each claimed job to one bounded processor. */
  private async consume(): Promise<void> {
    while (this.running) {
      const result = await this.redis.getClient().brpop(EXPORT_DATA_QUEUE_NAME, 5);
      if (!result) continue;
      const raw = result[1];
      try { await this.process(JSON.parse(raw) as ExportQueuePayload); }
      catch (error) { this.logger.error({ err: error, context: SuperadminExportDataWorkerService.name }, 'Export worker iteration failed'); }
    }
  }

  /** Processes one durable export job and moves failures to the queue DLQ. */
  private async process(job: ExportQueuePayload): Promise<void> {
    await this.jobs.markActive(job.jobId);
    try {
      const resources = job.payload.resources ?? [];
      const tenantIds = job.payload.tenantIds ?? (job.tenantId ? [job.tenantId] : []);
      const archive = await this.archive.build(resources, tenantIds, job.jobId);
      const resultPath = await this.storage.store(job.jobId, archive);
      const expiresAt = this.expiryDate();
      const token = this.downloadToken(job.jobId, expiresAt);
      const target = await this.resolveDeliveryTarget(job.tenantId, typeof job.payload.deliveryMedium === 'string' ? job.payload.deliveryMedium as ExportDataDeliveryMedium : ExportDataDeliveryMedium.EMAIL);
      await this.delivery.deliver(target, this.downloadUrl(job.jobId, token), expiresAt.toISOString());
      await this.jobs.markCompleted(job.jobId, resultPath, token, expiresAt);
      this.eventBus.emit(EVENT_REGISTRY.SUPERADMIN_EXPORT_COMPLETED, { jobId: job.jobId, actorId: typeof (job.payload as any).requestedByUserId === 'string' ? (job.payload as any).requestedByUserId : null, tenantId: job.tenantId, downloadUrl: this.downloadUrl(job.jobId, token), expiresAt: expiresAt.toISOString() });
    } catch (error) {
      await this.jobs.markFailed(job.jobId, 'EXPORT.JOB.FAILED');
      await this.redis.getClient().lpush(`${EXPORT_DATA_QUEUE_NAME}:dlq`, JSON.stringify(job));
      this.logger.error({ err: error, jobId: job.jobId, context: SuperadminExportDataWorkerService.name }, 'Superadmin export job failed');
    }
  }

  /** Resolves email, phone and requested proof-of-delivery medium from trusted tenant metadata. */
  private async resolveDeliveryTarget(tenantId: string | null | undefined, medium: ExportDataDeliveryMedium): Promise<{ email: string | null; phone: string | null; medium: ExportDataDeliveryMedium }> {
    if (!tenantId) return { email: this.config.get<string>('app.seedSuperadminEmail') || null, phone: null, medium };
    const contact = await this.tenantRegistry.findTenantAdminContact(tenantId);
    return { email: contact?.email || this.config.get<string>('app.seedSuperadminEmail') || null, phone: contact?.phone || null, medium };
  }

  /** Calculates the configured 24-48 hour export link lifetime. */
  private expiryDate(): Date { return new Date(Date.now() + this.config.getOrThrow<number>('app.exportDownloadTtlHours') * 3_600_000); }

  /** Generates a deterministic HMAC token that can be revalidated without storing plaintext secrets. */
  private downloadToken(jobId: string, expiresAt: Date): string { return createHmac('sha256', this.secret).update(`${jobId}:${expiresAt.toISOString()}`).digest('hex'); }

  /** Builds the protected application download route. */
  private downloadUrl(jobId: string, token: string): string { return `/api/superadmin/export-data/download/${jobId}/${token}`; }
}
