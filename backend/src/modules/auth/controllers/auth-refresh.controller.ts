import { Controller, Post, HttpCode, HttpStatus, Req, UnauthorizedException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthRefreshService } from '@/modules/auth/services/auth-refresh.service';
import type { AuthRefreshResponse } from '@/modules/auth/auth.interfaces';
import type { Request } from 'express';

@ApiTags('Auth')
@Controller()
export class AuthRefreshController {
  constructor(private readonly authRefreshService: AuthRefreshService) {}

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Refresh access and refresh tokens' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Returns new tokens' })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid or missing refresh token',
  })
  async refresh(@Req() req: Request): Promise<AuthRefreshResponse> {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException(
        'Refresh token is required in Authorization header',
      );
    }
    const token = authHeader.split(' ')[1];

    return this.authRefreshService.refreshTokens(token);
  }
}
