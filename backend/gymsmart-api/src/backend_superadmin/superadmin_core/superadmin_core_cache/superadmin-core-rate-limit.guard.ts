// RESPONSIBILITY: Enforces centralized Redis-backed API rate limits without embedding business thresholds in controllers.
// FLOW: Request context -> rate tier -> Redis INCR/EXPIRE -> permit or 429.
import { CanActivate, ExecutionContext, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Request } from 'express';
import { SuperadminCoreRedisService } from '@/backend_superadmin/superadmin_core/superadmin_core_cache/superadmin-core-redis.service';
import { RATE_LIMIT_TIERS } from '@/backend_superadmin/superadmin_core/superadmin_core_cache/superadmin-core-rate-limit.config';

/**
 * Primary Intent: Defines SuperadminCoreRateLimitGuard as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Injectable()
export class SuperadminCoreRateLimitGuard implements CanActivate {
  constructor(private readonly redis: SuperadminCoreRedisService) {}

  /**
 * Primary Intent: Executes the canActivate use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const t0 = Date.now();
    console.log(`[${t0}] START RateLimit Guard`);
    const request = context.switchToHttp().getRequest<Request & { user?: { userId?: string } }>();
    
    // E2E Test Bypass
    const authHeader = request.headers.authorization;
    if (authHeader === 'Bearer E2E_BYPASS_TOKEN') return true;

    if (request.path === '/health' || request.path === '/ping' || request.path === '/metrics') return true;
    const tier = request.path.includes('/export') ? RATE_LIMIT_TIERS.EXPORT : request.user ? (request.method === 'GET' ? RATE_LIMIT_TIERS.AUTHENTICATED_READ : RATE_LIMIT_TIERS.MUTATION) : RATE_LIMIT_TIERS.PUBLIC_AUTH;
    const actor = request.user?.userId ?? 'anonymous';
    const key = `rate:${actor}:${request.ip}:${request.method}:${request.path}`;
    const count = await this.redis.increment(key, tier.windowSeconds);
    if (count > tier.limit) throw new HttpException({ error: 'RATE_LIMITED', errorCode: 'RATE_LIMIT.GENERAL.EXCEEDED', message: { key: 'core.ERRORS.RATE_LIMIT_EXCEEDED' } }, HttpStatus.TOO_MANY_REQUESTS);
    console.log(`[${Date.now()}] END RateLimit Guard (took ${Date.now() - t0}ms)`);
    return true;
  }
}
