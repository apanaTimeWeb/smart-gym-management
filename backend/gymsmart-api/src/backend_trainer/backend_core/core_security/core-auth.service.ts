// RESPONSIBILITY: Authenticates master users, enforces brute-force lockout, and rotates HttpOnly refresh tokens through Redis.
// FLOW: Auth controller → credential validation → Redis lockout → token rotation → master audit.
import { Injectable, HttpException, HttpStatus, UnauthorizedException } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { createHash, randomUUID } from 'node:crypto';
import { CoreAuthAuditRepository } from '@/backend_trainer/backend_core/core_database/core-auth-audit.repository';
import { CoreAuthUserRepository } from '@/backend_trainer/backend_core/core_database/core-auth-user.repository';
import { CoreJwtService } from '@/backend_trainer/backend_core/core_security/core-jwt.service';
import { CoreRedisService } from '@/backend_trainer/backend_core/core_redis/core-redis.service';
import type { CoreAuthTokenPair } from '@/backend_trainer/backend_core/core_types/core-auth.types';
/**
 * Intent: Defines the CoreAuthService boundary for the backend core architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@Injectable()
export class CoreAuthService {
  constructor(
    private readonly users: CoreAuthUserRepository,
    private readonly authAudit: CoreAuthAuditRepository,
    private readonly jwt: CoreJwtService,
    private readonly redis: CoreRedisService,
  ) {}
  /** Verifies credentials, applies the five-attempt lockout rule, and issues a rotating refresh token. */
  /**
 * Intent: Executes the login operation inside the backend core service boundary.
 * Edge Cases: Preserve validation, ownership checks, transactions, idempotency, canonical errors, and side-effects across every success and failure path.
 * AI Note: Keep the method focused on its use case; do not add raw ORM access, cross-module shortcuts, or silent API changes.
 */
/**
 * @description Executes login inside the owning backend service/repository boundary without exposing ORM details.
 * @param email - Input for login.
 * @param password - Input for login.
 * @returns {Promise<CoreAuthTokenPair>} The typed result defined by the owning contract.
 * @throws HttpException, UnauthorizedException when the operation rejects its explicit business preconditions.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
async login(email: string, password: string): Promise<CoreAuthTokenPair> {
    const normalized = email.trim().toLowerCase();
    const identifierHash = createHash('sha256').update(normalized).digest('hex');
    const lockKey = `login-lock:${identifierHash}`;
    const attempts = Number(await this.redis.client.get(lockKey));
    if (attempts >= 5) throw new HttpException('AUTH.ACCOUNT.LOCKOUT_ACTIVE', HttpStatus.TOO_MANY_REQUESTS);
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
  /**
 * Intent: Executes the refresh operation inside the backend core service boundary.
 * Edge Cases: Preserve validation, ownership checks, transactions, idempotency, canonical errors, and side-effects across every success and failure path.
 * AI Note: Keep the method focused on its use case; do not add raw ORM access, cross-module shortcuts, or silent API changes.
 */
/**
 * @description Executes refresh inside the owning backend service/repository boundary without exposing ORM details.
 * @param refreshToken - Input for refresh.
 * @returns {Promise<CoreAuthTokenPair>} The typed result defined by the owning contract.
 * @throws UnauthorizedException when the operation rejects its explicit business preconditions.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
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
  /**
 * Intent: Executes the logout operation inside the backend core service boundary.
 * Edge Cases: Preserve validation, ownership checks, transactions, idempotency, canonical errors, and side-effects across every success and failure path.
 * AI Note: Keep the method focused on its use case; do not add raw ORM access, cross-module shortcuts, or silent API changes.
 */
/**
 * @description Executes logout inside the owning backend service/repository boundary without exposing ORM details.
 * @param refreshToken - Input for logout.
 * @returns {Promise<void>} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
async logout(refreshToken: string | undefined): Promise<void> {
    if (!refreshToken) return;
    await this.redis.client.del(`refresh:${refreshToken}`);
    await this.redis.client.set(`refresh:revoked:${refreshToken}`, '1', 'EX', 60 * 60 * 24 * 7);
  }
}
