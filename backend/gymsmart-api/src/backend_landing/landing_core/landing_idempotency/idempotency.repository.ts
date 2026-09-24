// RESPONSIBILITY: Owns transaction-scoped durable idempotency reservations and completion state.
// FLOW: IdempotencyService â†’ CoreIdempotencyRepository â†’ tenant PostgreSQL idempotency_records.
import { Injectable } from '@nestjs/common';

import { CoreBaseRepository } from '@/backend_landing/landing_core/database/base.repository';

import { CoreIdempotencyRecordEntity } from '@/backend_landing/landing_core/landing_idempotency/core-idempotency-record.entity';

import { TransactionContext } from '@/backend_landing/landing_core/database/transaction-context';

import type { ApiResponse } from '@/backend_landing/landing_core/landing_types/api-response.types';


@Injectable()
export class CoreIdempotencyRepository extends CoreBaseRepository<CoreIdempotencyRecordEntity> {
  constructor() {
    super(CoreIdempotencyRecordEntity);
  }

  /**
   * @description Finds durable idempotency state for one scoped key without bypassing the transaction manager.
   * @param context - Active tenant transaction context.
   * @param scope - Mutation scope.
   * @param key - Normalized idempotency key.
   * @returns Existing durable idempotency record or null.
   * @throws Error when the transaction context is invalid.
   */
  async findByScopeAndKey(
    context: TransactionContext,
    scope: string,
    key: string,
  ): Promise<CoreIdempotencyRecordEntity | null> {
    const repository = this.repositoryFor(context);
    return repository.findOne({ where: { scope, key } });
  }

  /**
   * @description Atomically reserves an idempotency key using PostgreSQL conflict-safe insertion.
   * @param context - Active tenant transaction context.
   * @param scope - Mutation scope.
   * @param key - Normalized idempotency key.
   * @param requestHash - SHA-256 hash of the normalized request.
   * @returns True when this transaction created the reservation; false when an existing reservation won the race.
   * @throws Error when the database cannot execute the reservation.
   */
  async reserve(
    context: TransactionContext,
    scope: string,
    key: string,
    requestHash: string,
  ): Promise<boolean> {
    const repository = this.repositoryFor(context);
    const result = await repository
      .createQueryBuilder()
      .insert()
      .into(CoreIdempotencyRecordEntity)
      .values({ scope, key, requestHash, processing: true, response: null })
      .orIgnore()
      .execute();
    return result.identifiers.length > 0;
  }

  /**
   * @description Marks a durable idempotency reservation complete inside the same database transaction as the mutation.
   * @param context - Active tenant transaction context.
   * @param scope - Mutation scope.
   * @param key - Normalized idempotency key.
   * @param response - Canonical response to replay.
   * @returns Resolves after the completion record is persisted.
   * @throws Error when the reservation cannot be completed.
   */
  async complete(
    context: TransactionContext,
    scope: string,
    key: string,
    response: ApiResponse<null>,
  ): Promise<void> {
    const repository = this.repositoryFor(context);
    const result = await repository.update(
      { scope, key },
      { processing: false, response },
    );
    if (result.affected !== 1) throw new Error('IDEMPOTENCY_RECORD_MISSING');
  }
}
