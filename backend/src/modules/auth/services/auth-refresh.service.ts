import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { AuthRepository } from '@/modules/auth/auth.repository';
import { AccountDeactivatedException } from '@/modules/auth/auth.exceptions';
import type { JwtPayload, AuthRefreshResponse } from '@/modules/auth/auth.interfaces';
import { AUTH_MESSAGES } from '@/modules/auth/auth.constants';
import { User } from '@/modules/auth/entities/user.entity';

@Injectable()
export class AuthRefreshService {
  private readonly logger = new Logger(AuthRefreshService.name);

  constructor(
    private authRepository: AuthRepository,
    private jwtService: JwtService,
    private configService: ConfigService,
    @InjectDataSource() private readonly dataSource: DataSource,
  ) {}

  async refreshTokens(refreshToken: string): Promise<AuthRefreshResponse> {
    if (!refreshToken)
      throw new UnauthorizedException('No refresh token provided');

    let payload: any;
    try {
      payload = this.jwtService.verify(refreshToken, {
        secret:
          this.configService.get<string>('JWT_REFRESH_SECRET') ||
          'gymsmart_refresh_secret',
      });
    } catch (e) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    const userId = payload.sub;
    const user = await this.authRepository.findUserById(userId);
    if (!user || !user.refreshToken || !user.isActive) {
      throw new UnauthorizedException('Access Denied');
    }

    await this.validateTenantStatus(user);

    const rtMatches = await bcrypt.compare(refreshToken, user.refreshToken);
    if (!rtMatches) {
      throw new UnauthorizedException('Access Denied');
    }

    const tokens = await this.generateTokens(user.id, user.email, user.role);
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return {
      success: true,
      message: AUTH_MESSAGES.REFRESH_SUCCESS,
      data: tokens,
    };
  }

  private async generateTokens(userId: string, email: string, role: string) {
    const payload: JwtPayload = { sub: userId, email, role };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret:
          this.configService.get<string>('JWT_SECRET') || 'gymsmart_secret',
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(payload, {
        secret:
          this.configService.get<string>('JWT_REFRESH_SECRET') ||
          'gymsmart_refresh_secret',
        expiresIn: '7d',
      }),
    ]);

    return { accessToken, refreshToken };
  }

  private async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.authRepository.updateUser(userId, {
      refreshToken: hashedRefreshToken,
    });
  }

  private async validateTenantStatus(user: User | Partial<User>): Promise<void> {
    if (user.role === 'SUPERADMIN') return;

    let tenantId = undefined;
    let tenantStatus = undefined;

    if (user.role === 'ADMIN') {
      const tenantResult = await this.dataSource.query(
        'SELECT id, status FROM gyms WHERE "adminEmail" = $1 AND "isDeleted" = false LIMIT 1',
        [user.email]
      );
      if (tenantResult && tenantResult.length > 0) {
        tenantId = tenantResult[0].id;
        tenantStatus = tenantResult[0].status;
      }
    } else if (user.role === 'STAFF' || user.role === 'MEMBER') {
      if (user.branch) {
        const tenantResult = await this.dataSource.query(
          'SELECT id, status FROM gyms WHERE id = $1 AND "isDeleted" = false LIMIT 1',
          [user.branch]
        );
        if (tenantResult && tenantResult.length > 0) {
          tenantId = tenantResult[0].id;
          tenantStatus = tenantResult[0].status;
        }
      }
    }

    if (!tenantId) {
      this.logger.warn(`Tenant validation failed: Gym not found or deleted for user ${user.email}`);
      throw new AccountDeactivatedException('Your gym account no longer exists.');
    }

    if (tenantStatus === 'SUSPENDED') {
      this.logger.warn(`Tenant validation failed: Gym is suspended for user ${user.email}`);
      throw new AccountDeactivatedException('Your gym has been suspended. Please contact support.');
    }
  }
}
