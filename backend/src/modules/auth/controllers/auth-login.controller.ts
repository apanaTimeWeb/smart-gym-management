import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthLoginService } from '@/modules/auth/services/auth-login.service';
import { LoginDto } from '@/modules/auth/dto/login.dto';
import type { AuthLoginResponse } from '@/modules/auth/auth.interfaces';

@ApiTags('Auth')
@Controller('auth')
export class AuthLoginController {
  constructor(private readonly authLoginService: AuthLoginService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Admin/Staff login with email & password' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Login successful, returns JWT token',
  })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Invalid credentials' })
  async login(@Body() loginDto: LoginDto): Promise<AuthLoginResponse> {
    return this.authLoginService.login(loginDto);
  }
}
