// RESPONSIBILITY: Consumes the distributed Superadmin export queue and completes exports outside the HTTP request lifecycle.
// FLOW: Redis BRPOP -> durable job ACTIVE -> paginated archive -> protected storage -> email -> completion event / DLQ.
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PinoLogger } from 'nestjs-pino';
import { SuperadminCoreRedisService } from '@/backend_superadmin/superadmin_core/superadmin_core_cache/superadmin-core-redis.service';
import { SuperadminCoreEventBusService } from '@/backend_superadmin/superadmin_core/superadmin_core_events/superadmin-core-event-bus.service';
import { SuperadminCoreTenantRegistryRepository } from '@/backend_superadmin/superadmin_core/superadmin_core_tenancy/superadmin-core-tenant-registry.repository';
import { EVENT_REGISTRY } from '@/backend_superadmin/superadmin_core/superadmin_core_events/superadmin-core-event-registry.constants';
import { SuperadminExportDataArchiveService } from '@/backend_superadmin/superadmin_modules/export-data/export-data_services/superadmin-export-data-archive.service';
import { SuperadminExportDataDeliveryService } from '@/backend_superadmin/superadmin_modules/export-data/export-data_services/superadmin-export-data-delivery.service';
import { ExportDataDeliveryMedium } from '@/backend_superadmin/superadmin_modules/export-data/superadmin-export-data-request.constants';
import { SuperadminExportDataStorageAdapter } from '@/backend_superadmin/superadmin_modules/export-data/export-data_adapters/superadmin-export-data-storage.adapter';
import { SuperadminExportDataJobRepository } from '@/backend_superadmin/superadmin_modules/export-data/export-data_repositories/superadmin-export-data-job.repository';
import { EXPORT_DATA_QUEUE_NAME } from '@/backend_superadmin/superadmin_modules/export-data/superadmin-export-data.constants';
import type { ExportDataResource } from '@/backend_superadmin/superadmin_modules/export-data/superadmin-export-data-request.constants';
import { createHmac } from 'node:crypto';

/**
 * Primary Intent: Defines the ExportQueuePayload type contract for this Superadmin backend feature and its frozen API/data boundary.
 * Edge Cases: Preserve exact property names, nullability, enums, and optional-field semantics when modifying this contract.
 * Side-Effects: None directly; changes can alter request/response compatibility and downstream consumers.
 * AI-Note: Treat this declaration as an explicit blueprint. Do not widen, narrow, rename, or reinterpret fields without coordinated contract review.
 */
interface ExportQueuePayload { jobId: string; queueName: string; tenantId: string | null; payload: { resources?: ExportDataResource[]; tenantIds?: string[]; format?: 'ZIP' | 'CSV'; deliveryMedium?: ExportDataDeliveryMedium; requestedByUserId?: string | null; }; }

