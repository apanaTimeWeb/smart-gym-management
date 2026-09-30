// RESPONSIBILITY: Provides test-only Redis-backed atomic idempotency for disposable tenant lifecycle commands.
// FLOW: Test tenant controller -> LandingTestTenantIdempotencyService -> Redis NX lock/cache -> provisioning side effect.
import { createHash, randomUUID } from 'node:crypto';

import { ConflictException, Injectable, ServiceUnavailableException } from '@nestjs/common';

import { LandingRedisService } from '@/backend_landing/landing_core/landing_redis/landing-redis.service';
import { CORE_ERROR_MESSAGES } from '@/backend_landing/landing_core/landing_types/landing-core-error.constants';

/**
 * Intent: Prevent duplicate test-tenant provisioning/destruction caused by retrying E2E lifecycle commands.
 * Edge Cases: Redis outage fails closed; an already-held key returns 409; completed responses are replayed without repeating the side effect.
 * Side Effects: Writes short-lived Redis lock/cache entries used only by test infrastructure.
 * AI Notes: This class is test-only and must never be exported as a production business dependency.
 */
@Injectable()
export class LandingTestTenantIdempotencyService {
  private readonly ttlSeconds = 900;

  
  /**
   * Intent: Preserve the single responsibility of landing-test-tenant-idempotency.service.constructor at its current architecture boundary.
   * Edge Cases: Invalid inputs and infrastructure failures must propagate to the owning boundary; no silent fallback is permitted.
   * Side Effects: Only the persistence, transport, infrastructure, or validation effects already defined by this method are allowed.
   * AI Notes: Preserve the method signature, dependency direction, and existing behavior when making future repairs.
   */
constructor(private readonly redis: LandingRedisService) {}

  /** @description Returns a cached test-infrastructure response for a previously completed key. @param scope - Lifecycle command scope. @param key - Client idempotency key. @param bootstrapToken - Test credential used only to partition test runs. @returns Cached response or null. @throws ServiceUnavailableException when Redis is unavailable. */
  
  /**
   * Intent: Preserve the single responsibility of landing-test-tenant-idempotency.service.getCached at its current architecture boundary.
   * Edge Cases: Invalid inputs and infrastructure failures must propagate to the owning boundary; no silent fallback is permitted.
   * Side Effects: Only the persistence, transport, infrastructure, or validation effects already defined by this method are allowed.
   * AI Notes: Preserve the method signature, dependency direction, and existing behavior when making future repairs.
   */
async getCached(scope: string, key: string, bootstrapToken: string, requestHash: string): Promise<Record<string, unknown> | null> {
    await this.ensureRedis();
    try {
      const raw = await this.redis.client.get(this.cacheKey(scope, key, bootstrapToken));
      if (!raw) return null;
      const parsed = JSON.parse(raw) as { requestHash?: string; response?: Record<string, unknown> };
      if (parsed.requestHash !== requestHash) throw this.keyReuseConflict();
      return parsed.response ?? null;
    } catch (error: unknown) {
      if (error instanceof ConflictException || error instanceof ServiceUnavailableException) throw error;
      throw this.redisUnavailable();
    }
  }

  /** @description Atomically reserves a test lifecycle key. @param scope - Lifecycle command scope. @param key - Client idempotency key. @param bootstrapToken - Test credential used only for namespacing. @returns Lock token. @throws ConflictException when another request already owns the key. */
  
  /**
   * Intent: Preserve the single responsibility of landing-test-tenant-idempotency.service.acquire at its current architecture boundary.
   * Edge Cases: Invalid inputs and infrastructure failures must propagate to the owning boundary; no silent fallback is permitted.
   * Side Effects: Only the persistence, transport, infrastructure, or validation effects already defined by this method are allowed.
   * AI Notes: Preserve the method signature, dependency direction, and existing behavior when making future repairs.
   */
async acquire(scope: string, key: string, bootstrapToken: string): Promise<string> {
    await this.ensureRedis();
    const token = randomUUID();
    const result = await this.redis.client.set(this.lockKey(scope, key, bootstrapToken), token, 'EX', this.ttlSeconds, 'NX');
    if (result !== 'OK') {
      throw new ConflictException({
        message: CORE_ERROR_MESSAGES.IDEMPOTENCY_IN_PROGRESS,
        error: 'IDEMPOTENCY_IN_PROGRESS',
        errorCode: 'CORE.IDEMPOTENCY.IN_PROGRESS',
      });
    }
    return token;
  }

