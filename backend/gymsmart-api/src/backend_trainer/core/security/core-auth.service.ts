// RESPONSIBILITY: Authenticates master users, enforces brute-force lockout, and rotates HttpOnly refresh tokens through Redis.
// FLOW: Auth controller → credential validation → Redis lockout → token rotation → master audit.

import { Injectable, HttpException, UnauthorizedException } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { createHash, randomUUID } from 'node:crypto';
import { CoreAuthAuditRepository } from '@/backend_trainer/core/database/core-auth-audit.repository';
import { CoreAuthUserRepository } from '@/backend_trainer/core/database/core-auth-user.repository';
import { CoreJwtService } from '@/backend_trainer/core/security/core-jwt.service';
import { CoreRedisService } from '@/backend_trainer/core/redis/core-redis.service';
import type { CoreAuthTokenPair } from '@/backend_trainer/core/types/core-auth.types';

@Injectable()
export class CoreAuthService {
  constructor(
    private readonly users: CoreAuthUserRepository,
    private readonly authAudit: CoreAuthAuditRepository,
    private readonly jwt: CoreJwtService,
    private readonly redis: CoreRedisService,
  ) {}

  /** Verifies credentials, applies the five-attempt lockout rule, and issues a rotating refresh token. */
  async login(email: string, password: string): Promise<CoreAuthTokenPair> {
    const normalized = email.trim().toLowerCase();
    const identifierHash = createHash('sha256').update(normalized).digest('hex');
    const lockKey = `login-lock:${identifierHash}`;
    const attempts = Number(await this.redis.client.get(lockKey));
    if (attempts >= 5) throw new HttpException('AUTH.ACCOUNT.LOCKOUT_ACTIVE', 429);
    const user = await this.users.findActiveByEmail(normalized);
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      const count = await this.redis.client.incr(lockKey);
      if (count === 1) await this.redis.client.expire(lockKey, 900);
      if (count >= 5) await this.authAudit.createLoginLockAudit(user?.id ?? null, identifierHash);
      throw new UnauthorizedException('AUTH.CREDENTIALS.INVALID');
    }
    await this.redis.client.del(lockKey);
    const refreshToken = randomUUID();
    await this.redis.client.set(`refresh:${refreshToken}`, user.id, 'EX', 60 * 60 * 24 * 7);
    return { accessToken: this.jwt.signAccessToken(user.id, user.email, user.role), refreshToken };
  }

  /** Atomically consumes a refresh token, deny-lists it, and issues one replacement token. */
  async refresh(refreshToken: string): Promise<CoreAuthTokenPair> {
    if (!refreshToken) throw new UnauthorizedException('AUTH.REFRESH.COOKIE_REQUIRED');
    const tokenKey = `refresh:${refreshToken}`;
    const revokedKey = `refresh:revoked:${refreshToken}`;
    const ttlSeconds = 60 * 60 * 24 * 7;
    const script = `
      local userId = redis.call('GET', KEYS[1])
      if not userId then return '' end
      redis.call('DEL', KEYS[1])
      redis.call('SET', KEYS[2], '1', 'EX', ARGV[1])
      return userId
    `;
    const userId = String(await this.redis.client.eval(script, 2, tokenKey, revokedKey, String(ttlSeconds)));
    if (!userId) throw new UnauthorizedException('AUTH.REFRESH.INVALID');
    const user = await this.users.findActiveById(userId);
    if (!user) throw new UnauthorizedException('AUTH.USER.INACTIVE');
    const next = randomUUID();
    await this.redis.client.set(`refresh:${next}`, user.id, 'EX', ttlSeconds);
    return { accessToken: this.jwt.signAccessToken(user.id, user.email, user.role), refreshToken: next };
  }

  /** Revokes a refresh token immediately. */
  async logout(refreshToken: string | undefined): Promise<void> {
    if (!refreshToken) return;
    await this.redis.client.del(`refresh:${refreshToken}`);
    await this.redis.client.set(`refresh:revoked:${refreshToken}`, '1', 'EX', 60 * 60 * 24 * 7);
  }
}
