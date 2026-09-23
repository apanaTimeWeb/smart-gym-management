// RESPONSIBILITY: Owns HTTP transport for the auth.controller controller surface; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning service -> canonical response envelope.
import { Body, Controller, HttpCode, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { AuthLoginDto } from '@/backend_superadmin/modules/auth/dtos/auth-login.dto';
import { AuthService } from '@/backend_superadmin/modules/auth/auth.service';
import { AuthGhostCookieDto } from '@/backend_superadmin/modules/auth/dtos/auth-ghost-cookie.dto';
import { RequireIdempotencyKey } from '@/backend_superadmin/core/cache/idempotency.decorator';
import { Public } from '@/backend_superadmin/core/auth/public.decorator';

@ApiTags('auth')
@Controller('/auth')
export class AuthController {
  constructor(private readonly service: AuthService, private readonly config: ConfigService) {}

  /** Logs in a Superadmin and places the refresh token in an HttpOnly cookie. */
  @RequireIdempotencyKey()
  @Public()
  // SLA: STANDARD
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login' })
  @ApiResponse({ status: HttpStatus.OK })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED })
  async login(@Body() body: AuthLoginDto, @Req() _request: Request, @Res({ passthrough: true }) response: Response): Promise<{ accessToken: string; user: { id: string; email: string; role: string } }> {
    const result = await this.service.login(body.email, body.password);
    this.setRefreshCookie(response, result.refreshToken);
    return { accessToken: result.accessToken, user: result.user };
  }

  /** Rotates a refresh token read exclusively from the HttpOnly cookie. */
  @RequireIdempotencyKey()
  @Public()
  // SLA: STANDARD
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Rotate refresh token' })
  @ApiResponse({ status: HttpStatus.OK })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED })
  async refresh(@Req() request: Request, @Res({ passthrough: true }) response: Response): Promise<{ accessToken: string }> {
    const refreshToken = request.cookies?.refresh_token;
    const result = await this.service.refresh(refreshToken ?? '');
    this.setRefreshCookie(response, result.refreshToken);
    return { accessToken: result.accessToken };
  }

  /** Revokes the current refresh token and clears the HttpOnly cookie. */
  @RequireIdempotencyKey()
  @Public()
  // SLA: STANDARD
  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Logout' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  async logout(@Req() request: Request, @Res({ passthrough: true }) response: Response): Promise<void> {
    await this.service.logout(request.cookies?.refresh_token ?? '');
    response.clearCookie('refresh_token', { httpOnly: true, sameSite: 'lax', secure: this.isProduction(), path: '/api/v1/auth' });
    response.clearCookie('ghost_session', { httpOnly: true, sameSite: 'lax', secure: this.isProduction(), path: '/' });
  }

  /** Exchanges a signed Superadmin impersonation handoff for an HttpOnly browser session cookie without trusting client-supplied user metadata. */
  @RequireIdempotencyKey()
  @Public()
  // SLA: STANDARD
  @Post('set-cookie')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Establish ghost-login session cookie' })
  @ApiResponse({ status: HttpStatus.OK })
  async setGhostLoginCookie(@Body() body: AuthGhostCookieDto, @Res({ passthrough: true }) response: Response): Promise<null> {
    const claims = await this.service.verifyGhostHandoff(body.token);
    response.cookie('ghost_session', body.token, { httpOnly: true, sameSite: 'lax', secure: this.isProduction(), path: '/', maxAge: Math.max(0, (claims.exp * 1000) - Date.now()) });
    return null;
  }

  /** Clears the ghost-login browser session so an impersonated session can exit safely. */
  @RequireIdempotencyKey()
  @Public()
  // SLA: STANDARD
  @Post('exit-ghost-login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Exit ghost-login session' })
  @ApiResponse({ status: HttpStatus.OK })
  async exitGhostLogin(@Res({ passthrough: true }) response: Response): Promise<null> {
    response.clearCookie('ghost_session', { httpOnly: true, sameSite: 'lax', secure: this.isProduction(), path: '/' });
    response.clearCookie('refresh_token', { httpOnly: true, sameSite: 'lax', secure: this.isProduction(), path: '/api/v1/auth' });
    return null;
  }

  /** Applies one consistent secure cookie policy to refresh tokens. */
  private setRefreshCookie(response: Response, token: string): void {
    response.cookie('refresh_token', token, { httpOnly: true, sameSite: 'lax', secure: this.isProduction(), path: '/api/v1/auth', maxAge: 7 * 24 * 60 * 60 * 1000 });
  }

  /** Returns whether production-only secure cookie behavior is required. */
  private isProduction(): boolean { return this.config.get<string>('app.nodeEnv') === 'production'; }
}