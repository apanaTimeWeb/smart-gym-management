// RESPONSIBILITY: Registers distributed scheduled-job handlers without creating feature-to-core business dependencies.
// FLOW: Feature module init -> handler registration -> external scheduler invocation -> Redis lock -> handler.
import { Injectable } from '@nestjs/common';
import { SuperadminCoreRedisService } from '@/backend_superadmin/superadmin_core/superadmin_core_cache/superadmin-core-redis.service';
import { SCHEDULED_JOBS_REGISTRY, ScheduledJobName } from '@/backend_superadmin/superadmin_core/superadmin-core-scheduled-jobs.registry';

/**
 * Primary Intent: Defines SuperadminScheduledJobHandler as the interface-level contract for superadmin-core-scheduled-job-registry.service.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export interface SuperadminScheduledJobHandler {
  name: ScheduledJobName;
  /**
   * @description Executes the registered scheduled-job handler.
   * @returns Promise resolved when the job execution completes.
   */
  /**
   * Primary Intent: Executes the `execute` responsibility owned by this feature-local superadmin-core-scheduled-job-registry.service construct.
   * Edge Cases: Missing records, invalid inputs, and downstream failures must fail fast and preserve the owning feature's error contract.
   * Side-Effects: Only the documented persistence, cache, queue, event, or adapter effects of this method are allowed.
   * AI-Note: Preserve the explicit return type, single responsibility, dependency boundary, and repository/service separation when repairing this method.
   */
  /**
   * Primary Intent: Executes the execute use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  execute(): Promise<void>;
}

/**
 * Primary Intent: Defines SuperadminCoreScheduledJobRegistryService as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Injectable()
export class SuperadminCoreScheduledJobRegistryService {
  private readonly handlers = new Map<ScheduledJobName, SuperadminScheduledJobHandler>();

  constructor(private readonly redis: SuperadminCoreRedisService) {}

  /**
 * Primary Intent: Executes the `register` responsibility owned by this superadmin-core-scheduled-job-registry.service construct.
   * Edge Cases: Invalid or unavailable dependencies must fail fast according to the owning module contract.
   * Side-Effects: Any writes, events, external calls, cache changes, or queue operations are limited to the documented method responsibility.
   * AI-Note: Keep this method single-purpose, preserve explicit return types, and do not move logic across feature boundaries.
   */
  /**
   * Primary Intent: Executes the register use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  register(handler: SuperadminScheduledJobHandler): void { this.handlers.set(handler.name, handler); }

  /**
 * Primary Intent: Executes the `run` responsibility owned by this superadmin-core-scheduled-job-registry.service construct.
   * Edge Cases: Invalid or unavailable dependencies must fail fast according to the owning module contract.
   * Side-Effects: Any writes, events, external calls, cache changes, or queue operations are limited to the documented method responsibility.
   * AI-Note: Keep this method single-purpose, preserve explicit return types, and do not move logic across feature boundaries.
   */
  /**
   * Primary Intent: Executes the run use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
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