/**
 * Primary Intent: Defines SuperadminExportDataWorkerService as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Injectable()
export class SuperadminExportDataWorkerService implements OnModuleInit, OnModuleDestroy {
  private running = true;
  private readonly secret: string;
  private subscriberClient: any;
  constructor(
    private readonly redis: SuperadminCoreRedisService,
    private readonly jobs: SuperadminExportDataJobRepository,
    private readonly archive: SuperadminExportDataArchiveService,
    private readonly storage: SuperadminExportDataStorageAdapter,
    private readonly delivery: SuperadminExportDataDeliveryService,
    private readonly eventBus: SuperadminCoreEventBusService,
    private readonly tenantRegistry: SuperadminCoreTenantRegistryRepository,
    private readonly config: ConfigService,
    private readonly logger: PinoLogger,
  ) { this.secret = config.getOrThrow<string>('app.exportDownloadSecret');
    this.subscriberClient = this.redis.getClient().duplicate(); }

  /**
 * Primary Intent: Executes the `onModuleInit` responsibility owned by this superadmin-export-data-worker.service construct.
   * Edge Cases: Invalid or unavailable dependencies must fail fast according to the owning module contract.
   * Side-Effects: Any writes, events, external calls, cache changes, or queue operations are limited to the documented method responsibility.
   * AI-Note: Keep this method single-purpose, preserve explicit return types, and do not move logic across feature boundaries.
   */
  /**
   * Primary Intent: Executes the onModuleInit use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async onModuleInit(): Promise<void> { void this.consume(); }

  /**
 * Primary Intent: Executes the `onModuleDestroy` responsibility owned by this superadmin-export-data-worker.service construct.
   * Edge Cases: Invalid or unavailable dependencies must fail fast according to the owning module contract.
   * Side-Effects: Any writes, events, external calls, cache changes, or queue operations are limited to the documented method responsibility.
   * AI-Note: Keep this method single-purpose, preserve explicit return types, and do not move logic across feature boundaries.
   */
  /**
   * Primary Intent: Executes the onModuleDestroy use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async onModuleDestroy(): Promise<void> { this.running = false; this.subscriberClient?.quit(); }

  /**
 * Primary Intent: Executes the `consume` responsibility owned by this superadmin-export-data-worker.service construct.
   * Edge Cases: Invalid or unavailable dependencies must fail fast according to the owning module contract.
   * Side-Effects: Any writes, events, external calls, cache changes, or queue operations are limited to the documented method responsibility.
   * AI-Note: Keep this method single-purpose, preserve explicit return types, and do not move logic across feature boundaries.
   */
  /**
   * Primary Intent: Executes the consume use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  private async consume(): Promise<void> {
    while (this.running) {
      let result; try { result = await this.subscriberClient.brpop(EXPORT_DATA_QUEUE_NAME, 5); } catch(e) { await new Promise(r => setTimeout(r, 1000)); continue; }
      if (!result) continue;
      const raw = result[1];
      try { await this.process(JSON.parse(raw) as ExportQueuePayload); }
      /**
       * Primary Intent: Executes the catch use case within its owning backend boundary.
       * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
       * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
       * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
       */
      catch (error) { this.logger.error({ err: error, context: SuperadminExportDataWorkerService.name }, 'Export worker iteration failed'); }
    }
  }

  /**
 * Primary Intent: Executes the `process` responsibility owned by this superadmin-export-data-worker.service construct.
   * Edge Cases: Invalid or unavailable dependencies must fail fast according to the owning module contract.
   * Side-Effects: Any writes, events, external calls, cache changes, or queue operations are limited to the documented method responsibility.
   * AI-Note: Keep this method single-purpose, preserve explicit return types, and do not move logic across feature boundaries.
   */
  /**
   * Primary Intent: Executes the process use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
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
      this.eventBus.emit(EVENT_REGISTRY.SUPERADMIN_EXPORT_COMPLETED, { jobId: job.jobId, actorId: job.payload.requestedByUserId ?? null, tenantId: job.tenantId, downloadUrl: this.downloadUrl(job.jobId, token), expiresAt: expiresAt.toISOString() });
    } catch (error) {
      await this.jobs.markFailed(job.jobId, 'EXPORT.JOB.FAILED');
      await this.redis.getClient().lpush(`${EXPORT_DATA_QUEUE_NAME}:dlq`, JSON.stringify(job));
      this.logger.error({ err: error, jobId: job.jobId, context: SuperadminExportDataWorkerService.name }, 'Superadmin export job failed');
    }
  }

  /**
 * Primary Intent: Executes the `resolveDeliveryTarget` responsibility owned by this superadmin-export-data-worker.service construct.
   * Edge Cases: Invalid or unavailable dependencies must fail fast according to the owning module contract.
   * Side-Effects: Any writes, events, external calls, cache changes, or queue operations are limited to the documented method responsibility.
   * AI-Note: Keep this method single-purpose, preserve explicit return types, and do not move logic across feature boundaries.
   */
  /**
   * Primary Intent: Executes the resolveDeliveryTarget use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  private async resolveDeliveryTarget(tenantId: string | null | undefined, medium: ExportDataDeliveryMedium): Promise<{ email: string | null; phone: string | null; medium: ExportDataDeliveryMedium }> {
    if (!tenantId) return { email: this.config.get<string>('app.seedSuperadminEmail') || null, phone: null, medium };
    const contact = await this.tenantRegistry.findTenantAdminContact(tenantId);
    return { email: contact?.email || this.config.get<string>('app.seedSuperadminEmail') || null, phone: contact?.phone || null, medium };
  }

  /**
 * Primary Intent: Executes the `expiryDate` responsibility owned by this superadmin-export-data-worker.service construct.
   * Edge Cases: Invalid or unavailable dependencies must fail fast according to the owning module contract.
   * Side-Effects: Any writes, events, external calls, cache changes, or queue operations are limited to the documented method responsibility.
   * AI-Note: Keep this method single-purpose, preserve explicit return types, and do not move logic across feature boundaries.
   */
  /**
   * Primary Intent: Executes the expiryDate use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  private expiryDate(): Date { return new Date(Date.now() + this.config.getOrThrow<number>('app.exportDownloadTtlHours') * 3_600_000); }

  /**
 * Primary Intent: Executes the `downloadToken` responsibility owned by this superadmin-export-data-worker.service construct.
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
  private downloadToken(jobId: string, expiresAt: Date): string { return createHmac('sha256', this.secret).update(`${jobId}:${expiresAt.toISOString()}`).digest('hex'); }

  /**
 * Primary Intent: Executes the `downloadUrl` responsibility owned by this superadmin-export-data-worker.service construct.
   * Edge Cases: Invalid or unavailable dependencies must fail fast according to the owning module contract.
   * Side-Effects: Any writes, events, external calls, cache changes, or queue operations are limited to the documented method responsibility.
   * AI-Note: Keep this method single-purpose, preserve explicit return types, and do not move logic across feature boundaries.
   */
  /**
   * Primary Intent: Executes the downloadUrl use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  private downloadUrl(jobId: string, token: string): string { return `${process.env.API_URL || 'http://localhost:5000'}/superadmin/export-data/download/${jobId}/${token}`; }
}


