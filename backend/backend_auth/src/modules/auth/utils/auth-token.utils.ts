// RESPONSIBILITY: Signs/verifies Auth JWTs and hashes refresh tokens for persistence.
// FLOW: Auth service -> AuthTokenUtils -> JWT signing/verification -> Auth session persistence.

import { createHash, randomUUID } from 'node:crypto';

import jwt from 'jsonwebtoken';

import { AuthRefreshRejectedException } from '@/modules/auth/auth.exceptions';

import type { AuthAccessTokenClaims, AuthRefreshDomainResult } from '@/modules/auth/auth.interfaces';
import type { AuthRole } from '@/modules/auth/auth.roles.constants';
export class AuthTokenUtils {
  constructor(private readonly config: { accessSecret: string; refreshSecret: string; accessTtlSeconds: number; refreshTtlSeconds: number }) {}

  /**
   * @description Signs a short-lived access token containing only stable Auth claims.
   * @param user - Auth domain identity.
   * @param sessionId - Persisted refresh-session UUID.
   * @returns Access JWT string.
   */
  createAccessToken(user: { id: string; email: string; role: AuthRole; tenantId?: string }, sessionId: string): string {
    const claims: AuthAccessTokenClaims = {
      sub: user.id,
      sid: sessionId,
      email: user.email,
      role: user.role,
      ...(user.tenantId ? { tenantId: user.tenantId } : {}),
    };
    return jwt.sign(claims, this.config.accessSecret, { expiresIn: this.config.accessTtlSeconds, jwtid: randomUUID() });
  }

  /**
   * @description Signs a refresh JWT bound to one persisted session.
   * @param userId - User UUID.
   * @param sessionId - Refresh session UUID.
   * @returns Refresh JWT string.
   */
  createRefreshToken(userId: string, sessionId: string): string {
    return jwt.sign({ sub: userId, sid: sessionId, kind: 'refresh' }, this.config.refreshSecret, {
      expiresIn: this.config.refreshTtlSeconds,
      jwtid: randomUUID(),
    });
  }

  /**
   * @description Verifies refresh JWT signature and required claims.
   * @param refreshToken - Presented refresh JWT.
   * @returns Session/user IDs from the verified token.
   */
  verifyRefreshToken(refreshToken: string): { userId: string; sessionId: string } {
    const payload = jwt.verify(refreshToken, this.config.refreshSecret) as Record<string, unknown>;
    if (payload['kind'] !== 'refresh' || typeof payload['sub'] !== 'string' || typeof payload['sid'] !== 'string') {
      throw new AuthRefreshRejectedException();
    }
    return { userId: payload['sub'], sessionId: payload['sid'] };
  }

  /**
   * @description Hashes a refresh token before database persistence.
   * @param refreshToken - Raw refresh JWT.
   * @returns SHA-256 digest.
   */
  hashRefreshToken(refreshToken: string): string {
    return createHash('sha256').update(refreshToken, 'utf8').digest('hex');
  }

  /**
   * @description Creates the explicit refresh result object used by the API mapper.
   * @param accessToken - New access token.
   * @param refreshToken - New refresh token.
   * @returns Refresh domain result.
   */
  toRefreshResult(accessToken: string, refreshToken: string): AuthRefreshDomainResult {
    return { accessToken, refreshToken };
  }
}
