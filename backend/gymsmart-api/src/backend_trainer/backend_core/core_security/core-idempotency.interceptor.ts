// RESPONSIBILITY: Enforces atomic idempotency for state mutations and replays the first canonical response, including critical response headers.
// FLOW: Route metadata + Idempotency-Key → Redis atomic claim → controller execution → cached body/status/headers → safe replay.

import { BadRequestException, CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { createHash } from 'node:crypto';
import { Reflector } from '@nestjs/core';
import { firstValueFrom, from, Observable, switchMap } from 'rxjs';
import type { Response } from 'express';
import type { Request } from 'express';
import { CoreRequestContext } from '@/backend_trainer/backend_core/core_context/core-request-context';
import { CoreIdempotencyCacheService, type CoreCachedIdempotencyResponse } from '@/backend_trainer/backend_core/core_security/core-idempotency-cache.service';
import { CORE_IDEMPOTENCY_REQUIRED, CORE_IDEMPOTENCY_TTL_SECONDS } from '@/backend_trainer/backend_core/core_security/core-idempotency.decorator';

const RESULT_TTL_SECONDS = 86400;

/**
 * Intent: Enforces one mutation execution per idempotency key and safely replays the first response.
 * Edge Cases: Missing/oversized keys fail fast; concurrent callers wait; failed executions release only their own marker.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Preserve tenant/user/method/path/body fingerprinting and never rerun an occupied mutation.
 */
@Injectable()
export class CoreIdempotencyInterceptor implements NestInterceptor {
  constructor(private readonly cache: CoreIdempotencyCacheService, private readonly reflector: Reflector) {}

  /** Reads route metadata and delegates the mutation replay lifecycle to the cache-backed execution path. */
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    if (!this.reflector.getAllAndOverride<boolean>(CORE_IDEMPOTENCY_REQUIRED, [context.getHandler(), context.getClass()])) return next.handle();
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();
    const key = request.header('Idempotency-Key')?.trim();
    if (!key) throw new BadRequestException('CORE.IDEMPOTENCY.KEY_REQUIRED');
    if (key.length > 200) throw new BadRequestException('CORE.IDEMPOTENCY.KEY_TOO_LONG');
    const cacheKey = this.buildCacheKey(request, key);
    const ttl = this.reflector.getAllAndOverride<number>(CORE_IDEMPOTENCY_TTL_SECONDS, [context.getHandler(), context.getClass()]) ?? RESULT_TTL_SECONDS;
    return from(this.cache.claim(cacheKey)).pipe(switchMap((claim) => this.finishClaim(claim, cacheKey, response, next, ttl)));
  }

  /** Completes a claimed mutation or replays the already committed response. */
  private async finishClaim(claim: { owner: boolean; value: string }, cacheKey: string, response: Response, next: CallHandler, ttl: number): Promise<unknown> {
    if (!claim.owner) { const cached = this.cache.parse(claim.value); this.applyCachedResponse(response, cached); return cached.value; }
    try {
      const value = await firstValueFrom(next.handle());
      const cached: CoreCachedIdempotencyResponse = { value, statusCode: response.statusCode, headers: this.captureReplayHeaders(response) };
      await this.cache.store(cacheKey, cached, ttl);
      return value;
    } catch (error) { await this.cache.release(cacheKey); throw error; }
  }

  /** Builds a tenant/user/request fingerprint so a reused key cannot replay a different mutation. */
  private buildCacheKey(request: Request, key: string): string {
    const context = CoreRequestContext.get();
    const refreshToken = typeof request.cookies?.refresh_token === 'string' ? request.cookies.refresh_token : undefined;
    const refreshTokenHash = refreshToken ? createHash('sha256').update(refreshToken).digest('hex') : undefined;
    const fingerprint = createHash('sha256').update(JSON.stringify({ body: request.body ?? null, query: request.query ?? null, refreshTokenHash })).digest('hex');
    return `idempotency:${Buffer.from(`${context.tenantId}:${context.userId}:${request.method}:${request.baseUrl}:${request.path}:${fingerprint}`).toString('base64url')}:${key}`;
  }

  /** Captures only replay-safe headers required to preserve mutation semantics. */
  private captureReplayHeaders(response: Response): CoreCachedIdempotencyResponse['headers'] {
    const read = (value: string | string[] | number | undefined): string | undefined => typeof value === 'string' ? value : undefined;
    const cookies = response.getHeader('Set-Cookie');
    return { ...(Array.isArray(cookies) ? { setCookie: cookies.filter((item): item is string => typeof item === 'string') } : typeof cookies === 'string' ? { setCookie: [cookies] } : {}), ...(read(response.getHeader('Location')) ? { location: read(response.getHeader('Location')) } : {}), ...(read(response.getHeader('Content-Location')) ? { contentLocation: read(response.getHeader('Content-Location')) } : {}), ...(read(response.getHeader('Retry-After')) ? { retryAfter: read(response.getHeader('Retry-After')) } : {}) };
  }

  /** Restores replay-safe status and headers before the normal response interceptor serializes the value. */
  private applyCachedResponse(response: Response, cached: CoreCachedIdempotencyResponse): void {
    response.status(cached.statusCode);
    if (cached.headers.setCookie?.length) response.setHeader('Set-Cookie', cached.headers.setCookie);
    if (cached.headers.location) response.setHeader('Location', cached.headers.location);
    if (cached.headers.contentLocation) response.setHeader('Content-Location', cached.headers.contentLocation);
    if (cached.headers.retryAfter) response.setHeader('Retry-After', cached.headers.retryAfter);
  }
}
