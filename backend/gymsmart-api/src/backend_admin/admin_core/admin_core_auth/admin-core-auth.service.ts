// RESPONSIBILITY: Authenticates Admin users, enforces brute-force lockout, rotates refresh tokens, and revokes prior refresh tokens.
// FLOW: Auth controller â†’ AdminCoreAuthService â†’ master DB + Redis â†’ short-lived access token + HttpOnly refresh cookie.
import { randomUUID } from 'node:crypto';

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import type { AdminCoreAuthUserDto } from '@/backend_admin/admin_core/admin_core_auth/admin-core-auth.dto.js';

import { AdminCoreAuditTrailService } from '@/backend_admin/admin_core/admin_core_audit/admin-core-audit-trail.service.js';
import { AdminCoreMasterAdminRepository } from '@/backend_admin/admin_core/admin_core_auth/admin-core-master-admin-repository.js';
import { AdminCoreRedisService } from '@/backend_admin/admin_core/admin_core_redis/admin-core-redis.service.js';

@Injectable()
/**
 * @description Defines the AdminCoreAuthService boundary for the admin_core_auth backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminCoreAuthService {
  constructor(
    private readonly redis: AdminCoreRedisService,
    private readonly config: ConfigService,
    private readonly auditTrail: AdminCoreAuditTrailService,
    private readonly masterAdminRepository: AdminCoreMasterAdminRepository,
  ) {}

  /** @description Authenticates an admin and issues short-lived access and refresh tokens. @param email Login email. @param password Login password. @returns Token response and actor profile. @throws UnauthorizedException for invalid credentials or lockout. */
  async login(email: string, password: string): Promise<{ accessToken: string; refreshToken: string; user: AdminCoreAuthUserDto }> {
    const normalizedEmail = email.trim().toLowerCase();
    const lockKey = `auth:lock:${normalizedEmail}`;
    if (await this.redis.get(lockKey)) throw new UnauthorizedException({ message: 'Account temporarily locked.', errorCode: 'AUTH.LOGIN.UNAUTHORIZED' });

    const admin = await this.masterAdminRepository.findActiveByEmail(normalizedEmail);
    if (!admin || !(await argon2.verify(admin.passwordHash, password))) {
      const attempts = admin ? await this.recordFailure(admin.id) : 5;
      if (attempts >= 5) {
        await this.redis.setWithTtl(lockKey, '1', 15 * 60);
        await this.auditTrail.record({ action: 'AUTH.ACCOUNT.LOCKED', entityType: 'ADMIN_ACCOUNT', entityId: admin?.id ?? null, module: 'Auth', severity: 'HIGH' as any, newValue: { lockoutMinutes: 15 } });
      }
      throw new UnauthorizedException({ message: 'Invalid credentials.', errorCode: 'AUTH.LOGIN.UNAUTHORIZED' });
    }

    await this.masterAdminRepository.resetFailedLoginCount(admin.id);
    const accessToken = jwt.sign({ sub: admin.id, tenantId: admin.tenantId, role: admin.role }, this.config.getOrThrow<string>('runtime.jwtAccessSecret'), { expiresIn: '15m' });
    const refreshJti = randomUUID();
    const refreshToken = jwt.sign({ sub: admin.id, tenantId: admin.tenantId, role: admin.role, jti: refreshJti }, this.config.getOrThrow<string>('runtime.jwtRefreshSecret'), { expiresIn: '7d' });
    await this.redis.setWithTtl(`auth:refresh:${admin.id}:${refreshJti}`, '1', 7 * 24 * 60 * 60);
    return { accessToken, refreshToken, user: { id: admin.id, name: admin.name, email: admin.email, role: admin.role, tenantId: admin.tenantId } };
  }

  /** @description Tracks a failed password attempt. @param admin Master admin record. @returns New failure count. */
  private async recordFailure(adminId: string): Promise<number> {
    return this.masterAdminRepository.incrementFailedLoginCount(adminId);
  }

  /** @description Rotates a refresh token, revoking the prior token before issuing the next one. @param refreshToken Current refresh JWT. @returns New access and refresh tokens. @throws UnauthorizedException for revoked or invalid tokens. */
  async refresh(refreshToken: string): Promise<{ accessToken: string; refreshToken: string }> {
    try {
      const payload = jwt.verify(refreshToken, this.config.getOrThrow<string>('runtime.jwtRefreshSecret')) as jwt.JwtPayload & { sub: string; tenantId: string; role: string; jti?: string };
      if (!payload.sub || !payload.tenantId || !payload.role || !payload.jti) throw new UnauthorizedException({ message: 'Refresh token invalid.', errorCode: 'AUTH.LOGIN.UNAUTHORIZED' });
      const revokedKey = `auth:revoked:${payload.jti}`;
      if (await this.redis.get(revokedKey)) throw new UnauthorizedException({ message: 'Refresh token revoked.', errorCode: 'AUTH.REFRESH.REVOKED' });
      const tokenKey = `auth:refresh:${payload.sub}:${payload.jti}`;
      if (!(await this.redis.get(tokenKey))) throw new UnauthorizedException({ message: 'Refresh token revoked.', errorCode: 'AUTH.LOGIN.UNAUTHORIZED' });
      const revoked = await this.redis.setIfAbsent(revokedKey, '1', 7 * 24 * 60 * 60);
      if (!revoked) throw new UnauthorizedException({ message: 'Refresh token already rotated.', errorCode: 'AUTH.REFRESH.REVOKED' });
      await this.redis.setWithTtl(tokenKey, '0', 1);

      const nextJti = randomUUID();
      const nextRefresh = jwt.sign({ sub: payload.sub, tenantId: payload.tenantId, role: payload.role, jti: nextJti }, this.config.getOrThrow<string>('runtime.jwtRefreshSecret'), { expiresIn: '7d' });
      await this.redis.setWithTtl(`auth:refresh:${payload.sub}:${nextJti}`, '1', 7 * 24 * 60 * 60);
      const accessToken = jwt.sign({ sub: payload.sub, tenantId: payload.tenantId, role: payload.role }, this.config.getOrThrow<string>('runtime.jwtAccessSecret'), { expiresIn: '15m' });
      return { accessToken, refreshToken: nextRefresh };
    } catch (error) {
      if (error instanceof UnauthorizedException) throw error;
      throw new UnauthorizedException({ message: 'Refresh token invalid.', errorCode: 'AUTH.LOGIN.UNAUTHORIZED' });
    }
  }
}
