// RESPONSIBILITY: Provides authentication endpoints required before Admin tenant access.
// FLOW: HTTP auth request → CoreAuthService → canonical response interceptor.

import { BadRequestException, Body, Controller, Post, Req, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import type { Request, Response } from 'express';
import { CoreAuthService } from '@/backend_admin/core/auth/core-auth.service';
import { CoreAuthLoginDto } from '@/backend_admin/core/auth/core-auth.dto';

@ApiTags('Authentication')
@Controller('auth')
export class CoreAuthController {
  constructor(private readonly authService: CoreAuthService, private readonly config: ConfigService) {}

  // SLA: FAST
  @Post('login')
  @ApiOperation({ summary: 'Authenticate an Admin actor' })
  async login(@Body() dto: CoreAuthLoginDto, @Res({ passthrough: true }) response: Response) {
    const result = await this.authService.login(dto.email, dto.password);
    response.cookie('refreshToken', result.refreshToken, { httpOnly: true, sameSite: 'strict', secure: this.config.get<string>('NODE_ENV', 'development') === 'production' });
    return { accessToken: result.accessToken, user: result.user };
  }

  // SLA: FAST
  @Post('refresh')
  @ApiOperation({ summary: 'Rotate the refresh token stored in an HttpOnly cookie' })
  async refresh(@Req() request: Request, @Res({ passthrough: true }) response: Response) {
    const token = request.cookies?.refreshToken as string | undefined;
    if (!token) throw new BadRequestException('Refresh token is missing.');
    const result = await this.authService.refresh(token);
    response.cookie('refreshToken', result.refreshToken, { httpOnly: true, sameSite: 'strict', secure: this.config.get<string>('NODE_ENV', 'development') === 'production' });
    return { accessToken: result.accessToken };
  }
}
