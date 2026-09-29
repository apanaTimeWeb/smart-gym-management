// RESPONSIBILITY: Provides tenant-scoped, fail-closed idempotency enforcement and durable replay for critical mutations.
// FLOW: Command controller -> LandingIdempotencyService -> Redis atomic lock -> tenant DB durable record.
import { randomUUID } from 'node:crypto';

import { BadRequestException, ConflictException, Injectable, ServiceUnavailableException } from '@nestjs/common';

import { LandingIdempotencyRepository } from '@/backend_landing/landing_core/landing_idempotency/landing-idempotency.repository';
import { LandingRedisService } from '@/backend_landing/landing_core/landing_redis/landing-redis.service';
import { LandingRequestContextService } from '@/backend_landing/landing_core/landing_context/landing-request-context.service';
import { CORE_ERROR_MESSAGES } from '@/backend_landing/landing_core/landing_types/landing-core-error.constants';

import type { LandingIdempotencyRecord } from '@/backend_landing/landing_core/landing_idempotency/landing-idempotency-record.domain';
import type { LandingCommandResult } from '@/backend_landing/landing_core/landing_types/landing-command-result.types';

/**
 * Intent: Prevent duplicate Landing mutations while preserving a durable replay record in the tenant database.
 * Edge Cases: Redis outages fail closed before mutation; concurrent identical keys receive a 409; payload-hash mismatch is rejected; a committed processing row with a stored response is replay-safe.
 * Side Effects: Redis NX lock operations and durable idempotency-record writes inside the tenant transaction.
 * AI Notes: Redis is the concurrency gate, never the final source of truth; completion is persisted before the lock is released.
 */
@Injectable()
export class LandingIdempotencyService {
  private readonly lockTtlSeconds = 300;

  
  /**
   * Intent: Preserve the single responsibility of landing-idempotency.service.constructor at its current architecture boundary.
   * Edge Cases: Invalid inputs and infrastructure failures must propagate to the owning boundary; no silent fallback is permitted.
   * Side Effects: Only the persistence, transport, infrastructure, or validation effects already defined by this method are allowed.
   * AI Notes: Preserve the method signature, dependency direction, and existing behavior when making future repairs.
   */
constructor(
    private readonly redis: LandingRedisService,
    private readonly repository: LandingIdempotencyRepository,
    private readonly requestContext: LandingRequestContextService,
  ) {}


  /**
   * Intent: Acquire the atomic Redis concurrency lock that establishes one in-flight owner for a mutation key.
   * Edge Cases: Existing locks reject concurrent execution; Redis outage returns 503 before business work.
   * Side Effects: Writes a short-lived Redis NX lock.
   * AI Notes: The caller must release this exact token in a finally block after the transaction/cache path completes.
   */
  async acquireInProgressLock(scope: string, key: string): Promise<string> {
    await this.ensureRedisAvailable();
    const normalizedKey = this.normalizeKey(key);
    const token = randomUUID();
    try {
      const result = await this.redis.client.set(
        this.buildLockKey(scope, normalizedKey),
        token,
        'EX',
        this.lockTtlSeconds,
        'NX',
      );
      if (result !== 'OK') {
        throw new ConflictException({
          message: CORE_ERROR_MESSAGES.IDEMPOTENCY_IN_PROGRESS,
          error: 'IDEMPOTENCY_IN_PROGRESS',
          errorCode: 'CORE.IDEMPOTENCY.IN_PROGRESS',
        });
      }
      return token;
    } catch (error: unknown) {
      if (error instanceof ConflictException || error instanceof ServiceUnavailableException) throw error;
      throw this.redisUnavailable();
    }
  }

