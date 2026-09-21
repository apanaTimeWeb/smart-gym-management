// RESPONSIBILITY: Authenticates Admin users, enforces brute-force lockout, rotates refresh tokens, and revokes prior refresh tokens.
// FLOW: Auth controller → CoreAuthService → master DB + Redis → short-lived access token + HttpOnly refresh cookie.

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { randomUUID } from 'node:crypto';
import { CoreMasterAdminEntity } from '@/backend_admin/core/auth/core-master-admin.entity';
import { CoreRedisService } from '@/backend_admin/core/redis/core-redis.service';

@Injectable()
export class CoreAuthService {
  constructor(
    @InjectDataSource() private readonly masterDataSource: DataSource,
    private readonly redis: CoreRedisService,
    private readonly config: ConfigService,
  ) {}

  /** @description Authenticates an admin and issues short-lived access and refresh tokens. @param email Login email. @param password Login password. @returns Token response and actor profile. @throws UnauthorizedException for invalid credentials or lockout. */
  async login(email: string, password: string): Promise<{ accessToken: string; refreshToken: string; user: Record<string, string> }> {
    const normalizedEmail = email.trim().toLowerCase();
    const lockKey = `auth:lock:${normalizedEmail}`;
    if (await this.redis.get(lockKey)) throw new UnauthorizedException('Account temporarily locked.');

    const repo = this.masterDataSource.getRepository(CoreMasterAdminEntity);
    const admin = await repo.findOne({ where: { email: normalizedEmail, isActive: true } });
    if (!admin || !(await argon2.verify(admin.passwordHash, password))) {
      const attempts = admin ? await this.recordFailure(admin) : 5;
      if (attempts >= 5) await this.redis.setWithTtl(lockKey, '1', 15 * 60);
      throw new UnauthorizedException('Invalid credentials.');
    }

    admin.failedLoginCount = 0;
    await repo.save(admin);
    const accessToken = jwt.sign({ sub: admin.id, tenantId: admin.tenantId, role: admin.role }, this.config.getOrThrow<string>('JWT_ACCESS_SECRET'), { expiresIn: '15m' });
    const refreshJti = randomUUID();
    const refreshToken = jwt.sign({ sub: admin.id, tenantId: admin.tenantId, role: admin.role, jti: refreshJti }, this.config.getOrThrow<string>('JWT_REFRESH_SECRET'), { expiresIn: '7d' });
    await this.redis.setWithTtl(`auth:refresh:${admin.id}:${refreshJti}`, '1', 7 * 24 * 60 * 60);
    return { accessToken, refreshToken, user: { id: admin.id, name: admin.name, email: admin.email, role: admin.role, tenantId: admin.tenantId } };
  }

  /** @description Tracks a failed password attempt. @param admin Master admin record. @returns New failure count. */
  private async recordFailure(admin: CoreMasterAdminEntity): Promise<number> {
    admin.failedLoginCount += 1;
    await this.masterDataSource.getRepository(CoreMasterAdminEntity).save(admin);
    return admin.failedLoginCount;
  }

  /** @description Rotates a refresh token, revoking the prior token before issuing the next one. @param refreshToken Current refresh JWT. @returns New access and refresh tokens. @throws UnauthorizedException for revoked or invalid tokens. */
  async refresh(refreshToken: string): Promise<{ accessToken: string; refreshToken: string }> {
    try {
      const payload = jwt.verify(refreshToken, this.config.getOrThrow<string>('JWT_REFRESH_SECRET')) as jwt.JwtPayload & { sub: string; tenantId: string; role: string; jti?: string };
      if (!payload.sub || !payload.tenantId || !payload.role || !payload.jti) throw new UnauthorizedException('Refresh token invalid.');
      const tokenKey = `auth:refresh:${payload.sub}:${payload.jti}`;
      if (!(await this.redis.get(tokenKey))) throw new UnauthorizedException('Refresh token revoked.');
      await this.redis.setWithTtl(`auth:revoked:${payload.jti}`, '1', 7 * 24 * 60 * 60);
      await this.redis.setWithTtl(tokenKey, '0', 1);

      const nextJti = randomUUID();
      const nextRefresh = jwt.sign({ sub: payload.sub, tenantId: payload.tenantId, role: payload.role, jti: nextJti }, this.config.getOrThrow<string>('JWT_REFRESH_SECRET'), { expiresIn: '7d' });
      await this.redis.setWithTtl(`auth:refresh:${payload.sub}:${nextJti}`, '1', 7 * 24 * 60 * 60);
      const accessToken = jwt.sign({ sub: payload.sub, tenantId: payload.tenantId, role: payload.role }, this.config.getOrThrow<string>('JWT_ACCESS_SECRET'), { expiresIn: '15m' });
      return { accessToken, refreshToken: nextRefresh };
    } catch (error) {
      if (error instanceof UnauthorizedException) throw error;
      throw new UnauthorizedException('Refresh token invalid.');
    }
  }
}
