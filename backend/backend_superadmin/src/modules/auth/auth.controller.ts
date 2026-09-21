// RESPONSIBILITY: Owns HTTP transport for Superadmin authentication endpoints.
// FLOW: HTTP auth request -> DTO -> AuthService -> access/refresh token envelope.
import { Body, Controller, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthLoginDto } from '@/modules/auth/dtos/auth-login.dto';
import { AuthRefreshDto } from '@/modules/auth/dtos/auth-refresh.dto';
import { AuthService } from '@/modules/auth/auth.service';
import { Public } from '@/core/auth/public.decorator';
@ApiTags('auth')
@Controller('/auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}
  /** Logs in a Superadmin. */
  @Public() @Post('login') @HttpCode(HttpStatus.OK)
  async login(@Body() body: AuthLoginDto, @Res({ passthrough: true }) response: Response) { const result = await this.service.login(body.email, body.password); response.cookie('refresh_token', result.refreshToken, { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', path: '/auth' }); return result; }
  /** Rotates the refresh token and sets a fresh HttpOnly cookie. */
  @Public() @Post('refresh') @HttpCode(HttpStatus.OK)
  async refresh(@Body() body: AuthRefreshDto, @Res({ passthrough: true }) response: Response) { const result = await this.service.refresh(body.refreshToken ?? ''); response.cookie('refresh_token', result.refreshToken, { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', path: '/auth' }); return result; }
  /** Revokes the current refresh token. */
  @Post('logout') @HttpCode(HttpStatus.NO_CONTENT)
  async logout(@Body() body: AuthRefreshDto, @Res({ passthrough: true }) response: Response): Promise<void> { await this.service.logout(body.refreshToken ?? ''); response.clearCookie('refresh_token', { path: '/auth' }); }
}
