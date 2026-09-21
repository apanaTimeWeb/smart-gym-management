// RESPONSIBILITY: Owns Auth write endpoints only; request validation and HTTP delegation stay here.
// FLOW: POST /auth/login|refresh|logout -> DTO/header -> AuthSessionOrchestrator -> response mapper -> envelope.

import { Body, Controller, Headers, HttpCode, HttpStatus, Post, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CoreSla, CoreSlaCategory } from '@/core/http/core-sla.decorator';
import { CoreRateLimitTier } from '@/core/rate-limit/core-rate-limit.constants';
import { CoreRateLimit } from '@/core/rate-limit/core-rate-limit.decorator';
import { CorePublic } from '@/core/security/core-public.decorator';
import { CoreRoles } from '@/core/security/core-roles.decorator';
import { AuthContextUnavailableException, AuthRefreshMissingTokenException } from '@/modules/auth/auth.exceptions';
import { AUTH_ALL_ROLES } from '@/modules/auth/auth.roles.constants';
import { AuthLoginResponseDto } from '@/modules/auth/dtos/auth-login-response.dto';
import { AuthLoginDto } from '@/modules/auth/dtos/auth-login.dto';
import { AuthRefreshResponseDto } from '@/modules/auth/dtos/auth-refresh-response.dto';
import { AuthSessionOrchestrator } from '@/modules/auth/orchestrators/auth-session.orchestrator';
import { AuthApiResponseMapper } from '@/modules/auth/utils/auth-api-response.mapper';

import type { CoreJwtClaims } from '@/core/security/core-jwt-claims';
import type { AuthRequest } from '@/modules/auth/auth-http.interfaces';
import type { AuthRole } from '@/modules/auth/auth.roles.constants';

@ApiTags('Auth')
@Controller({ path: 'auth', version: '1' })
export class AuthCommandController {
  constructor(private readonly orchestrator: AuthSessionOrchestrator) {}

  @Post('login')
  @CorePublic()
  @CoreRateLimit(CoreRateLimitTier.AUTH_LOGIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Authenticate a user and create a refresh session.' })
  @ApiBody({ type: AuthLoginDto })
  @ApiResponse({ status: HttpStatus.OK, type: AuthLoginResponseDto })
  @CoreSla(CoreSlaCategory.STANDARD)
  // SLA: STANDARD
  async login(@Body() dto: AuthLoginDto): Promise<AuthLoginResponseDto> {
    const result = await this.orchestrator.login(dto.email, dto.password);
    return AuthApiResponseMapper.toLoginResponse(result);
  }

  @Post('refresh')
  @CorePublic()
  @CoreRateLimit(CoreRateLimitTier.AUTH_REFRESH)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Rotate an Auth refresh token.' })
  @ApiResponse({ status: HttpStatus.OK, type: AuthRefreshResponseDto })
  @CoreSla(CoreSlaCategory.STANDARD)
  // SLA: STANDARD
  async refresh(@Headers('authorization') authorization?: string): Promise<AuthRefreshResponseDto> {
    const refreshToken = authorization?.startsWith('Bearer ') ? authorization.slice(7).trim() : '';
    if (!refreshToken) throw new AuthRefreshMissingTokenException();
    const result = await this.orchestrator.refresh(refreshToken);
    return AuthApiResponseMapper.toRefreshResponse(result);
  }

  @Post('logout')
  @CoreRateLimit(CoreRateLimitTier.AUTH_LOGOUT)
  @CoreRoles(...AUTH_ALL_ROLES)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Revoke the current Auth refresh session.' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Logout completed.' })
  @CoreSla(CoreSlaCategory.STANDARD)
  // SLA: STANDARD
  async logout(@Req() request: AuthRequest): Promise<null> {
    const user = request.user;
    if (!user) throw new AuthContextUnavailableException();
    await this.orchestrator.logout(user.sub, user.role as AuthRole, user.sid);
    return null;
  }

}
