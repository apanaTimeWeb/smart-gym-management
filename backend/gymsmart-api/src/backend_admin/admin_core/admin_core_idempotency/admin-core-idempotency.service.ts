// RESPONSIBILITY: Provides atomic Redis-backed idempotent execution with request-fingerprint validation and canonical response replay.
// FLOW: Mutation scope + Idempotency-Key -> Redis reservation -> business operation -> cached response replay.
import { createHash } from 'node:crypto';

import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';

import { AdminCoreRequestContextService } from '@/backend_admin/admin_core/admin_core_context/admin-core-request-context.service.js';
import { AdminCoreRedisService } from '@/backend_admin/admin_core/admin_core_redis/admin-core-redis.service.js';

interface AdminCoreIdempotencyRecord<T> {
  state: 'IN_FLIGHT' | 'COMPLETE';
  fingerprint: string;
  response?: T;
}

@Injectable()
/**
 * @description Defines the AdminCoreIdempotencyService boundary for the admin_core_idempotency backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminCoreIdempotencyService {
  constructor(private readonly redis: AdminCoreRedisService, private readonly context: AdminCoreRequestContextService) {}

  /**
   * @description Executes one mutation once per tenant, endpoint and request fingerprint, then replays the first response for safe retries.
   * @param idempotencyKey Client-provided idempotency key.
   * @param operation Mutation callback.
   * @param scope Stable endpoint scope such as `POST:/api/v1/admin/plans/createPlan`.
   * @param fingerprintData Request data used to reject unsafe key reuse with a different payload.
   * @returns Original or replayed operation response.
   * @throws BadRequestException when the idempotency key is missing.
   * @throws ConflictException when another request is still processing the same key or the same key is reused with a different request.
   */
  async executeOnce<T>(idempotencyKey: string | undefined, operation: () => Promise<T>, scope: string, fingerprintData: unknown): Promise<T> {
    if (!idempotencyKey?.trim()) throw new BadRequestException({ message: 'Idempotency-Key header is required for this mutation.', errorCode: 'CORE.CORE.INVALID_REQUEST' });
    const fingerprint = this.fingerprint(scope, fingerprintData);
    const key = this.key(idempotencyKey, scope);
    const existing = await this.readRecord<T>(key);
    if (existing) {
      if (existing.fingerprint !== fingerprint) throw new ConflictException({ message: 'IDEMPOTENCY.KEY_REUSE_WITH_DIFFERENT_REQUEST', errorCode: 'CORE.CORE.CONFLICT' });
      if (existing.state === 'COMPLETE' && existing.response !== undefined) return existing.response;
      throw new ConflictException({ message: 'IDEMPOTENCY.REQUEST_IN_PROGRESS', errorCode: 'CORE.CORE.CONFLICT' });
    }

    const reservation: AdminCoreIdempotencyRecord<T> = { state: 'IN_FLIGHT', fingerprint };
    const acquired = await this.redis.setIfAbsent(key, JSON.stringify(reservation), 120);
    if (!acquired) {
      const retry = await this.readRecord<T>(key);
      if (retry?.fingerprint !== fingerprint) throw new ConflictException({ message: 'IDEMPOTENCY.KEY_REUSE_WITH_DIFFERENT_REQUEST', errorCode: 'CORE.CORE.CONFLICT' });
      throw new ConflictException({ message: 'IDEMPOTENCY.REQUEST_IN_PROGRESS', errorCode: 'CORE.CORE.CONFLICT' });
    }

    try {
      const response = await operation();
      await this.redis.setWithTtl(key, JSON.stringify({ state: 'COMPLETE', fingerprint, response } satisfies AdminCoreIdempotencyRecord<T>), 24 * 60 * 60);
      return response;
    } catch (error) {
      await this.redis.delete(key);
      throw error;
    }
  }

  private async readRecord<T>(key: string): Promise<AdminCoreIdempotencyRecord<T> | null> {
    const cached = await this.redis.get(key);
    if (!cached) return null;
    try {
      const parsed = JSON.parse(cached) as AdminCoreIdempotencyRecord<T>;
      if ((parsed.state === 'IN_FLIGHT' || parsed.state === 'COMPLETE') && typeof parsed.fingerprint === 'string') return parsed;
    } catch {
      await this.redis.delete(key);
    }
    return null;
  }

  private key(idempotencyKey: string, scope: string): string {
    const tenantId = this.context.tryGet()?.tenantId ?? 'global';
    const normalizedScope = scope.replace(/[^a-zA-Z0-9:._/-]/g, '_');
    const digest = createHash('sha256').update(`${tenantId}:${normalizedScope}:${idempotencyKey}`).digest('hex');
    return `idem:v2:${digest}`;
  }

  private fingerprint(scope: string, data: unknown): string {
    const payload = JSON.stringify(this.normalize(data));
    return createHash('sha256').update(`${scope}:${payload}`).digest('hex');
  }

  /** @description Recursively normalizes request values before hashing. @param value Request payload. @returns Deterministically ordered normalized value. */
  private normalize(value: unknown): unknown {
    if (Array.isArray(value)) return value.map((item) => this.normalize(item));
    if (value && typeof value === 'object') {
      return Object.fromEntries(Object.entries(value as Record<string, unknown>).sort(([a], [b]) => a.localeCompare(b)).map(([key, entry]) => [key, this.normalize(entry)]));
    }
    return value;
  }
}
