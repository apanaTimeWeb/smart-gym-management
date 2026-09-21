// RESPONSIBILITY: Provides Redis-backed idempotency reservation and response replay for critical mutations.
// FLOW: Command controller → IdempotencyService → Redis → replay, reject, or execute once per key.
import { ConflictException, Injectable } from '@nestjs/common';
import { RedisService } from '@/core/redis/redis.service';
import type { ApiResponse } from '@/core/types/api-response.types';
import { CORE_ERROR_MESSAGES } from '@/core/types/core-error.constants';

interface IdempotencyRecord {
  requestHash: string;
  processing: boolean;
  response?: ApiResponse<null>;
}

@Injectable()
export class IdempotencyService {
  private readonly ttlSeconds = 86400;

  constructor(private readonly redis: RedisService) {}

  /** @description Reserves a key or returns the previously stored response. @param scope - Mutation scope. @param key - Client idempotency key. @param requestHash - Hash of normalized request data. @returns Prior response or null when execution is reserved. @throws ConflictException when a key is reused with a different payload or is still processing. */
  async acquire(scope: string, key: string, requestHash: string): Promise<ApiResponse<null> | null> {
    const normalizedKey = this.normalizeKey(key);
    const redisKey = this.buildKey(scope, normalizedKey);
    const existing = await this.redis.client.get(redisKey);
    if (existing) return this.replayOrReject(existing, requestHash);
    const record: IdempotencyRecord = { requestHash, processing: true };
    const reserved = await this.redis.client.set(redisKey, JSON.stringify(record), 'EX', this.ttlSeconds, 'NX');
    if (reserved !== 'OK') throw new ConflictException({
      success: false,
      message: CORE_ERROR_MESSAGES.IDEMPOTENCY_IN_PROGRESS,
      data: null,
      error: 'IDEMPOTENCY_IN_PROGRESS',
      errorCode: 'CORE.IDEMPOTENCY.IN_PROGRESS',
    });
    return null;
  }

  /** @description Stores the final canonical response for future same-key replays. @param scope - Mutation scope. @param key - Client idempotency key. @param requestHash - Original request hash. @param response - Final response envelope. @returns Resolves when the result is stored. */
  async store(scope: string, key: string, requestHash: string, response: ApiResponse<null>): Promise<void> {
    const normalizedKey = this.normalizeKey(key);
    const redisKey = this.buildKey(scope, normalizedKey);
    const record: IdempotencyRecord = { requestHash, processing: false, response };
    await this.redis.client.set(redisKey, JSON.stringify(record), 'EX', this.ttlSeconds);
  }

  /** @description Releases a failed in-flight reservation so a client can retry. @param scope - Mutation scope. @param key - Client idempotency key. @param requestHash - Original request hash. @returns Resolves after a conditional removal. */
  async release(scope: string, key: string, requestHash: string): Promise<void> {
    const normalizedKey = this.normalizeKey(key);
    const redisKey = this.buildKey(scope, normalizedKey);
    const raw = await this.redis.client.get(redisKey);
    if (!raw) return;
    const parsed = JSON.parse(raw) as IdempotencyRecord;
    if (parsed.requestHash === requestHash && parsed.processing) await this.redis.client.del(redisKey);
  }

  /** @description Replays a stored response or rejects a conflicting/in-flight key. @param raw - Stored idempotency record JSON. @param requestHash - Hash of the current request. @returns Stored response or null when still executing. @throws ConflictException for unsafe key reuse. */
  private replayOrReject(raw: string, requestHash: string): ApiResponse<null> | null {
    const parsed = JSON.parse(raw) as IdempotencyRecord;
    if (parsed.requestHash !== requestHash) throw new ConflictException({
      success: false,
      message: CORE_ERROR_MESSAGES.IDEMPOTENCY_KEY_REUSE,
      data: null,
      error: 'IDEMPOTENCY_CONFLICT',
      errorCode: 'CORE.IDEMPOTENCY.KEY_REUSE',
    });
    if (parsed.processing) throw new ConflictException({
      success: false,
      message: CORE_ERROR_MESSAGES.IDEMPOTENCY_IN_PROGRESS,
      data: null,
      error: 'IDEMPOTENCY_IN_PROGRESS',
      errorCode: 'CORE.IDEMPOTENCY.IN_PROGRESS',
    });
    return parsed.response ?? null;
  }

  /** @description Validates and normalizes the client idempotency key before it reaches Redis. @param key - Client-provided request key. @returns Safe canonical key. @throws ConflictException when the key is missing or oversized. */
  private normalizeKey(key: string): string {
    const normalized = key.trim();
    if (!normalized || normalized.length > 255) throw new ConflictException({
      success: false,
      message: CORE_ERROR_MESSAGES.IDEMPOTENCY_KEY_INVALID,
      data: null,
      error: 'IDEMPOTENCY_KEY_INVALID',
      errorCode: 'CORE.IDEMPOTENCY.KEY_INVALID',
    });
    return normalized;
  }

  /** @description Builds the Redis key for an idempotency scope and client key. @param scope - Mutation scope. @param key - Client-supplied idempotency key. @returns Redis key. */
  private buildKey(scope: string, key: string): string {
    return `idempotency:${scope}:${key}`;
  }
}
