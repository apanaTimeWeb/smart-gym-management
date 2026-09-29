// RESPONSIBILITY: Converts the persistence entity for idempotency state into the ORM-neutral domain record.
// FLOW: TypeORM entity -> LandingIdempotencyRecordMapper -> domain record.
import { LandingIdempotencyRecordEntity } from '@/backend_landing/landing_core/landing_idempotency/landing-idempotency-record.entity';

import type { LandingIdempotencyRecord } from '@/backend_landing/landing_core/landing_idempotency/landing-idempotency-record.domain';

/**
 * Intent: Isolate the only translation between the TypeORM idempotency entity and application-visible durable state.
 * Edge Cases: Nullable response data remains null until the transaction completes; timestamps are copied unchanged.
 * Side Effects: None.
 * AI Notes: Repositories only should invoke this mapper; application services must consume LandingIdempotencyRecord.
 */
export class LandingIdempotencyRecordMapper {
  /**
   * Intent: Map one persistence entity to its ORM-neutral domain representation.
   * Edge Cases: Preserve nullable response and soft-delete fields exactly.
   * Side Effects: None.
   * AI Notes: Do not leak the source entity beyond this mapping boundary.
   */
  static toDomain(entity: LandingIdempotencyRecordEntity): LandingIdempotencyRecord {
    return {
      id: entity.id,
      scope: entity.scope,
      key: entity.key,
      requestHash: entity.requestHash,
      processing: entity.processing,
      response: entity.response,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt,
    };
  }
}