  /** @description Stores a completed test lifecycle response after the side effect has committed. @param scope - Lifecycle command scope. @param key - Client idempotency key. @param bootstrapToken - Test credential used only for namespacing. @param response - Canonical replay data. @returns Resolves after cache write. @throws ServiceUnavailableException when Redis cannot record completion. */
  
  /**
   * Intent: Preserve the single responsibility of landing-test-tenant-idempotency.service.store at its current architecture boundary.
   * Edge Cases: Invalid inputs and infrastructure failures must propagate to the owning boundary; no silent fallback is permitted.
   * Side Effects: Only the persistence, transport, infrastructure, or validation effects already defined by this method are allowed.
   * AI Notes: Preserve the method signature, dependency direction, and existing behavior when making future repairs.
   */
async store(scope: string, key: string, bootstrapToken: string, requestHash: string, response: Record<string, unknown>): Promise<void> {
    await this.ensureRedis();
    try {
      await this.redis.client.set(
        this.cacheKey(scope, key, bootstrapToken),
        JSON.stringify({ requestHash, response }),
        'EX',
        this.ttlSeconds,
      );
    } catch {
      throw new ServiceUnavailableException({
      message: CORE_ERROR_MESSAGES.REDIS_UNAVAILABLE,
      error: 'REDIS_UNAVAILABLE',
      errorCode: 'CORE.REDIS.UNAVAILABLE',
      });
    }
  }

  /** @description Releases a lock only when its token still matches the current owner. @param scope - Lifecycle command scope. @param key - Client key. @param bootstrapToken - Test credential namespace. @param token - Lock token. @returns Resolves after compare-and-delete. */
  
  /**
   * Intent: Preserve the single responsibility of landing-test-tenant-idempotency.service.release at its current architecture boundary.
   * Edge Cases: Invalid inputs and infrastructure failures must propagate to the owning boundary; no silent fallback is permitted.
   * Side Effects: Only the persistence, transport, infrastructure, or validation effects already defined by this method are allowed.
   * AI Notes: Preserve the method signature, dependency direction, and existing behavior when making future repairs.
   */
async release(scope: string, key: string, bootstrapToken: string, token: string): Promise<void> {
    try {
      await this.redis.client.eval(
        "if redis.call('get', KEYS[1]) == ARGV[1] then return redis.call('del', KEYS[1]) else return 0 end",
        1,
        this.lockKey(scope, key, bootstrapToken),
        token,
      );
    } catch {
      return;
    }
  }

  /** @description Confirms Redis is available before a test mutation starts. @returns Resolves on successful PING. @throws ServiceUnavailableException when Redis cannot serve the request. */
  
  /**
   * Intent: Preserve the single responsibility of landing-test-tenant-idempotency.service.ensureRedis at its current architecture boundary.
   * Edge Cases: Invalid inputs and infrastructure failures must propagate to the owning boundary; no silent fallback is permitted.
   * Side Effects: Only the persistence, transport, infrastructure, or validation effects already defined by this method are allowed.
   * AI Notes: Preserve the method signature, dependency direction, and existing behavior when making future repairs.
   */
private async ensureRedis(): Promise<void> {
    try {
      await this.redis.client.ping();
    } catch {
      throw new ServiceUnavailableException({
      message: CORE_ERROR_MESSAGES.REDIS_UNAVAILABLE,
      error: 'REDIS_UNAVAILABLE',
      errorCode: 'CORE.REDIS.UNAVAILABLE',
      });
    }
  }

  /** @description Creates the canonical key-reuse conflict for a different request fingerprint. @returns Conflict exception. */
  
