import { Controller, Post, Body, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ThrottlerGuard } from '@nestjs/throttler';
import { AuthLoginService } from '@/modules/auth/services/auth-login.service';
import { LoginDto } from '@/modules/auth/dto/login.dto';
import type { AuthLoginResponse } from '@/modules/auth/auth.interfaces';

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
}
