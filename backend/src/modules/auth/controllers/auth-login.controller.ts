import { Controller, Post, Body, HttpCode, HttpStatus, Req, UseGuards, UnauthorizedException } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ThrottlerGuard } from '@nestjs/throttler';
import { AuthLoginService } from '@/modules/auth/services/auth-login.service';
import { LoginDto } from '@/modules/auth/dto/login.dto';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import type { AuthLoginResponse } from '@/modules/auth/auth.interfaces';
import type { Request } from 'express';

@ApiTags('Auth')
@Controller()
export class AuthLoginController {
  constructor(private readonly authLoginService: AuthLoginService) {}

  @UseGuards(ThrottlerGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Admin/Staff login with email & password' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Login successful, returns JWT tokens',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid credentials',
  })
  async login(@Body() loginDto: LoginDto): Promise<AuthLoginResponse> {
    return this.authLoginService.login(loginDto);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Refresh access and refresh tokens' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Returns new tokens' })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid or missing refresh token',
  })
  async refresh(@Req() req: Request) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException(
        'Refresh token is required in Authorization header',
      );
    }
    const token = authHeader.split(' ')[1];

    const newTokens = await this.authLoginService.refreshTokens(token);
    return { success: true, data: newTokens };
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Logout and invalidate refresh token' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Logged out successfully',
  })
  async logout(@Req() req: Request & { user: any }) {
    await this.authLoginService.logout(req.user.id);
    return { success: true, message: 'Logged out successfully' };
  }
}