  /**
   * Intent: Release only the Redis lock owned by this request after commit or rollback.
   * Edge Cases: A lock that already expired or was replaced is left untouched.
   * Side Effects: Executes an atomic Redis compare-and-delete script.
   * AI Notes: Never use an unconditional DEL against an idempotency lock.
   */
  async releaseInProgressLock(scope: string, key: string, token: string): Promise<void> {
    try {
      const normalizedKey = this.normalizeKey(key);
      const redisKey = this.buildLockKey(scope, normalizedKey);
      await this.redis.client.eval(
        "if redis.call('get', KEYS[1]) == ARGV[1] then return redis.call('del', KEYS[1]) else return 0 end",
        1,
        redisKey,
        token,
      );
    } catch {
      return;
    }
  }

  /**
   * Intent: Reserve the durable idempotency row atomically with the business mutation, or replay a response from a previously committed reservation.
   * Edge Cases: Request hash mismatch is rejected; a stored response is safely replayable even when processing=true because the row is visible only after its reservation transaction committed; a row without a response remains in-progress.
   * Side Effects: Reads/inserts the tenant database idempotency record through the infrastructure-local transaction scope.
   * AI Notes: Do not move this persistence into controllers.
   */
  async reserveOrReplay(
    scope: string,
    key: string,
    requestHash: string,
    response: LandingCommandResult<null>,
  ): Promise<LandingCommandResult<null> | null> {
    const normalizedKey = this.normalizeKey(key);
    const existing = await this.repository.findByScopeAndKey(scope, normalizedKey);
    if (existing) return this.resolveExisting(existing, requestHash);
    const reserved = await this.repository.reserve(scope, normalizedKey, requestHash, response);
    if (reserved) return null;
    const winner = await this.repository.findByScopeAndKey(scope, normalizedKey);
    if (!winner) throw new Error('IDEMPOTENCY_RESERVATION_LOST');
    return this.resolveExisting(winner, requestHash);
  }

  /**
   * Intent: Mark a previously committed idempotency reservation completed in a dedicated post-commit transaction.
   * Edge Cases: Missing reservations indicate a correctness failure and abort the completion transaction.
   * Side Effects: Updates the durable tenant idempotency row through the active infrastructure-local transaction.
   * AI Notes: This method is called only after the business mutation transaction has committed.
   */
  async completeAfterCommit(scope: string, key: string): Promise<void> {
    await this.repository.complete(scope, this.normalizeKey(key));
  }


  /** @description Validates the client key format used across mutation commands. @param key - Client-supplied key. @returns Normalized key. @throws BadRequestException when the key is invalid. */
  
  /**
   * Intent: Preserve the single responsibility of landing-idempotency.service.normalizeKey at its current architecture boundary.
   * Edge Cases: Invalid inputs and infrastructure failures must propagate to the owning boundary; no silent fallback is permitted.
   * Side Effects: Only the persistence, transport, infrastructure, or validation effects already defined by this method are allowed.
   * AI Notes: Preserve the method signature, dependency direction, and existing behavior when making future repairs.
   */
private normalizeKey(key: string): string {
    const normalized = key.trim();
    if (!normalized || normalized.length > 255) {
      throw new BadRequestException({
        message: CORE_ERROR_MESSAGES.IDEMPOTENCY_KEY_INVALID,
        error: 'IDEMPOTENCY_KEY_INVALID',
        errorCode: 'CORE.IDEMPOTENCY.KEY_INVALID',
      });
    }
    return normalized;
  }


  /** @description Builds a tenant-scoped Redis lock key. @param scope - Mutation scope. @param key - Normalized key. @returns Tenant-scoped lock key. */
  
  /**
   * Intent: Preserve the single responsibility of landing-idempotency.service.buildLockKey at its current architecture boundary.
   * Edge Cases: Invalid inputs and infrastructure failures must propagate to the owning boundary; no silent fallback is permitted.
   * Side Effects: Only the persistence, transport, infrastructure, or validation effects already defined by this method are allowed.
   * AI Notes: Preserve the method signature, dependency direction, and existing behavior when making future repairs.
   */
private buildLockKey(scope: string, key: string): string {
    return `${this.buildTenantPrefix(scope)}:lock:${key}`;
  }

