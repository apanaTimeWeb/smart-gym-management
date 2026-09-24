// RESPONSIBILITY: Implements Superadmin authentication, refresh rotation, login lockout, and logout semantics.
// FLOW: credentials -> failed-attempt counter -> profile -> bcrypt/JWT/Redis -> token response.
import { Injectable, HttpException, HttpStatus, UnauthorizedException } from '@nestjs/common';
import type { JwtSignOptions } from '@nestjs/jwt';
import { PinoLogger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { randomUUID } from 'node:crypto';
import { SuperadminAuthRepository } from '@/backend_superadmin/superadmin_modules/auth/superadmin-auth.repository';
import { SuperadminCoreRedisService } from '@/backend_superadmin/superadmin_core/superadmin_core_cache/superadmin-core-redis.service';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-auth.constants';
import type { SuperadminJwtClaims } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-auth.types';
import * as bcrypt from 'bcrypt';
import { SuperadminCoreAuditTrailService } from '@/backend_superadmin/superadmin_core/superadmin_core_observability/superadmin-core-audit-trail.service';
import { getRequestContext } from '@/backend_superadmin/superadmin_core/superadmin_core_observability/superadmin-core-request-context';

/**
 * Primary Intent: Defines SuperadminAuthService as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Injectable()
export class SuperadminAuthService {
  constructor(private readonly repository: SuperadminAuthRepository, private readonly jwt: JwtService, private readonly redis: SuperadminCoreRedisService, private readonly config: ConfigService, private readonly auditTrail: SuperadminCoreAuditTrailService, private readonly logger: PinoLogger) {}
/**
 * Primary Intent: Executes the login use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /**
 * Primary Intent: Executes the login use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async login(email: string, password: string): Promise<{ accessToken: string; refreshToken: string; user: { id: string; email: string; role: SuperadminRole } }> {
    const normalizedEmail = email.trim().toLowerCase();
    const lockKey = `auth:lock:${normalizedEmail}`;
    if (await this.redis.get(lockKey)) throw new HttpException({ error: 'RATE_LIMITED', errorCode: 'AUTH.ACCOUNT.TEMPORARILY_LOCKED', message: { key: 'auth.ERRORS.ACCOUNT_LOCKED' } }, HttpStatus.TOO_MANY_REQUESTS);
    const user = await this.repository.findByEmail(normalizedEmail);
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      const attemptKey = `auth:failed:${normalizedEmail}`;
      const attempts = await this.redis.increment(attemptKey, 900);
      if (attempts >= 5) {
        const locked = await this.redis.set(lockKey, '1', 900, true);
        if (locked) { const context = getRequestContext(); await this.auditTrail.record({ actorId: 'ANONYMOUS', actorRole: 'ANONYMOUS', action: 'AUTH_ACCOUNT_LOCKED', entityType: 'superadmin_auth_lock', entityId: normalizedEmail.replace(/[^a-z0-9]/gi, '_').slice(0, 64), oldValue: { failedAttempts: attempts - 1 }, newValue: { failedAttempts: attempts, lockedSeconds: 900 }, ipAddress: context?.ipAddress ?? '0.0.0.0', tenantId: context?.tenantId ?? null }); }
      }
      throw new UnauthorizedException({ error: 'UNAUTHORIZED', errorCode: 'AUTH.CREDENTIALS.INVALID', message: { key: 'auth.ERRORS.UNAUTHORIZED' } });
    }
    await this.redis.delete(`auth:failed:${normalizedEmail}`, lockKey);
    const claims: SuperadminJwtClaims = { sub: user.id, email: user.email, role: SuperadminRole.SUPERADMIN, tenantId: null, tokenVersion: user.tokenVersion };
    const tokens = await this.issueTokens(claims);
    return { ...tokens, user: { id: user.id, email: user.email, role: SuperadminRole.SUPERADMIN } };
  }

  /**
 * Primary Intent: Executes the `refresh` responsibility owned by this superadmin-auth.service construct.
   * Edge Cases: Invalid or unavailable dependencies must fail fast according to the owning module contract.
   * Side-Effects: Any writes, events, external calls, cache changes, or queue operations are limited to the documented method responsibility.
   * AI-Note: Keep this method single-purpose, preserve explicit return types, and do not move logic across feature boundaries.
   */
  /**
   * Primary Intent: Executes the refresh use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async refresh(refreshToken: string): Promise<{ accessToken: string; refreshToken: string }> {
    try {
      const claims = await this.jwt.verifyAsync<SuperadminJwtClaims & { jti?: string }>(refreshToken, { secret: this.config.getOrThrow<string>('app.jwtRefreshSecret') });
      if (!claims.jti || await this.redis.get(`refresh:deny:${claims.jti}`)) throw new UnauthorizedException({ error: 'UNAUTHORIZED', errorCode: 'AUTH.REFRESH.REVOKED', message: { key: 'auth.ERRORS.UNAUTHORIZED' } });
      const current = await this.repository.findById(claims.sub);
      if (!current || current.tokenVersion !== claims.tokenVersion) throw new UnauthorizedException({ error: 'UNAUTHORIZED', errorCode: 'AUTH.TOKEN_VERSION.REVOKED', message: { key: 'auth.ERRORS.UNAUTHORIZED' } });
      await this.redis.set(`refresh:deny:${claims.jti}`, '1', 604800);
      return this.issueTokens({ sub: current.id, email: current.email, role: current.role as SuperadminRole, tenantId: claims.tenantId, tokenVersion: current.tokenVersion });
    } catch (error) {
      if (error instanceof UnauthorizedException) throw error;
      this.logger.warn({ errorName: error instanceof Error ? error.name : 'UnknownError', context: SuperadminAuthService.name }, 'Refresh token verification failed');
      throw new UnauthorizedException({ error: 'UNAUTHORIZED', errorCode: 'AUTH.REFRESH.INVALID', message: { key: 'auth.ERRORS.UNAUTHORIZED' } });
    }
  }

  /**
 * Primary Intent: Executes the `issueTokens` responsibility owned by this superadmin-auth.service construct.
   * Edge Cases: Invalid or unavailable dependencies must fail fast according to the owning module contract.
   * Side-Effects: Any writes, events, external calls, cache changes, or queue operations are limited to the documented method responsibility.
   * AI-Note: Keep this method single-purpose, preserve explicit return types, and do not move logic across feature boundaries.
   */
  /**
   * Primary Intent: Executes the issueTokens use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  private async issueTokens(claims: SuperadminJwtClaims): Promise<{ accessToken: string; refreshToken: string }> {
    const accessToken = await this.jwt.signAsync(claims, { secret: this.config.getOrThrow<string>('app.jwtAccessSecret'), expiresIn: this.config.getOrThrow<JwtSignOptions['expiresIn']>('app.jwtAccessTtl') });
    const refreshToken = await this.jwt.signAsync({ ...claims, jti: randomUUID() }, { secret: this.config.getOrThrow<string>('app.jwtRefreshSecret'), expiresIn: this.config.getOrThrow<JwtSignOptions['expiresIn']>('app.jwtRefreshTtl') });
    return { accessToken, refreshToken };
  }

  /**
 * Primary Intent: Executes the `verifyGhostHandoff` responsibility owned by this superadmin-auth.service construct.
   * Edge Cases: Invalid or unavailable dependencies must fail fast according to the owning module contract.
   * Side-Effects: Any writes, events, external calls, cache changes, or queue operations are limited to the documented method responsibility.
   * AI-Note: Keep this method single-purpose, preserve explicit return types, and do not move logic across feature boundaries.
   */
  /**
   * Primary Intent: Executes the verifyGhostHandoff use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async verifyGhostHandoff(token: string): Promise<SuperadminJwtClaims & { impersonatedTenantId: string; purpose: string; exp: number }> {
    try {
      const claims = await this.jwt.verifyAsync<SuperadminJwtClaims & { impersonatedTenantId?: string; purpose?: string; exp?: number }>(token, { secret: this.config.getOrThrow<string>('app.jwtAccessSecret') });
      if (claims.purpose !== 'GYM_IMPERSONATION' || !claims.impersonatedTenantId || !claims.exp) throw new UnauthorizedException({ error: 'UNAUTHORIZED', errorCode: 'AUTH.GHOST_LOGIN.INVALID_HANDOFF', message: { key: 'auth.ERRORS.UNAUTHORIZED' } });
      return claims as SuperadminJwtClaims & { impersonatedTenantId: string; purpose: string; exp: number };
    } catch (error) {
      if (error instanceof UnauthorizedException) throw error;
      this.logger.warn({ errorName: error instanceof Error ? error.name : 'UnknownError', context: SuperadminAuthService.name }, 'Ghost handoff verification failed');
      throw new UnauthorizedException({ error: 'UNAUTHORIZED', errorCode: 'AUTH.GHOST_LOGIN.EXPIRED_HANDOFF', message: { key: 'auth.ERRORS.UNAUTHORIZED' } });
    }
  }

  /**
 * Primary Intent: Executes the `logout` responsibility owned by this superadmin-auth.service construct.
   * Edge Cases: Invalid or unavailable dependencies must fail fast according to the owning module contract.
   * Side-Effects: Any writes, events, external calls, cache changes, or queue operations are limited to the documented method responsibility.
   * AI-Note: Keep this method single-purpose, preserve explicit return types, and do not move logic across feature boundaries.
   */
  /**
   * Primary Intent: Executes the logout use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async logout(refreshToken: string): Promise<void> {
    try {
      const claims = await this.jwt.verifyAsync<SuperadminJwtClaims & { jti?: string }>(refreshToken, { secret: this.config.getOrThrow<string>('app.jwtRefreshSecret'), ignoreExpiration: true });
      if (claims.jti) await this.redis.set(`refresh:deny:${claims.jti}`, '1', 604800);
    } catch {
      return;
    }
  }
}
