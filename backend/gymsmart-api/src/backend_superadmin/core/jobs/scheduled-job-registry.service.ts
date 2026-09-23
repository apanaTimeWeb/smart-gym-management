// RESPONSIBILITY: Registers distributed scheduled-job handlers without creating feature-to-core business dependencies.
// FLOW: Feature module init -> handler registration -> external scheduler invocation -> Redis lock -> handler.
import { Injectable } from '@nestjs/common';
import { RedisService } from '@/backend_superadmin/core/cache/redis.service';
import { SCHEDULED_JOBS_REGISTRY, ScheduledJobName } from '@/backend_superadmin/core/scheduled-jobs.registry';

export interface ScheduledJobHandler {
  name: ScheduledJobName;
  execute(): Promise<void>;
}

@Injectable()
export class ScheduledJobRegistryService {
  private readonly handlers = new Map<ScheduledJobName, ScheduledJobHandler>();

  constructor(private readonly redis: RedisService) {}

  /** Registers one feature-owned handler against a documented distributed job name. */
  register(handler: ScheduledJobHandler): void { this.handlers.set(handler.name, handler); }

  /** Executes one registered job under a distributed Redis lease. */
  async run(name: ScheduledJobName): Promise<boolean> {
    const handler = this.handlers.get(name);
    if (!handler) return false;
    const definition = SCHEDULED_JOBS_REGISTRY.find((item) => item.name === name);
    if (!definition) return false;
    const lock = `scheduled-job:${definition.lockKey}`;
    const acquired = await this.redis.getClient().set(lock, process.pid.toString(), 'EX', definition.lockSeconds, 'NX');
    if (acquired !== 'OK') return false;
    try { await handler.execute(); return true; }
    finally { await this.redis.getClient().del(lock); }
  }
}
