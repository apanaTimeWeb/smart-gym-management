// RESPONSIBILITY: Owns Redis idempotency claim, wait, replay parsing, and failed-claim release mechanics.
// FLOW: Interceptor → cache service → Redis atomic marker/result → interceptor response replay.
import { ConflictException, HttpStatus, Injectable } from '@nestjs/common';
import { CoreRedisService } from '@/backend_trainer/backend_core/core_redis/core-redis.service';
const PROCESSING_MARKER = '__CORE_IDEMPOTENCY_PROCESSING__';
const PROCESSING_TTL_SECONDS = 120;
export interface CoreCachedIdempotencyResponse {
  value: unknown;
  statusCode: number;
  headers: { setCookie?: string[]; location?: string; contentLocation?: string; retryAfter?: string };
}
/**
 * Intent: Encapsulates Redis mechanics so HTTP interception stays focused on transport policy.
 * Edge Cases: Claims are atomic, stalled requests expire, and malformed cached responses raise canonical conflicts.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Never execute a second mutation for an occupied idempotency key.
 */
@Injectable()
export class CoreIdempotencyCacheService {
  constructor(private readonly redis: CoreRedisService) {}
  /** Atomically claims a key or returns an existing completed response. */
  /**
 * @description Executes claim inside the owning backend service/repository boundary without exposing ORM details.
 * @param cacheKey - Input for claim.
 * @returns {Promise<{ owner: boolean; value: string }>} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
async claim(cacheKey: string): Promise<{ owner: boolean; value: string }> {
    const result = String(await this.redis.client.eval(`local existing = redis.call('GET', KEYS[1]) if existing then return 'EXISTING:' .. existing end redis.call('SET', KEYS[1], ARGV[1], 'EX', ARGV[2]) return 'CLAIMED:' .. ARGV[1]`, 1, cacheKey, PROCESSING_MARKER, String(PROCESSING_TTL_SECONDS)));
    if (result.startsWith('CLAIMED:')) return { owner: true, value: result.slice('CLAIMED:'.length) };
    const existing = result.slice('EXISTING:'.length);
    return { owner: false, value: existing === PROCESSING_MARKER ? await this.waitForResult(cacheKey) : existing };
  }
  /** Waits for a previous owner to commit a response without rerunning the mutation. */
  /**
 * @description Executes waitForResult inside the owning backend service/repository boundary without exposing ORM details.
 * @param cacheKey - Input for waitForResult.
 * @returns {Promise<string>} The typed result defined by the owning contract.
 * @throws ConflictException when the operation rejects its explicit business preconditions.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
private async waitForResult(cacheKey: string): Promise<string> {
    const deadline = Date.now() + PROCESSING_TTL_SECONDS * 1000;
    while (Date.now() < deadline) { await new Promise<void>((resolve) => setTimeout(resolve, 50)); const current = await this.redis.client.get(cacheKey); if (current && current !== PROCESSING_MARKER) return current; if (!current) throw new ConflictException('CORE.IDEMPOTENCY.REQUEST_EXPIRED'); }
    throw new ConflictException('CORE.IDEMPOTENCY.REQUEST_IN_PROGRESS');
  }
  /** Releases a failed claim only when the key still contains this process marker. */
  /**
 * @description Executes release inside the owning backend service/repository boundary without exposing ORM details.
 * @param cacheKey - Input for release.
 * @returns {Promise<void>} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
async release(cacheKey: string): Promise<void> {
    await this.redis.client.eval(`if redis.call('GET', KEYS[1]) == ARGV[1] then return redis.call('DEL', KEYS[1]) end return 0`, 1, cacheKey, PROCESSING_MARKER);
  }
  /** Stores a completed canonical replay record with the requested TTL. */
  /**
 * @description Executes store inside the owning backend service/repository boundary without exposing ORM details.
 * @param cacheKey - Input for store.
 * @param cached - Input for store.
 * @param ttlSeconds - Input for store.
 * @returns {Promise<void>} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
async store(cacheKey: string, cached: CoreCachedIdempotencyResponse, ttlSeconds: number): Promise<void> { await this.redis.client.set(cacheKey, JSON.stringify(cached), 'EX', ttlSeconds); }
  /** Parses the current cache record while tolerating legacy raw-body entries. */
  /**
 * @description Executes parse inside the owning backend service/repository boundary without exposing ORM details.
 * @param value - Input for parse.
 * @returns {CoreCachedIdempotencyResponse} The typed result defined by the owning contract.
 * @throws ConflictException when the operation rejects its explicit business preconditions.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
parse(value: string): CoreCachedIdempotencyResponse {
    try { const parsed = JSON.parse(value) as unknown; return this.isResponse(parsed) ? parsed : { value: parsed, statusCode: HttpStatus.OK, headers: {} }; } catch { throw new ConflictException('CORE.IDEMPOTENCY.CACHE_CORRUPTED'); }
  }
  /** Recognizes the versioned replay record shape without trusting arbitrary cache content. */
  /**
 * @description Executes isResponse inside the owning backend service/repository boundary without exposing ORM details.
 * @param value - Input for isResponse.
 * @returns {value is CoreCachedIdempotencyResponse} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
private isResponse(value: unknown): value is CoreCachedIdempotencyResponse {
    if (!value || typeof value !== 'object') return false;
    const candidate = value as { value?: unknown; statusCode?: unknown; headers?: unknown };
    return typeof candidate.statusCode === 'number' && typeof candidate.headers === 'object' && candidate.headers !== null && 'value' in candidate;
  }
}
