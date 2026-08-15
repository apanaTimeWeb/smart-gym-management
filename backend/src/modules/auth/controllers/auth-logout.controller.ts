import { Controller, Post, HttpCode, HttpStatus, Req, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthLogoutService } from '@/modules/auth/services/auth-logout.service';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import type { AuthLogoutResponse } from '@/modules/auth/auth.interfaces';
import type { Request } from 'express';

@ApiTags('Auth')
@Controller()
export class AuthLogoutController {
  constructor(private readonly authLogoutService: AuthLogoutService) {}

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Logout and invalidate refresh token' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Logged out successfully',
  })
  async logout(@Req() req: Request & { user: any }): Promise<AuthLogoutResponse> {
    return this.authLogoutService.logout(req.user.id);
  }
}
