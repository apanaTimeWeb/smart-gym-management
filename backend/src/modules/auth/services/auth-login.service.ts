import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { AuthRepository } from '@/modules/auth/auth.repository';
import { LoginDto } from '@/modules/auth/dto/login.dto';
import {
  InvalidCredentialsException,
  AccountDeactivatedException,
} from '@/modules/auth/auth.exceptions';
import { AUTH_MESSAGES } from '@/modules/auth/auth.constants';
import type {
  JwtPayload,
  AuthLoginResponse,
} from '@/modules/auth/auth.interfaces';

@Injectable()
export class AuthLoginService {
  private readonly logger = new Logger(AuthLoginService.name);

  constructor(
    private authRepository: AuthRepository,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async login(loginDto: LoginDto): Promise<AuthLoginResponse> {
    const { email, password } = loginDto;
    this.logger.log(`Attempting login for email: ${email}`);

    // 1. Find user by email
    const user = await this.authRepository.findUserByEmail(email);

    if (!user) {
      this.logger.warn(`Login failed: User not found for email ${email}`);
      throw new InvalidCredentialsException();
    }

    if (!user.isActive) {
      this.logger.warn(`Login failed: Account deactivated for email ${email}`);
      throw new AccountDeactivatedException();
    }

    // 2. Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      this.logger.warn(`Login failed: Invalid password for email ${email}`);
      throw new InvalidCredentialsException();
    }

    // 3. Generate tokens
    const tokens = await this.generateTokens(user.id, user.email, user.role);

    // 4. Update DB
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    await this.authRepository.updateUser(user.id, { lastLoginAt: new Date() });

    this.logger.log(`Login successful for user id: ${user.id}`);

    const {
      password: _password,
      refreshToken: _rt,
      ...userWithoutPassword
    } = user;

    return {
      message: AUTH_MESSAGES.LOGIN_SUCCESS,
      data: {
        ...tokens,
        user: userWithoutPassword,
      },
    };
  }

  async logout(userId: string): Promise<void> {
    await this.authRepository.updateUser(userId, { refreshToken: null });
    this.logger.log(`Logged out user id: ${userId}`);
  }

  async refreshTokens(
    refreshToken: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
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

    const rtMatches = await bcrypt.compare(refreshToken, user.refreshToken);
    if (!rtMatches) {
      throw new UnauthorizedException('Access Denied');
    }

    const tokens = await this.generateTokens(user.id, user.email, user.role);
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  private async generateTokens(userId: string, email: string, role: string) {
    const payload: JwtPayload = { sub: userId, email, role };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret:
          this.configService.get<string>('JWT_SECRET') || 'gymsmart_secret',
        expiresIn: '15m', // Short lived access token
      }),
      this.jwtService.signAsync(payload, {
        secret:
          this.configService.get<string>('JWT_REFRESH_SECRET') ||
          'gymsmart_refresh_secret',
        expiresIn: '7d', // Long lived refresh token
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
}
