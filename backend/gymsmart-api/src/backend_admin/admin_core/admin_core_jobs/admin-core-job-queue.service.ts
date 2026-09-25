// RESPONSIBILITY: Enqueues durable background jobs and defers publication until after a successful database commit.
// FLOW: Feature mutation -> AdminCoreJobQueueService -> post-commit callback -> Redis queue.
import { Injectable } from '@nestjs/common';

import { AdminCoreRequestContextService } from '@/backend_admin/admin_core/admin_core_context/admin-core-request-context.service.js';
import { AdminCoreJobMessage } from '@/backend_admin/admin_core/admin_core_jobs/admin-core-job-message.js';
import { AdminCoreMetricsService } from '@/backend_admin/admin_core/admin_core_metrics/admin-core-metrics.service.js';
import { AdminCoreRedisService } from '@/backend_admin/admin_core/admin_core_redis/admin-core-redis.service.js';

@Injectable()
/**
 * @description Defines the AdminCoreJobQueueService boundary for the admin_core_jobs backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminCoreJobQueueService {
  private readonly queuePrefix = 'core:job:v1:';

  constructor(
    private readonly redis: AdminCoreRedisService,
    private readonly context: AdminCoreRequestContextService,
    private readonly metrics: AdminCoreMetricsService,
  ) {}

  /** @description Enqueues one tenant-aware job after the current transaction commits when applicable.
   * @param queueName Logical queue.
   * @param type Job type.
   * @param jobId Durable job ID.
   * @param payload Job payload.
   * @returns Promise completion.
   */
  async enqueue<TPayload extends Record<string, unknown>>(
    queueName: string,
    type: string,
    jobId: string,
    payload: TPayload,
  ): Promise<void> {
    const current = this.context.get();
    const message: AdminCoreJobMessage<TPayload> = {
      jobId,
      type,
      tenantId: current.tenantId,
      userId: current.userId,
      userRole: current.userRole,
      payload,
      attempt: 0,
      enqueuedAt: new Date().toISOString(),
    };
    const publish = async (): Promise<void> => {
      await this.redis.pushJson(`${this.queuePrefix}${queueName}`, message);
    };
    if (current.entityManager) {
      this.context.deferUntilCommit(publish);
      return;
    }
    await publish();
  }

  /** @description Returns a queue key for worker consumers.
   * @param queueName Logical queue.
   * @returns Namespaced queue key.
   */
  getQueueKey(queueName: string): string {
    return `${this.queuePrefix}${queueName}`;
  }

  /** @description Exposes queue depth as a low-cardinality metric source.
   * @param queueName Logical queue.
   * @returns Current queue depth.
   */
  async getDepth(queueName: string): Promise<number> {
    const depth = await this.redis.listLength(this.getQueueKey(queueName));
    this.metrics.recordQueueDepth(depth);
    return depth;
  }
}
