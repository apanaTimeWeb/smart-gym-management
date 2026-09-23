// RESPONSIBILITY: Provides the shared Redis-backed queue primitives for durable Superadmin background jobs.
// FLOW: Feature command -> SuperadminDistributedJobQueueService -> Redis queue key/DLQ key; durable DB state remains owned by feature repositories.
import { Injectable } from '@nestjs/common';
import { SuperadminRedisService } from '@/backend_superadmin/superadmin_core/cache/superadmin-core-redis.service';

export interface SuperadminDistributedJobEnvelope<TPayload extends Record<string, unknown> = Record<string, unknown>> {
  jobId: string;
  queueName: string;
  tenantId: string | null;
  payload: TPayload;
  enqueuedAt: string;
}

@Injectable()
export class SuperadminDistributedJobQueueService {
  constructor(private readonly redis: SuperadminRedisService) {}

  /** Enqueues a typed job envelope onto the named Redis list. */
  async enqueue<TPayload extends Record<string, unknown>>(job: SuperadminDistributedJobEnvelope<TPayload>): Promise<void> {
    await this.redis.getClient().lpush(job.queueName, JSON.stringify(job));
  }

  /** Places a permanently failed job into the queue-specific dead-letter list. */
  async enqueueDeadLetter<TPayload extends Record<string, unknown>>(job: SuperadminDistributedJobEnvelope<TPayload>): Promise<void> {
    await this.redis.getClient().lpush(`${job.queueName}:dlq`, JSON.stringify(job));
  }
}
