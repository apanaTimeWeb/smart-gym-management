// RESPONSIBILITY: Owns Redis connections for rate limits, idempotency, locks, and horizontally scalable realtime transport.
// FLOW: Config → IORedis primary client + duplicated pub/sub clients → infrastructure consumers.
import { Injectable, OnModuleDestroy } from '@nestjs/common';
import Redis from 'ioredis';
import { CoreConfigService } from '@/backend_trainer/backend_core/core_config/core-config.service';
/**
 * Intent: Defines the CoreRedisService boundary for the backend core architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@Injectable()
export class CoreRedisService implements OnModuleDestroy {
  /** Intent: Handles ordinary Redis GET/SET/lock/idempotency operations. Edge Cases: Startup connectivity failures surface through Redis itself. Side-Effects: Holds one persistent connection. AI Note: Do not use this client as a Socket.IO subscriber. */
  readonly client: Redis;
  /** Intent: Publishes Socket.IO cluster messages. Edge Cases: Must remain dedicated to pub/sub operations. Side-Effects: Carries realtime fan-out messages. AI Note: Never issue blocking commands here. */
  readonly publisher: Redis;
  /** Intent: Subscribes Socket.IO cluster messages. Edge Cases: Must remain dedicated to pub/sub operations. Side-Effects: Receives realtime fan-out messages. AI Note: Never issue application GET/SET calls here. */
  readonly subscriber: Redis;
  constructor(config: CoreConfigService) {
    this.client = new Redis(config.getRedis());
    this.publisher = this.client.duplicate();
    this.subscriber = this.client.duplicate();
  }
  /** Closes every Redis connection during graceful shutdown. */
  /**
 * Intent: Executes the onModuleDestroy operation inside the backend core service boundary.
 * Edge Cases: Preserve validation, ownership checks, transactions, idempotency, canonical errors, and side-effects across every success and failure path.
 * AI Note: Keep the method focused on its use case; do not add raw ORM access, cross-module shortcuts, or silent API changes.
 */
/**
 * @description Executes onModuleDestroy inside the owning backend service/repository boundary without exposing ORM details.
 * @returns {Promise<void>} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
async onModuleDestroy(): Promise<void> {
    await Promise.all([this.client.quit(), this.publisher.quit(), this.subscriber.quit()]);
  }
}
