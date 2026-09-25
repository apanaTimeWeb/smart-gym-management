// RESPONSIBILITY: Provides authentication endpoints required before Admin tenant access.
// FLOW: HTTP auth request â†’ AdminCoreAuthService â†’ canonical response interceptor.
import { BadRequestException, Body, Controller, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AdminCoreAuthLoginDto, AdminCoreAuthLoginResponseDto, AdminCoreAuthRefreshResponseDto } from '@/backend_admin/admin_core/admin_core_auth/admin-core-auth.dto.js';
import { AdminCoreAuthService } from '@/backend_admin/admin_core/admin_core_auth/admin-core-auth.service.js';
import { RequireIdempotencyKey } from '@/backend_admin/admin_core/admin_core_idempotency/admin-core-require-idempotency-key.decorator.js';

import type { Request, Response } from 'express';

@ApiTags('Authentication')
@Controller('auth')
/**
 * @description Defines the AdminCoreAuthController boundary for the admin_core_auth backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminCoreAuthController {
  constructor(private readonly authService: AdminCoreAuthService, private readonly config: ConfigService) {}

  // SLA: FAST
  @RequireIdempotencyKey()
  @Post('login')
  @ApiOperation({ summary: 'Authenticate an Admin actor' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Authentication succeeded.', type: AdminCoreAuthLoginResponseDto })
  async login(@Body() dto: AdminCoreAuthLoginDto, @Res({ passthrough: true }) response: Response): Promise<AdminCoreAuthLoginResponseDto> {
    const result = await this.authService.login(dto.email, dto.password);
    response.cookie('refreshToken', result.refreshToken, { httpOnly: true, sameSite: 'strict', secure: this.config.get<string>('app.nodeEnv', 'development') === 'production' });
    return { accessToken: result.accessToken, user: result.user };
  }

  // SLA: FAST
  @RequireIdempotencyKey()
  @Post('refresh')
  @ApiOperation({ summary: 'Rotate the refresh token stored in an HttpOnly cookie' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Refresh succeeded.', type: AdminCoreAuthRefreshResponseDto })
  async refresh(@Req() request: Request, @Res({ passthrough: true }) response: Response): Promise<AdminCoreAuthRefreshResponseDto> {
    const token = request.cookies?.refreshToken as string | undefined;
    if (!token) throw new BadRequestException({ message: 'Refresh token is missing.', errorCode: 'CORE.CORE.INVALID_REQUEST' });
    const result = await this.authService.refresh(token);
    response.cookie('refreshToken', result.refreshToken, { httpOnly: true, sameSite: 'strict', secure: this.config.get<string>('app.nodeEnv', 'development') === 'production' });
    return { accessToken: result.accessToken };
  }
}
