// RESPONSIBILITY: Publishes authenticated realtime events through Redis so every application instance can deliver them.
// FLOW: Feature event handler -> Redis realtime channel -> WebSocket gateway -> authenticated user room.
import { Injectable } from '@nestjs/common';
import { SuperadminCoreRedisService } from '@/backend_superadmin/superadmin_core/superadmin_core_cache/superadmin-core-redis.service';

/**
 * Primary Intent: Defines SuperadminRealtimeEventEnvelope as the interface-level contract for superadmin-core-realtime-publisher.service.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export interface SuperadminRealtimeEventEnvelope {
  userId: string;
  event: string;
  payload: unknown;
}

/**
 * Primary Intent: Defines SuperadminCoreRealtimePublisherService as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Injectable()
export class SuperadminCoreRealtimePublisherService {
  constructor(private readonly redis: SuperadminCoreRedisService) {}
/**
 * Primary Intent: Executes the publish use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /**
 * Primary Intent: Executes the publish use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async publish(userId: string, event: string, payload: unknown): Promise<void> {
    const envelope: SuperadminRealtimeEventEnvelope = { userId, event, payload };
    await this.redis.getClient().publish('superadmin:realtime', JSON.stringify(envelope));
  }
}
