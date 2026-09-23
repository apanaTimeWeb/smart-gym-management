// RESPONSIBILITY: Provides the shared Redis-backed queue primitives for durable Superadmin background jobs.
// FLOW: Feature command -> DistributedJobQueueService -> Redis queue key/DLQ key; durable DB state remains owned by feature repositories.
import { Injectable } from '@nestjs/common';
import { RedisService } from '@/backend_superadmin/core/cache/redis.service';

export interface DistributedJobEnvelope<TPayload extends Record<string, unknown> = Record<string, unknown>> {
  jobId: string;
  queueName: string;
  tenantId: string | null;
  payload: TPayload;
  enqueuedAt: string;
}

@Injectable()
export class DistributedJobQueueService {
  constructor(private readonly redis: RedisService) {}

  /** Enqueues a typed job envelope onto the named Redis list. */
  async enqueue<TPayload extends Record<string, unknown>>(job: DistributedJobEnvelope<TPayload>): Promise<void> {
    await this.redis.getClient().lpush(job.queueName, JSON.stringify(job));
  }

  /** Places a permanently failed job into the queue-specific dead-letter list. */
  async enqueueDeadLetter<TPayload extends Record<string, unknown>>(job: DistributedJobEnvelope<TPayload>): Promise<void> {
    await this.redis.getClient().lpush(`${job.queueName}:dlq`, JSON.stringify(job));
  }
}
