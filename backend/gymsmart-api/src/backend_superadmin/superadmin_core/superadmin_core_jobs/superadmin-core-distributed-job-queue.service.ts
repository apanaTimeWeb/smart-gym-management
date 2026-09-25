// RESPONSIBILITY: Provides the shared Redis-backed queue primitives for durable Superadmin background jobs.
// FLOW: Feature command -> SuperadminCoreDistributedJobQueueService -> Redis queue key/DLQ key; durable DB state remains owned by feature repositories.
import { Injectable } from '@nestjs/common';
import { SuperadminCoreRedisService } from '@/backend_superadmin/superadmin_core/superadmin_core_cache/superadmin-core-redis.service';

/**
 * Primary Intent: Defines SuperadminDistributedJobEnvelope as the interface-level contract for superadmin-core-distributed-job-queue.service.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export interface SuperadminDistributedJobEnvelope<TPayload extends Record<string, unknown> = Record<string, unknown>> {
  jobId: string;
  queueName: string;
  tenantId: string | null;
  payload: TPayload;
  enqueuedAt: string;
}

/**
 * Primary Intent: Defines SuperadminCoreDistributedJobQueueService as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Injectable()
export class SuperadminCoreDistributedJobQueueService {
  constructor(private readonly redis: SuperadminCoreRedisService) {}
/**
 * Primary Intent: Executes the enqueue use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /** Enqueues a typed job envelope onto the named Redis list. */
  async enqueue<TPayload extends Record<string, unknown>>(job: SuperadminDistributedJobEnvelope<TPayload>): Promise<void> {
    await this.redis.getClient().lpush(job.queueName, JSON.stringify(job));
  }
/**
 * Primary Intent: Executes the enqueueDeadLetter use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /** Places a permanently failed job into the queue-specific dead-letter list. */
  async enqueueDeadLetter<TPayload extends Record<string, unknown>>(job: SuperadminDistributedJobEnvelope<TPayload>): Promise<void> {
    await this.redis.getClient().lpush(`${job.queueName}:dlq`, JSON.stringify(job));
  }
}