  /** @description Resolves the trusted tenant identity that partitions idempotency state. @param scope - Mutation scope. @returns Tenant-prefixed Redis namespace. @throws ServiceUnavailableException when tenant context is missing. */
  
  /**
   * Intent: Preserve the single responsibility of landing-idempotency.service.buildTenantPrefix at its current architecture boundary.
   * Edge Cases: Invalid inputs and infrastructure failures must propagate to the owning boundary; no silent fallback is permitted.
   * Side Effects: Only the persistence, transport, infrastructure, or validation effects already defined by this method are allowed.
   * AI Notes: Preserve the method signature, dependency direction, and existing behavior when making future repairs.
   */
private buildTenantPrefix(scope: string): string {
    const tenantId = this.requestContext.get().tenantId;
    if (!tenantId) throw this.redisUnavailable();
    return `idempotency:${tenantId}:${scope}`;
  }

  /** @description Ensures Redis availability before any mutation that depends on strict idempotency. @returns Resolves on successful Redis PING. @throws ServiceUnavailableException when Redis is unavailable. */
  
  /**
   * Intent: Preserve the single responsibility of landing-idempotency.service.ensureRedisAvailable at its current architecture boundary.
   * Edge Cases: Invalid inputs and infrastructure failures must propagate to the owning boundary; no silent fallback is permitted.
   * Side Effects: Only the persistence, transport, infrastructure, or validation effects already defined by this method are allowed.
   * AI Notes: Preserve the method signature, dependency direction, and existing behavior when making future repairs.
   */
private async ensureRedisAvailable(): Promise<void> {
    try {
      await this.redis.client.ping();
    } catch {
      throw this.redisUnavailable();
    }
  }

  /** @description Creates the canonical fail-closed Redis dependency exception. @returns Never returns. */
  
  /**
   * Intent: Preserve the single responsibility of landing-idempotency.service.redisUnavailable at its current architecture boundary.
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

  /** @description Converts incompatible request reuse into a canonical conflict. @returns Never returns. @throws ConflictException when request hashes differ. */
  
  /**
   * Intent: Preserve the single responsibility of landing-idempotency.service.throwConflict at its current architecture boundary.
   * Edge Cases: Invalid inputs and infrastructure failures must propagate to the owning boundary; no silent fallback is permitted.
   * Side Effects: Only the persistence, transport, infrastructure, or validation effects already defined by this method are allowed.
   * AI Notes: Preserve the method signature, dependency direction, and existing behavior when making future repairs.
   */
private throwConflict(): never {
    throw new ConflictException({
      message: CORE_ERROR_MESSAGES.IDEMPOTENCY_KEY_REUSE,
      error: 'IDEMPOTENCY_CONFLICT',
      errorCode: 'CORE.IDEMPOTENCY.KEY_REUSE',
    });
  }

  /** @description Resolves a durable record into replay or an in-progress conflict. @param existing - Stored idempotency record. @param requestHash - Current request hash. @returns Replay response or null for an owned reservation. */
  
  /**
   * Intent: Preserve the single responsibility of landing-idempotency.service.resolveExisting at its current architecture boundary.
   * Edge Cases: Invalid inputs and infrastructure failures must propagate to the owning boundary; no silent fallback is permitted.
   * Side Effects: Only the persistence, transport, infrastructure, or validation effects already defined by this method are allowed.
   * AI Notes: Preserve the method signature, dependency direction, and existing behavior when making future repairs.
   */
private resolveExisting(existing: LandingIdempotencyRecord, requestHash: string): LandingCommandResult<null> | null {
    if (existing.requestHash !== requestHash) this.throwConflict();
    if (!existing.response) {
      throw new ConflictException({
        message: CORE_ERROR_MESSAGES.IDEMPOTENCY_IN_PROGRESS,
        error: 'IDEMPOTENCY_IN_PROGRESS',
        errorCode: 'CORE.IDEMPOTENCY.IN_PROGRESS',
      });
    }
    return existing.response;
  }
}
