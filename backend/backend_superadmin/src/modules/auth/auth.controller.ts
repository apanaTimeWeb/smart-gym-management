// RESPONSIBILITY: Owns HTTP transport for Superadmin authentication, refresh-cookie rotation, and logout.
// FLOW: HTTP auth request -> DTO/cookie -> AuthService -> access/refresh response.
import { Body, Controller, HttpCode, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { AuthLoginDto } from '@/modules/auth/dtos/auth-login.dto';
import { AuthService } from '@/modules/auth/auth.service';
import { Public } from '@/core/auth/public.decorator';

@ApiTags('auth')
@Controller('/auth')
export class AuthController {
  constructor(private readonly service: AuthService, private readonly config: ConfigService) {}

  /** Logs in a Superadmin and places the refresh token in an HttpOnly cookie. */
  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login' })
  async login(@Body() body: AuthLoginDto, @Req() _request: Request, @Res({ passthrough: true }) response: Response): Promise<{ accessToken: string; user: { id: string; email: string; role: string } }> {
    const result = await this.service.login(body.email, body.password);
    this.setRefreshCookie(response, result.refreshToken);
    return { accessToken: result.accessToken, user: result.user };
  }

  /** Rotates a refresh token read exclusively from the HttpOnly cookie. */
  @Public()
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Rotate refresh token' })
  async refresh(@Req() request: Request, @Res({ passthrough: true }) response: Response): Promise<{ accessToken: string }> {
    const refreshToken = request.cookies?.refresh_token;
    const result = await this.service.refresh(refreshToken ?? '');
    this.setRefreshCookie(response, result.refreshToken);
    return { accessToken: result.accessToken };
  }

  /** Revokes the current refresh token and clears the HttpOnly cookie. */
  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Logout' })
  async logout(@Req() request: Request, @Res({ passthrough: true }) response: Response): Promise<void> {
    await this.service.logout(request.cookies?.refresh_token ?? '');
    response.clearCookie('refresh_token', { httpOnly: true, sameSite: 'lax', secure: this.isProduction(), path: '/api/v1/auth' });
  }

  /** Applies one consistent secure cookie policy to refresh tokens. */
  private setRefreshCookie(response: Response, token: string): void {
    response.cookie('refresh_token', token, { httpOnly: true, sameSite: 'lax', secure: this.isProduction(), path: '/api/v1/auth', maxAge: 7 * 24 * 60 * 60 * 1000 });
  }

  /** Returns whether production-only secure cookie behavior is required. */
  private isProduction(): boolean { return this.config.get<string>('app.nodeEnv') === 'production'; }
}
