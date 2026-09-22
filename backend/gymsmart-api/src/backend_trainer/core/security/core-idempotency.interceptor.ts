// RESPONSIBILITY: Enforces atomic idempotency for critical mutations and replays the first canonical response.
// FLOW: Route metadata + Idempotency-Key → Redis atomic claim → controller result → Redis replay record.

import { BadRequestException, CallHandler, ConflictException, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { firstValueFrom, from, Observable, switchMap } from 'rxjs';

import { CoreRequestContext } from '@/backend_trainer/core/context/core-request-context';
import { CoreRedisService } from '@/backend_trainer/core/redis/core-redis.service';
import { CORE_IDEMPOTENCY_REQUIRED } from '@/backend_trainer/core/security/core-idempotency.decorator';

import type { Request } from 'express';

const PROCESSING_MARKER = '__CORE_IDEMPOTENCY_PROCESSING__';
const PROCESSING_TTL_SECONDS = 120;
const RESULT_TTL_SECONDS = 86400;

@Injectable()
export class CoreIdempotencyInterceptor implements NestInterceptor {
  constructor(private readonly redis: CoreRedisService, private readonly reflector: Reflector) {}

  /** Enforces one in-flight execution per idempotency key and replays the stored result for retries. */
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const required = this.reflector.getAllAndOverride<boolean>(CORE_IDEMPOTENCY_REQUIRED, [context.getHandler(), context.getClass()]);
    if (!required) return next.handle();

    const request = context.switchToHttp().getRequest<Request>();
    const key = request.header('Idempotency-Key')?.trim();
    if (!key) throw new BadRequestException('CORE.IDEMPOTENCY.KEY_REQUIRED');
    if (key.length > 200) throw new BadRequestException('CORE.IDEMPOTENCY.KEY_TOO_LONG');

    const requestContext = CoreRequestContext.get();
    const cacheScope = `${requestContext.tenantId}:${requestContext.userId}:${request.method}:${request.baseUrl}:${request.path}`;
    const cacheKey = `idempotency:${Buffer.from(cacheScope).toString('base64url')}:${key}`;

    return from(this.claim(cacheKey)).pipe(
      switchMap(async (claim: { owner: boolean; value: string }) => {
        if (!claim.owner) return this.parseCached(claim.value);
        try {
          const value = await firstValueFrom(next.handle());
          await this.redis.client.set(cacheKey, JSON.stringify(value), 'EX', RESULT_TTL_SECONDS);
          return value;
        } catch (error) {
          await this.releaseClaim(cacheKey);
          throw error;
        }
      }),
    );
  }

  /** Atomically claims an idempotency key or returns the previously stored value. */
  private async claim(cacheKey: string): Promise<{ owner: boolean; value: string }> {
    const script = `
      local existing = redis.call('GET', KEYS[1])
      if existing then return 'EXISTING:' .. existing end
      redis.call('SET', KEYS[1], ARGV[1], 'EX', ARGV[2])
      return 'CLAIMED:' .. ARGV[1]
    `;
    const result = String(await this.redis.client.eval(script, 1, cacheKey, PROCESSING_MARKER, String(PROCESSING_TTL_SECONDS)));
    if (result.startsWith('CLAIMED:')) return { owner: true, value: result.slice('CLAIMED:'.length) };
    const existing = result.slice('EXISTING:'.length);
    if (existing !== PROCESSING_MARKER) return { owner: false, value: existing };
    return { owner: false, value: await this.waitForResult(cacheKey) };
  }

  /** Waits for an in-flight owner to publish the canonical response without re-running the mutation. */
  private async waitForResult(cacheKey: string): Promise<string> {
    const deadline = Date.now() + PROCESSING_TTL_SECONDS * 1000;
    while (Date.now() < deadline) {
      await new Promise<void>((resolve) => setTimeout(resolve, 50));
      const current = await this.redis.client.get(cacheKey);
      if (current && current !== PROCESSING_MARKER) return current;
      if (!current) throw new ConflictException('CORE.IDEMPOTENCY.REQUEST_EXPIRED');
    }
    throw new ConflictException('CORE.IDEMPOTENCY.REQUEST_IN_PROGRESS');
  }

  /** Releases a failed in-flight claim only when the current value is still the processing marker. */
  private async releaseClaim(cacheKey: string): Promise<void> {
    await this.redis.client.eval(`
      if redis.call('GET', KEYS[1]) == ARGV[1] then
        return redis.call('DEL', KEYS[1])
      end
      return 0
    `, 1, cacheKey, PROCESSING_MARKER);
  }

  /** Parses a previously stored idempotent response. */
  private parseCached(value: string): unknown {
    try {
      return JSON.parse(value) as unknown;
    } catch {
      throw new ConflictException('CORE.IDEMPOTENCY.CACHE_CORRUPTED');
    }
  }
}

