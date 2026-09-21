// RESPONSIBILITY: Implements Superadmin authentication, refresh rotation, login lockout, and logout semantics.
// FLOW: credentials -> failed-attempt counter -> profile -> bcrypt/JWT/Redis -> token response.
import { Injectable, TooManyRequestsException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { randomUUID } from 'node:crypto';
import { AuthRepository } from '@/modules/auth/auth.repository';
import { RedisService } from '@/core/cache/redis.service';
import { SuperadminRole, JwtClaims } from '@/core/auth/auth.types';

@Injectable()
export class AuthService {
  constructor(private readonly repository: AuthRepository, private readonly jwt: JwtService, private readonly redis: RedisService, private readonly config: ConfigService) {}

  /** Authenticates a Superadmin and returns a short-lived access token plus rotated refresh token. */
  async login(email: string, password: string): Promise<{ accessToken: string; refreshToken: string; user: { id: string; email: string; role: SuperadminRole } }> {
    const normalizedEmail = email.trim().toLowerCase();
    const lockKey = `auth:lock:${normalizedEmail}`;
    if (await this.redis.get(lockKey)) throw new TooManyRequestsException('Account temporarily locked');
    const user = await this.repository.findByEmail(normalizedEmail);
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      const attemptKey = `auth:failed:${normalizedEmail}`;
      const attempts = await this.redis.increment(attemptKey, 900);
      if (attempts >= 5) await this.redis.set(lockKey, '1', 900);
      throw new UnauthorizedException('Invalid credentials');
    }
    await this.redis.delete(`auth:failed:${normalizedEmail}`, lockKey);
    const claims: JwtClaims = { sub: user.id, email: user.email, role: SuperadminRole.SUPERADMIN, tenantId: null, tokenVersion: user.tokenVersion };
    const tokens = await this.issueTokens(claims);
    return { ...tokens, user: { id: user.id, email: user.email, role: SuperadminRole.SUPERADMIN } };
  }

  /** Rotates a refresh token and deny-lists the previous token identifier. */
  async refresh(refreshToken: string): Promise<{ accessToken: string; refreshToken: string }> {
    try {
      const claims = await this.jwt.verifyAsync<JwtClaims & { jti?: string }>(refreshToken, { secret: this.config.getOrThrow<string>('app.jwtRefreshSecret') });
      if (!claims.jti || await this.redis.get(`refresh:deny:${claims.jti}`)) throw new UnauthorizedException('Refresh token revoked');
      await this.redis.set(`refresh:deny:${claims.jti}`, '1', 604800);
      return this.issueTokens({ sub: claims.sub, email: claims.email, role: claims.role, tenantId: claims.tenantId, tokenVersion: claims.tokenVersion });
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  /** Issues a new access/refresh token pair for verified claims. */
  private async issueTokens(claims: JwtClaims): Promise<{ accessToken: string; refreshToken: string }> {
    const accessToken = await this.jwt.signAsync(claims, { secret: this.config.getOrThrow<string>('app.jwtAccessSecret'), expiresIn: this.config.getOrThrow<string>('app.jwtAccessTtl') });
    const refreshToken = await this.jwt.signAsync({ ...claims, jti: randomUUID() }, { secret: this.config.getOrThrow<string>('app.jwtRefreshSecret'), expiresIn: this.config.getOrThrow<string>('app.jwtRefreshTtl') });
    return { accessToken, refreshToken };
  }

  /** Revokes a refresh token immediately through the Redis denylist. */
  async logout(refreshToken: string): Promise<void> {
    try {
      const claims = await this.jwt.verifyAsync<JwtClaims & { jti?: string }>(refreshToken, { secret: this.config.getOrThrow<string>('app.jwtRefreshSecret'), ignoreExpiration: true });
      if (claims.jti) await this.redis.set(`refresh:deny:${claims.jti}`, '1', 604800);
    } catch {
      return;
    }
  }
}
