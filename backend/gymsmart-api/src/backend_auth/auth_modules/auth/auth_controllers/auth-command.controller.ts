// RESPONSIBILITY: Owns Auth write endpoints only; request validation and HTTP delegation stay here.
// FLOW: POST /auth/login|refresh|logout -> DTO/header -> AuthSessionOrchestrator -> response mapper -> envelope.

import { Body, Controller, Headers, HttpCode, HttpStatus, Post, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CoreApiErrorSwagger, CoreApiResponseSwagger, CoreApiValidationErrorSwagger } from '@/backend_auth/auth_core/http/core-api-response.swagger';
import { CoreSla, CoreSlaCategory } from '@/backend_auth/auth_core/http/core-sla.decorator';
import { CoreRateLimitTier } from '@/backend_auth/auth_core/auth_rate_limit/core-rate-limit.constants';
import { CoreRateLimit } from '@/backend_auth/auth_core/auth_rate_limit/core-rate-limit.decorator';
import { CorePublic } from '@/backend_auth/auth_core/auth_security/core-public.decorator';
import { CoreRoles } from '@/backend_auth/auth_core/auth_security/core-roles.decorator';
import { AuthContextUnavailableException, AuthRefreshMissingTokenException } from '@/backend_auth/auth_modules/auth/auth.exceptions';
import { AUTH_ALL_ROLES } from '@/backend_auth/auth_modules/auth/auth.roles.constants';
import { AuthLoginResponseDto } from '@/backend_auth/auth_modules/auth/auth_dtos/auth-login-response.dto';
import { AuthLoginDto } from '@/backend_auth/auth_modules/auth/auth_dtos/auth-login.dto';
import { AuthRefreshResponseDto } from '@/backend_auth/auth_modules/auth/auth_dtos/auth-refresh-response.dto';
import { AuthSessionOrchestrator } from '@/backend_auth/auth_modules/auth/auth_orchestrators/auth-session.orchestrator';
import { AuthApiResponseMapper } from '@/backend_auth/auth_modules/auth/auth_utils/auth-api-response.mapper';

import type { AuthRequest } from '@/backend_auth/auth_modules/auth/auth-http.interfaces';
import type { AuthRole } from '@/backend_auth/auth_modules/auth/auth.roles.constants';

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
  @CoreApiResponseSwagger(AuthLoginResponseDto, HttpStatus.OK)
  @CoreApiValidationErrorSwagger()
  @CoreApiErrorSwagger(HttpStatus.UNAUTHORIZED, 'AUTH.LOGIN.BACKEND_REJECTED')
  @CoreApiErrorSwagger(HttpStatus.LOCKED, 'AUTH.ACCOUNT.LOCKED')
  @CoreApiErrorSwagger(HttpStatus.TOO_MANY_REQUESTS, 'CORE.HTTP.TOO_MANY_REQUESTS')
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
  @ApiHeader({ name: 'Authorization', description: 'Bearer refresh token.', required: true })
  @CoreApiResponseSwagger(AuthRefreshResponseDto, HttpStatus.OK)
  @CoreApiErrorSwagger(HttpStatus.UNAUTHORIZED, 'AUTH.REFRESH.REJECTED')
  @CoreApiErrorSwagger(HttpStatus.TOO_MANY_REQUESTS, 'CORE.HTTP.TOO_MANY_REQUESTS')
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
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Logout completed with data: null in the canonical envelope.',
    schema: {
      type: 'object',
      required: ['success', 'message', 'data'],
      properties: { success: { type: 'boolean', example: true }, message: { type: 'string' }, data: { nullable: true, example: null } },
    },
  })
  @CoreApiErrorSwagger(HttpStatus.UNAUTHORIZED, 'CORE.HTTP.UNAUTHORIZED')
  @CoreApiErrorSwagger(HttpStatus.FORBIDDEN, 'CORE.HTTP.FORBIDDEN')
  @CoreApiErrorSwagger(HttpStatus.TOO_MANY_REQUESTS, 'CORE.HTTP.TOO_MANY_REQUESTS')
  @CoreSla(CoreSlaCategory.STANDARD)
  // SLA: STANDARD
  async logout(@Req() request: AuthRequest): Promise<null> {
    const user = request.user;
    if (!user) throw new AuthContextUnavailableException();
    await this.orchestrator.logout(user.sub, user.role as AuthRole, user.sid);
    return null;
  }

}
