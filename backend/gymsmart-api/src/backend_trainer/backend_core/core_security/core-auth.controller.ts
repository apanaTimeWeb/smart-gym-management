// RESPONSIBILITY: Owns public authentication endpoints and refresh-cookie rotation without exposing credentials in responses or logs.
// FLOW: HTTP auth request → CoreAuthService → canonical response interceptor.

import { Body, Controller, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import type { Request, Response } from 'express';
import { CoreAuthService } from '@/backend_trainer/backend_core/core_security/core-auth.service';
import { CoreConfigService } from '@/backend_trainer/backend_core/core_config/core-config.service';
import { CoreLoginDto } from '@/backend_trainer/backend_core/core_security/core-login.dto';
import { CorePublic } from '@/backend_trainer/backend_core/core_security/core-public.decorator';
import { RequireIdempotencyKey } from '@/backend_trainer/backend_core/core_security/core-idempotency.decorator';
/**
 * Intent: Defines the CoreAuthController boundary for the backend core architecture and owns only the behavior appropriate to this layer.
 * Edge Cases: Preserve tenant scope, validation, authorization, canonical errors, nullability, and transaction semantics when extending this construct.
 * AI Note: Treat this construct as an isolation boundary; do not move ORM state across repository/mapper/domain layers or alter frozen API contracts without an explicit baseline amendment.
 */


// SLA: FAST
/**
 * Intent: Defines the CoreAuthController boundary for the backend core architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@ApiTags('auth')
@Controller('auth')
export class CoreAuthController {
  constructor(private readonly auth: CoreAuthService, private readonly config: CoreConfigService) {}

  // SLA: FAST
  @ApiOperation({ summary: 'Login' })
  /** Authenticates a user and sets the HttpOnly refresh cookie. */
  @Post('login')
  @RequireIdempotencyKey(60)
  @CorePublic()
  @ApiResponse({ status: HttpStatus.OK })
  async login(@Body() dto: CoreLoginDto, @Res({ passthrough: true }) response: Response): Promise<{ accessToken: string }> {
    const result = await this.auth.login(dto.email, dto.password);
    this.setRefreshCookie(response, result.refreshToken);
    this.setAccessCookie(response, result.accessToken);
    return { accessToken: result.accessToken };
  }

  // SLA: FAST
  @ApiOperation({ summary: 'Refresh access token' })
  /** Rotates the HttpOnly refresh token cookie. */
  @Post('refresh')
  @RequireIdempotencyKey(60)
  @CorePublic()
  @ApiResponse({ status: HttpStatus.OK })
  async refresh(@Req() request: Request, @Res({ passthrough: true }) response: Response): Promise<{ accessToken: string }> {
    const result = await this.auth.refresh(request.cookies?.refresh_token);
    this.setRefreshCookie(response, result.refreshToken);
    this.setAccessCookie(response, result.accessToken);
    return { accessToken: result.accessToken };
  }

  // SLA: FAST
  @ApiOperation({ summary: 'Logout' })
  /** Revokes the current refresh credential. */
  @Post('logout')
  @RequireIdempotencyKey(60)
  @CorePublic()
  @ApiResponse({ status: HttpStatus.OK })
  async logout(@Req() request: Request, @Res({ passthrough: true }) response: Response): Promise<{ loggedOut: true }> {
    await this.auth.logout(request.cookies?.refresh_token);
    response.clearCookie('refresh_token', { path: '/api/v1/auth' });
    response.clearCookie('access_token', { path: '/' });
    return { loggedOut: true };
  }


  private setAccessCookie(response: Response, token: string): void {
    response.cookie('access_token', token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: this.config.getNodeEnv() === 'production',
      path: '/',
      maxAge: 15 * 60 * 1000,
    });
  }

  private setRefreshCookie(response: Response, token: string): void {
    response.cookie('refresh_token', token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: this.config.getNodeEnv() === 'production',
      path: '/api/v1/auth',
    });
  }
}
