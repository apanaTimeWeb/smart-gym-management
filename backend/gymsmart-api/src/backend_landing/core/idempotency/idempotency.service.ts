// RESPONSIBILITY: Provides Redis replay caching plus transactionally durable idempotency reservations for critical mutations.
// FLOW: Command orchestrator â†’ IdempotencyService â†’ Redis cache + CoreIdempotencyRepository â†’ tenant DB.
import { ConflictException, Injectable } from '@nestjs/common';

import { RedisService } from '@/backend_landing/core/redis/redis.service';

import { CoreIdempotencyRepository } from '@/backend_landing/core/idempotency/idempotency.repository';

import { CoreIdempotencyRecordEntity } from '@/backend_landing/core/idempotency/core-idempotency-record.entity';

import { CORE_ERROR_MESSAGES } from '@/backend_landing/core/types/core-error.constants';

import { TransactionContext } from '@/backend_landing/core/database/transaction-context';

import type { ApiResponse } from '@/backend_landing/core/types/api-response.types';


@Injectable()
export class IdempotencyService {
  private readonly ttlSeconds = 86400;

  constructor(
    private readonly redis: RedisService,
    private readonly repository: CoreIdempotencyRepository,
  ) {}

  /**
   * @description Returns a cached completed response when Redis has a valid replay entry; Redis is treated as non-authoritative.
   * @param scope - Mutation scope.
   * @param key - Client idempotency key.
   * @param requestHash - Hash of normalized request data.
   * @returns Cached canonical response or null when no completed cache entry exists.
   * @throws ConflictException when the same key is cached for a different request payload.
   */
  async getCachedResponse(
    scope: string,
    key: string,
    requestHash: string,
  ): Promise<ApiResponse<null> | null> {
    const normalizedKey = this.normalizeKey(key);
    try {
      const raw = await this.redis.client.get(this.buildKey(scope, normalizedKey));
      if (!raw) return null;
      const parsed = JSON.parse(raw) as {
        requestHash: string;
        response?: ApiResponse<null>;
      };
      if (parsed.requestHash !== requestHash) this.throwConflict();
      return parsed.response ?? null;
    } catch (error: unknown) {
      if (error instanceof ConflictException) throw error;
      return null;
    }
  }

  /**
   * @description Reserves a key inside the active tenant transaction or replays an already committed durable response.
   * @param context - Active tenant transaction context.
   * @param scope - Mutation scope.
   * @param key - Client idempotency key.
   * @param requestHash - Hash of normalized request data.
   * @returns Existing response when the mutation is already complete, otherwise null when this request owns the reservation.
   * @throws ConflictException when a key is reused with another payload or an uncompleted reservation is observed.
   */
  async reserveOrReplay(
    context: TransactionContext,
    scope: string,
    key: string,
    requestHash: string,
  ): Promise<ApiResponse<null> | null> {
    const normalizedKey = this.normalizeKey(key);
    const existing = await this.repository.findByScopeAndKey(context, scope, normalizedKey);
    if (existing) return this.resolveExisting(existing, requestHash);
    const reserved = await this.repository.reserve(context, scope, normalizedKey, requestHash);
    if (reserved) return null;
    const winner = await this.repository.findByScopeAndKey(context, scope, normalizedKey);
    if (!winner) throw new Error('IDEMPOTENCY_RESERVATION_LOST');
    return this.resolveExisting(winner, requestHash);
  }

  /**
   * @description Persists the final response in the same transaction as the business mutation.
   * @param context - Active tenant transaction context.
   * @param scope - Mutation scope.
   * @param key - Client idempotency key.
   * @param response - Canonical response to replay after retries.
   * @returns Resolves after the durable record is completed.
   */
  async completeWithinTransaction(
    context: TransactionContext,
    scope: string,
    key: string,
    response: ApiResponse<null>,
  ): Promise<void> {
    await this.repository.complete(context, scope, this.normalizeKey(key), response);
  }

  /**
   * @description Best-effort caches a completed response in Redis without making Redis availability part of mutation correctness.
   * @param scope - Mutation scope.
   * @param key - Client idempotency key.
   * @param requestHash - Hash of normalized request data.
   * @param response - Canonical response to replay.
   * @returns Resolves whether or not Redis is reachable.
   */
  async storeCached(
    scope: string,
    key: string,
    requestHash: string,
    response: ApiResponse<null>,
  ): Promise<void> {
    const normalizedKey = this.normalizeKey(key);
    try {
      await this.redis.client.set(
        this.buildKey(scope, normalizedKey),
        JSON.stringify({ requestHash, processing: false, response }),
        'EX',
        this.ttlSeconds,
      );
    } catch {
      return;
    }
  }

  /** @description Resolves durable idempotency state into a replay or safe in-progress response. @param existing - Durable idempotency record. @param requestHash - Current request fingerprint. @returns Replayed response or null when owned by this request. @throws ConflictException when the key conflicts or another request is still processing. */
  private resolveExisting(
    existing: CoreIdempotencyRecordEntity,
    requestHash: string,
  ): ApiResponse<null> | null {
    if (existing.requestHash !== requestHash) this.throwConflict();
    if (existing.processing || !existing.response) {
      throw new ConflictException({
        success: false,
        message: CORE_ERROR_MESSAGES.IDEMPOTENCY_IN_PROGRESS,
        data: null,
        error: 'IDEMPOTENCY_IN_PROGRESS',
        errorCode: 'CORE.IDEMPOTENCY.IN_PROGRESS',
      });
    }
    return existing.response;
  }

  /** @description Normalizes and bounds a client idempotency key before database or Redis access. @param key - Client-provided key. @returns Trimmed idempotency key. @throws ConflictException when the key is empty or too long. */
  private normalizeKey(key: string): string {
    const normalized = key.trim();
    if (!normalized || normalized.length > 255) {
      throw new ConflictException({
        success: false,
        message: CORE_ERROR_MESSAGES.IDEMPOTENCY_KEY_INVALID,
        data: null,
        error: 'IDEMPOTENCY_KEY_INVALID',
        errorCode: 'CORE.IDEMPOTENCY.KEY_INVALID',
      });
    }
    return normalized;
  }

  /** @description Builds the Redis replay-cache key from an idempotency scope and normalized key. @param scope - Mutation scope. @param key - Normalized key. @returns Redis key string. */
  private buildKey(scope: string, key: string): string {
    return `idempotency:${scope}:${key}`;
  }

  /** @description Throws the canonical conflict response for unsafe idempotency-key reuse. @returns Never returns. @throws ConflictException for request-hash mismatch. */
  private throwConflict(): never {
    throw new ConflictException({
      success: false,
      message: CORE_ERROR_MESSAGES.IDEMPOTENCY_KEY_REUSE,
      data: null,
      error: 'IDEMPOTENCY_CONFLICT',
      errorCode: 'CORE.IDEMPOTENCY.KEY_REUSE',
    });
  }
}
