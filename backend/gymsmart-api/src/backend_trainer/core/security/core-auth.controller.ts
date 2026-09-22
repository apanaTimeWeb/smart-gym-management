// RESPONSIBILITY: Owns public authentication endpoints and refresh-cookie rotation without exposing credentials in responses or logs.
// FLOW: HTTP auth request → CoreAuthService → canonical response interceptor.

import { Body, Controller, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import type { Request, Response } from 'express';
import { CoreAuthService } from '@/backend_trainer/core/security/core-auth.service';
import { CoreConfigService } from '@/backend_trainer/core/config/core-config.service';
import { CoreLoginDto } from '@/backend_trainer/core/security/core-login.dto';
import { CorePublic } from '@/backend_trainer/core/security/core-public.decorator';

@ApiTags('auth')
@Controller('auth')
export class CoreAuthController {
  constructor(private readonly auth: CoreAuthService, private readonly config: CoreConfigService) {}

  /** Authenticates a user and sets the HttpOnly refresh cookie. */
  @Post('login')
  @CorePublic()
  @ApiResponse({ status: HttpStatus.OK })
  async login(@Body() dto: CoreLoginDto, @Res({ passthrough: true }) response: Response): Promise<{ accessToken: string }> {
    const result = await this.auth.login(dto.email, dto.password);
    this.setRefreshCookie(response, result.refreshToken);
    return { accessToken: result.accessToken };
  }

  /** Rotates the HttpOnly refresh token cookie. */
  @Post('refresh')
  @CorePublic()
  @ApiResponse({ status: HttpStatus.OK })
  async refresh(@Req() request: Request, @Res({ passthrough: true }) response: Response): Promise<{ accessToken: string }> {
    const result = await this.auth.refresh(request.cookies?.refresh_token);
    this.setRefreshCookie(response, result.refreshToken);
    return { accessToken: result.accessToken };
  }

  /** Revokes the current refresh credential. */
  @Post('logout')
  @CorePublic()
  @ApiResponse({ status: HttpStatus.OK })
  async logout(@Req() request: Request, @Res({ passthrough: true }) response: Response): Promise<{ loggedOut: true }> {
    await this.auth.logout(request.cookies?.refresh_token);
    response.clearCookie('refresh_token', { path: '/api/v1/auth' });
    return { loggedOut: true };
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
