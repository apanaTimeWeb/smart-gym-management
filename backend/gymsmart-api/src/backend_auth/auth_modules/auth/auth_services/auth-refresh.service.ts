// RESPONSIBILITY: Validates and rotates refresh sessions under a pessimistic row lock.
// FLOW: AuthSessionOrchestrator -> AuthRefreshService -> token verification -> locked repository -> audit.

import { Injectable } from '@nestjs/common';

import { CoreAuditService } from '@/backend_auth/auth_core/audit/core-audit.service';
import { AuthRefreshRejectedException, AuthRefreshReuseDetectedException } from '@/backend_auth/auth_modules/auth/auth.exceptions';
import { AuthConstants } from '@/backend_auth/auth_modules/auth/auth.constants';
import { AuthRefreshSessionRepository } from '@/backend_auth/auth_modules/auth/auth_repositories/auth-refresh-session.repository';
import { AuthRefreshRevocationService } from '@/backend_auth/auth_modules/auth/auth_services/auth-refresh-revocation.service';
import { AuthUserRepository } from '@/backend_auth/auth_modules/auth/auth_repositories/auth-user.repository';
import { AuthAuditRoleMapper } from '@/backend_auth/auth_modules/auth/auth_utils/auth-audit-role.mapper';
import { AuthTokenUtils } from '@/backend_auth/auth_modules/auth/auth_utils/auth-token.utils';

import type { AuthRefreshDomainResult, AuthSessionDomain, AuthUserDomain } from '@/backend_auth/auth_modules/auth/auth.interfaces';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthRefreshService {
  private readonly tokenUtils: AuthTokenUtils;
  private readonly refreshTtlSeconds: number;

  constructor(
    private readonly sessionRepository: AuthRefreshSessionRepository,
    private readonly userRepository: AuthUserRepository,
    private readonly audit: CoreAuditService,
    private readonly revocation: AuthRefreshRevocationService,
    config: ConfigService,
  ) {
    this.tokenUtils = new AuthTokenUtils({
      accessSecret: config.getOrThrow<string>('environment.JWT_ACCESS_SECRET'),
      refreshSecret: config.getOrThrow<string>('environment.JWT_REFRESH_SECRET'),
      accessTtlSeconds: config.getOrThrow<number>('environment.JWT_ACCESS_TTL_SECONDS'),
      refreshTtlSeconds: config.getOrThrow<number>('environment.JWT_REFRESH_TTL_SECONDS'),
    });
    this.refreshTtlSeconds = config.getOrThrow<number>('environment.JWT_REFRESH_TTL_SECONDS');
  }

  /** @description Rotates one refresh session under a row lock and returns a new token pair. @param refreshToken - Presented refresh token. @returns Rotated access/refresh tokens. @throws AuthRefreshRejectedException/AuthRefreshReuseDetectedException. */
  async refresh(refreshToken: string): Promise<AuthRefreshDomainResult> {
    const identifiers = this.parseRefreshToken(refreshToken);
    if (await this.revocation.isRefreshTokenRevoked(refreshToken)) throw new AuthRefreshReuseDetectedException(identifiers.userId, identifiers.sessionId);

    const session = await this.sessionRepository.findSessionByIdForUpdate(identifiers.sessionId);
    const validSession = this.assertRefreshSession(session, identifiers.userId);
    const user = await this.userRepository.findUserByIdOrThrow(identifiers.userId);
    this.assertTokenHash(refreshToken, validSession.refreshTokenHash, identifiers.userId, identifiers.sessionId);
    return this.rotateSession(user, validSession.id);
  }

  /** @description Verifies the refresh JWT shape and required claims. @param refreshToken - Presented refresh JWT. @returns Verified user/session identifiers. @throws AuthRefreshRejectedException. */
  private parseRefreshToken(refreshToken: string): { userId: string; sessionId: string } {
    try { return this.tokenUtils.verifyRefreshToken(refreshToken); } catch { throw new AuthRefreshRejectedException(); }
  }

  /** @description Validates the locked refresh session state before token rotation. @param session - Locked session or null. @param userId - JWT subject. @returns The validated locked session. @throws AuthRefreshRejectedException when the session is unavailable, bound to another user, revoked or expired. */
  private assertRefreshSession(session: AuthSessionDomain | null, userId: string): AuthSessionDomain {
    if (!session || session.userId !== userId || session.revokedAt || session.expiresAt.getTime() <= Date.now()) throw new AuthRefreshRejectedException();
    return session;
  }

  /** @description Verifies the presented token hash against the locked persisted session. @param refreshToken - Presented refresh token. @param storedHash - Persisted hash. @param userId - Verified JWT user ID. @param sessionId - Verified JWT session ID. @returns void. @throws AuthRefreshReuseDetectedException when the token was already rotated. */
  private assertTokenHash(refreshToken: string, storedHash: string, userId: string, sessionId: string): void {
    if (this.tokenUtils.hashRefreshToken(refreshToken) !== storedHash) throw new AuthRefreshReuseDetectedException(userId, sessionId);
  }

  /** @description Issues replacement tokens, persists the new hash and records the rotation audit. @param user - Authoritative user. @param sessionId - Persisted refresh-session UUID. @returns Rotated token pair. */
  private async rotateSession(user: AuthUserDomain, sessionId: string): Promise<AuthRefreshDomainResult> {
    const accessToken = this.tokenUtils.createAccessToken(user, sessionId);
    const refreshToken = this.tokenUtils.createRefreshToken(user.id, sessionId);
    const expiresAt = new Date(Date.now() + this.refreshTtlMs());
    await this.sessionRepository.rotateRefreshSession(sessionId, this.tokenUtils.hashRefreshToken(refreshToken), expiresAt);
    await this.audit.record({ actorId: user.id, actorRole: AuthAuditRoleMapper(user.role), action: AuthConstants.AUDIT.REFRESH_ROTATED, entityType: 'auth_refresh_session', entityId: sessionId, oldValue: null, newValue: { rotated: true }, ipAddress: this.audit.getRequestMetadata().ipAddress });
    return this.tokenUtils.toRefreshResult(accessToken, refreshToken);
  }

  /** @description Converts refresh TTL seconds into milliseconds. @returns Refresh TTL in milliseconds. */
  private refreshTtlMs(): number { return this.refreshTtlSeconds * 1000; }
}
