// RESPONSIBILITY: Maintains the Redis refresh-token denylist required for immediate token revocation and replay hardening.
// FLOW: Auth refresh orchestrator/service -> AuthRefreshRevocationService -> Redis SHA-256 denylist key.

import { createHash } from 'node:crypto';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PinoLogger } from 'nestjs-pino';

import { CoreRedisService } from '@/backend_auth/core/cache/core-redis.service';
import { AuthConstants } from '@/backend_auth/modules/auth/auth.constants';

@Injectable()
export class AuthRefreshRevocationService {
  private readonly ttlSeconds: number;

  constructor(
    private readonly redis: CoreRedisService,
    config: ConfigService,
    private readonly logger: PinoLogger,
  ) {
    this.ttlSeconds = config.getOrThrow<number>('environment.JWT_REFRESH_TTL_SECONDS');
  }

  /** @description Checks whether the presented refresh token hash has been placed on the immediate revocation denylist. @param refreshToken - Presented refresh JWT. @returns True when denylisted. @throws CoreRedisTimeoutException when Redis cannot answer within its timeout budget. */
  async isRefreshTokenRevoked(refreshToken: string): Promise<boolean> {
    return (await this.redis.get(this.revocationKey(refreshToken))) === '1';
  }

  /** @description Adds a refresh token to the Redis denylist for the configured refresh lifetime. @param refreshToken - Refresh JWT that has been rotated or revoked. @returns Promise completion; Redis failure is logged because the authoritative DB session revocation remains in force. */
  async revokeRefreshToken(refreshToken: string): Promise<void> {
    try {
      await this.redis.set(this.revocationKey(refreshToken), '1', this.ttlSeconds);
    } catch (error) {
      const errorName = error instanceof Error ? error.name : 'UnknownError';
      this.logger.warn({ errorName }, 'Refresh-token denylist update failed; database session revocation remains authoritative.');
    }
  }

  /** @description Builds the privacy-preserving Redis key for a refresh token. @param refreshToken - Raw refresh JWT. @returns SHA-256 namespaced denylist key. */
  private revocationKey(refreshToken: string): string {
    const digest = createHash('sha256').update(refreshToken, 'utf8').digest('hex');
    return `${AuthConstants.REVOCATION.REFRESH_REVOKED_KEY_PREFIX}${digest}`;
  }
}
