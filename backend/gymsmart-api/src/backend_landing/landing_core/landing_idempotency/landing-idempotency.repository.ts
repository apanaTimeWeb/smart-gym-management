// RESPONSIBILITY: Owns transaction-scoped durable idempotency reservations and completion state.
// FLOW: LandingIdempotencyService â†’ LandingIdempotencyRepository â†’ tenant PostgreSQL idempotency_records.
import { Injectable } from '@nestjs/common';

import { LandingBaseRepository } from '@/backend_landing/landing_core/landing_database/landing-base.repository';
import { LandingOrmTransactionContextService } from '@/backend_landing/landing_core/landing_database/landing-orm-transaction-context.service';
import { LandingIdempotencyRecordEntity } from '@/backend_landing/landing_core/landing_idempotency/landing-idempotency-record.entity';
import { LandingIdempotencyRecordMapper } from '@/backend_landing/landing_core/landing_idempotency/landing-idempotency-record.mapper';

import type { LandingIdempotencyRecord } from '@/backend_landing/landing_core/landing_idempotency/landing-idempotency-record.domain';
import type { LandingCommandResult } from '@/backend_landing/landing_core/landing_types/landing-command-result.types';


/**
 * Intent: Defines the LandingIdempotencyRepository class boundary for this supplied Landing backend scope.
 * Edge Cases: Invalid inputs and infrastructure failures are handled by the owning boundary.
 * Side Effects: None beyond the behavior implemented by this class.
 * AI Notes: Preserve the class responsibility and dependency direction documented by the module.
 */
@Injectable()
/**
 * Intent: Defines the landing idempotency repository boundary for this supplied Landing backend scope.
 * Edge Cases: Invalid inputs, unavailable infrastructure, and transaction failures must fail through the owning boundary instead of being silently ignored.
 * Side Effects: Performs only the persistence, orchestration, transport, or infrastructure effects explicitly owned by this class.
 * AI Notes: Preserve the class's current responsibility and dependency direction; do not move business logic across feature boundaries.
 */
export class LandingIdempotencyRepository extends LandingBaseRepository<LandingIdempotencyRecordEntity> {
  
  /**
   * Intent: Preserve the single responsibility of landing-idempotency.repository.constructor at its current architecture boundary.
   * Edge Cases: Invalid inputs and infrastructure failures must propagate to the owning boundary; no silent fallback is permitted.
   * Side Effects: Only the persistence, transport, infrastructure, or validation effects already defined by this method are allowed.
   * AI Notes: Preserve the method signature, dependency direction, and existing behavior when making future repairs.
   */
constructor(transactionContext: LandingOrmTransactionContextService) {
    super(LandingIdempotencyRecordEntity, transactionContext);
  }

  /**
   * @description Finds durable idempotency state for one scoped key without bypassing the transaction manager.
   * @param scope - Mutation scope.
   * @param key - Normalized idempotency key.
   * @returns Existing durable idempotency record or null.
   * @throws Error when the transaction context is invalid.
   */
  
  /**
   * Intent: Preserve the single responsibility of landing-idempotency.repository.findByScopeAndKey at its current architecture boundary.
   * Edge Cases: Invalid inputs and infrastructure failures must propagate to the owning boundary; no silent fallback is permitted.
   * Side Effects: Only the persistence, transport, infrastructure, or validation effects already defined by this method are allowed.
   * AI Notes: Preserve the method signature, dependency direction, and existing behavior when making future repairs.
   */
async findByScopeAndKey(
    scope: string,
    key: string,
  ): Promise<LandingIdempotencyRecord | null> {
    const repository = this.repositoryFor();
    const entity = await repository.findOne({ where: { scope, key } });
    return entity ? LandingIdempotencyRecordMapper.toDomain(entity) : null;
  }

  /**
   * @description Atomically reserves an idempotency key using PostgreSQL conflict-safe insertion.
   * @param scope - Mutation scope.
   * @param key - Normalized idempotency key.
   * @param requestHash - SHA-256 hash of the normalized request.
   * @param response - Deterministic command response stored with the reservation so a committed processing row can be safely replayed after a crash before completion.
   * @returns True when this transaction created the reservation; false when an existing reservation won the race.
   * @throws Error when the database cannot execute the reservation.
   */
  
  /**
   * Intent: Preserve the single responsibility of landing-idempotency.repository.reserve at its current architecture boundary.
   * Edge Cases: Invalid inputs and infrastructure failures must propagate to the owning boundary; no silent fallback is permitted.
   * Side Effects: Only the persistence, transport, infrastructure, or validation effects already defined by this method are allowed.
   * AI Notes: Preserve the method signature, dependency direction, and existing behavior when making future repairs.
   */
async reserve(
    scope: string,
    key: string,
    requestHash: string,
    response: LandingCommandResult<null>,
  ): Promise<boolean> {
    const repository = this.repositoryFor();
    const result = await repository
      .createQueryBuilder()
      .insert()
      .into(LandingIdempotencyRecordEntity)
      .values({ scope, key, requestHash, processing: true, response })
      .orIgnore()
      .returning(['id'])
      .execute();
    return result.identifiers.length > 0;
  }

  /**
   * @description Marks a durable idempotency reservation complete after the business mutation has committed.
   * @param scope - Mutation scope.
   * @param key - Normalized idempotency key.
   * @returns Resolves after the completion state is persisted.
   * @throws Error when the reservation cannot be completed.
   */
  
  /**
   * Intent: Preserve the single responsibility of landing-idempotency.repository.complete at its current architecture boundary.
   * Edge Cases: Invalid inputs and infrastructure failures must propagate to the owning boundary; no silent fallback is permitted.
   * Side Effects: Only the persistence, transport, infrastructure, or validation effects already defined by this method are allowed.
   * AI Notes: Preserve the method signature, dependency direction, and existing behavior when making future repairs.
   */
async complete(
    scope: string,
    key: string,
  ): Promise<void> {
    const repository = this.repositoryFor();
    const result = await repository.update(
      { scope, key },
      { processing: false },
    );
    if (result.affected !== 1) throw new Error('IDEMPOTENCY_RECORD_MISSING');
  }
}
