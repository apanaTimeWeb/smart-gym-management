import { Controller, Get, UseGuards, HttpStatus } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthMeService } from '@/modules/auth/services/auth-me.service';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { CurrentUser } from '@/modules/auth/decorators/current-user.decorator';
import type {
  JwtPayload,
  AuthMeResponse,
} from '@/modules/auth/auth.interfaces';

@ApiTags('Auth')
@Controller('auth')
export class AuthMeController {
  constructor(private readonly authMeService: AuthMeService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get currently logged in user info' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Current user data' })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized - Invalid or expired token',
  })
  async getMe(@CurrentUser() user: JwtPayload): Promise<AuthMeResponse> {
    return this.authMeService.getMe(user.sub);
  }
}