  /**
   * Intent: Preserve the single responsibility of landing-test-tenant-idempotency.service.keyReuseConflict at its current architecture boundary.
   * Edge Cases: Invalid inputs and infrastructure failures must propagate to the owning boundary; no silent fallback is permitted.
   * Side Effects: Only the persistence, transport, infrastructure, or validation effects already defined by this method are allowed.
   * AI Notes: Preserve the method signature, dependency direction, and existing behavior when making future repairs.
   */
private keyReuseConflict(): ConflictException {
    return new ConflictException({
      message: CORE_ERROR_MESSAGES.IDEMPOTENCY_KEY_REUSE,
      error: 'IDEMPOTENCY_KEY_REUSE',
      errorCode: 'CORE.IDEMPOTENCY.KEY_REUSE',
    });
  }

  /** @description Creates the canonical fail-closed Redis dependency exception. @returns Service-unavailable exception. */
  
  /**
   * Intent: Preserve the single responsibility of landing-test-tenant-idempotency.service.redisUnavailable at its current architecture boundary.
   * Edge Cases: Invalid inputs and infrastructure failures must propagate to the owning boundary; no silent fallback is permitted.
   * Side Effects: Only the persistence, transport, infrastructure, or validation effects already defined by this method are allowed.
   * AI Notes: Preserve the method signature, dependency direction, and existing behavior when making future repairs.
   */
private redisUnavailable(): ServiceUnavailableException {
    return new ServiceUnavailableException({
      message: CORE_ERROR_MESSAGES.REDIS_UNAVAILABLE,
      error: 'REDIS_UNAVAILABLE',
      errorCode: 'CORE.REDIS.UNAVAILABLE',
    });
  }

  /** @description Builds a token-partitioned cache key without storing the credential itself. @param scope - Lifecycle command scope. @param key - Client key. @param bootstrapToken - Test credential. @returns Redis cache key. */
  
  /**
   * Intent: Preserve the single responsibility of landing-test-tenant-idempotency.service.cacheKey at its current architecture boundary.
   * Edge Cases: Invalid inputs and infrastructure failures must propagate to the owning boundary; no silent fallback is permitted.
   * Side Effects: Only the persistence, transport, infrastructure, or validation effects already defined by this method are allowed.
   * AI Notes: Preserve the method signature, dependency direction, and existing behavior when making future repairs.
   */
private cacheKey(scope: string, key: string, bootstrapToken: string): string {
    return `test-idempotency:${this.partition(bootstrapToken)}:${scope}:${key}:response`;
  }

  /** @description Builds the atomic lock key for a test mutation. @param scope - Lifecycle command scope. @param key - Client key. @param bootstrapToken - Test credential. @returns Redis lock key. */
  
  /**
   * Intent: Preserve the single responsibility of landing-test-tenant-idempotency.service.lockKey at its current architecture boundary.
   * Edge Cases: Invalid inputs and infrastructure failures must propagate to the owning boundary; no silent fallback is permitted.
   * Side Effects: Only the persistence, transport, infrastructure, or validation effects already defined by this method are allowed.
   * AI Notes: Preserve the method signature, dependency direction, and existing behavior when making future repairs.
   */
private lockKey(scope: string, key: string, bootstrapToken: string): string {
    return `test-idempotency:${this.partition(bootstrapToken)}:${scope}:${key}:lock`;
  }

  /** @description Hashes the bootstrap token for Redis namespace isolation without exposing the credential. @param token - Test bootstrap token. @returns SHA-256 token partition. */
  
  /**
   * Intent: Preserve the single responsibility of landing-test-tenant-idempotency.service.partition at its current architecture boundary.
   * Edge Cases: Invalid inputs and infrastructure failures must propagate to the owning boundary; no silent fallback is permitted.
   * Side Effects: Only the persistence, transport, infrastructure, or validation effects already defined by this method are allowed.
   * AI Notes: Preserve the method signature, dependency direction, and existing behavior when making future repairs.
   */
private partition(token: string): string {
    return createHash('sha256').update(token).digest('hex');
  }
}
