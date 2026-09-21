// RESPONSIBILITY: Authenticates credentials, enforces Redis lockout, creates refresh sessions and records login audits.
// FLOW: AuthSessionOrchestrator -> AuthLoginService -> Redis/UserRepository -> token/session/audit boundaries.

import { randomUUID } from 'node:crypto';

import { Injectable } from '@nestjs/common';

import { CoreAuditService } from '@/core/audit/core-audit.service';
import { CoreRedisService } from '@/core/cache/core-redis.service';
import { AuthConstants } from '@/modules/auth/auth.constants';
import { AuthAccountLockedException, AuthInvalidCredentialsException } from '@/modules/auth/auth.exceptions';
import { AuthRefreshSessionRepository } from '@/modules/auth/repositories/auth-refresh-session.repository';
import { AuthUserRepository } from '@/modules/auth/repositories/auth-user.repository';
import { AuthAuditRoleMapper } from '@/modules/auth/utils/auth-audit-role.mapper';
import { AuthLockoutUtils } from '@/modules/auth/utils/auth-lockout.utils';
import { AuthPasswordUtils } from '@/modules/auth/utils/auth-password.utils';
import { AuthTokenUtils } from '@/modules/auth/utils/auth-token.utils';

import type { AuthCredentialRecord, AuthLoginDomainResult, AuthUserDomain } from '@/modules/auth/auth.interfaces';
import type { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthLoginService {
  private readonly tokenUtils: AuthTokenUtils;
  private readonly maxAttempts: number;
  private readonly lockoutWindowSeconds: number;
  private readonly refreshTtlSeconds: number;

  constructor(
    private readonly userRepository: AuthUserRepository,
    private readonly sessionRepository: AuthRefreshSessionRepository,
    private readonly redis: CoreRedisService,
    private readonly audit: CoreAuditService,
    config: ConfigService,
  ) {
    this.tokenUtils = new AuthTokenUtils({
      accessSecret: config.getOrThrow<string>('environment.JWT_ACCESS_SECRET'),
      refreshSecret: config.getOrThrow<string>('environment.JWT_REFRESH_SECRET'),
      accessTtlSeconds: config.getOrThrow<number>('environment.JWT_ACCESS_TTL_SECONDS'),
      refreshTtlSeconds: config.getOrThrow<number>('environment.JWT_REFRESH_TTL_SECONDS'),
    });
    this.maxAttempts = config.getOrThrow<number>('environment.AUTH_LOCKOUT_MAX_ATTEMPTS');
    this.lockoutWindowSeconds = config.getOrThrow<number>('environment.AUTH_LOCKOUT_WINDOW_SECONDS');
    this.refreshTtlSeconds = config.getOrThrow<number>('environment.JWT_REFRESH_TTL_SECONDS');
  }

  /** @description Authenticates one user and creates a persisted refresh session. @param email - Login email. @param password - Login password. @returns Login result containing tokens and authoritative user identity. @throws AuthInvalidCredentialsException/AuthAccountLockedException. */
  async login(email: string, password: string): Promise<AuthLoginDomainResult> {
    const normalizedEmail = this.normalizeEmail(email);
    await this.assertNotLocked(normalizedEmail);
    const credentials = await this.userRepository.findCredentialsByEmail(normalizedEmail);
    if (!credentials) await this.rejectInvalidLogin(normalizedEmail);
    const valid = await AuthPasswordUtils.compare(password, credentials.passwordHash);
    if (!valid) await this.rejectInvalidLogin(normalizedEmail);
    await this.clearLockout(normalizedEmail);
    return this.createAuthenticatedSession(credentials);
  }

  /** @description Normalizes user-entered email before any authentication lookup. @param email - User-entered email. @returns Canonical lowercase email. */
  private normalizeEmail(email: string): string { return email.trim().toLowerCase(); }

  /** @description Rejects a login while the account's Redis lockout marker is active. @param email - Normalized email. @returns Promise completion. @throws AuthAccountLockedException when locked. */
  private async assertNotLocked(email: string): Promise<void> {
    if (await this.redis.get(AuthLockoutUtils.lockoutKey(email))) throw new AuthAccountLockedException();
  }

  /** @description Records a failed attempt and raises the appropriate authentication exception. @param email - Normalized email. @returns Promise completion. @throws AuthInvalidCredentialsException or AuthAccountLockedException. */
  private async rejectInvalidLogin(email: string): Promise<never> {
    const attempts = await this.redis.incrementWithExpiry(AuthLockoutUtils.attemptKey(email), this.lockoutWindowSeconds);
    if (attempts >= this.maxAttempts) {
      await this.redis.set(AuthLockoutUtils.lockoutKey(email), '1', this.lockoutWindowSeconds);
      throw new AuthAccountLockedException();
    }
    throw new AuthInvalidCredentialsException();
  }

  /** @description Clears the failed-attempt and lockout markers after a successful login. @param email - Normalized email. @returns Promise completion. */
  private async clearLockout(email: string): Promise<void> { await this.redis.delete(AuthLockoutUtils.attemptKey(email), AuthLockoutUtils.lockoutKey(email)); }

  /** @description Creates tokens, persists their session and records a successful-login audit event. @param credentials - Auth credential record. @returns Login domain result. @throws Error when session persistence fails. */
  private async createAuthenticatedSession(credentials: AuthCredentialRecord): Promise<AuthLoginDomainResult> {
    const sessionId = randomUUID();
    const accessToken = this.tokenUtils.createAccessToken(credentials, sessionId);
    const refreshToken = this.tokenUtils.createRefreshToken(credentials.id, sessionId);
    const expiresAt = new Date(Date.now() + this.refreshTtlMs());
    await this.sessionRepository.createRefreshSession(credentials.id, sessionId, this.tokenUtils.hashRefreshToken(refreshToken), expiresAt);
    const user: AuthUserDomain = { id: credentials.id, name: credentials.name, email: credentials.email, role: credentials.role, ...(credentials.tenantId ? { tenantId: credentials.tenantId } : {}) };
    await this.audit.record({ actorId: user.id, actorRole: AuthAuditRoleMapper(user.role), action: AuthConstants.AUDIT.LOGIN_SUCCESS, entityType: 'auth_user', entityId: user.id, oldValue: null, newValue: { sessionId }, ipAddress: this.audit.getRequestMetadata().ipAddress });
    return { accessToken, refreshToken, user };
  }

  /** @description Converts configured refresh TTL seconds into milliseconds. @returns Refresh TTL in milliseconds. */
  private refreshTtlMs(): number { return this.refreshTtlSeconds * 1000; }
}
