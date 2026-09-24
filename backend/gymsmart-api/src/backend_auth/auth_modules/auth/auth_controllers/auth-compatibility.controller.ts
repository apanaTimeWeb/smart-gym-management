// RESPONSIBILITY: Preserves the unversioned frontend API namespace during the contract transition; no business logic.
// FLOW: /auth/* -> compatibility controller -> same orchestrators/services as /api/v1.

import { Body, Controller, Get, Headers, HttpCode, HttpStatus, Post, Req, Version, VERSION_NEUTRAL } from '@nestjs/common';
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
import { AuthUserResponseDto } from '@/backend_auth/auth_modules/auth/auth_dtos/auth-user-response.dto';
import { AuthSessionOrchestrator } from '@/backend_auth/auth_modules/auth/auth_orchestrators/auth-session.orchestrator';
import { AuthMeService } from '@/backend_auth/auth_modules/auth/auth_services/auth-me.service';
import { AuthApiResponseMapper } from '@/backend_auth/auth_modules/auth/auth_utils/auth-api-response.mapper';

import type { AuthRequest, AuthQueryRequest } from '@/backend_auth/auth_modules/auth/auth-http.interfaces';
import type { AuthRole } from '@/backend_auth/auth_modules/auth/auth.roles.constants';

@ApiTags('Auth-Compatibility')
@Controller({ path: 'auth', version: VERSION_NEUTRAL })
export class AuthCompatibilityController {
  constructor(
    private readonly orchestrator: AuthSessionOrchestrator,
    private readonly authMeService: AuthMeService,
  ) {}

  @Post('login')
  @Version(VERSION_NEUTRAL)
  @CorePublic()
  @CoreRateLimit(CoreRateLimitTier.AUTH_LOGIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Authenticate a user and create a refresh session (Compatibility).' })
  @ApiBody({ type: AuthLoginDto })
  @CoreApiResponseSwagger(AuthLoginResponseDto, HttpStatus.OK)
  @CoreApiValidationErrorSwagger()
  @CoreApiErrorSwagger(HttpStatus.UNAUTHORIZED, 'AUTH.LOGIN.BACKEND_REJECTED')
  @CoreApiErrorSwagger(HttpStatus.LOCKED, 'AUTH.ACCOUNT.LOCKED')
  @CoreApiErrorSwagger(HttpStatus.TOO_MANY_REQUESTS, 'CORE.HTTP.TOO_MANY_REQUESTS')
  @CoreSla(CoreSlaCategory.STANDARD)
  async login(@Body() dto: AuthLoginDto): Promise<AuthLoginResponseDto> {
    const result = await this.orchestrator.login(dto.email, dto.password);
    return AuthApiResponseMapper.toLoginResponse(result);
  }

  @Post('refresh')
  @Version(VERSION_NEUTRAL)
  @CorePublic()
  @CoreRateLimit(CoreRateLimitTier.AUTH_REFRESH)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Rotate an Auth refresh token (Compatibility).' })
  @ApiHeader({ name: 'Authorization', description: 'Bearer refresh token.', required: true })
  @CoreApiResponseSwagger(AuthRefreshResponseDto, HttpStatus.OK)
  @CoreApiErrorSwagger(HttpStatus.UNAUTHORIZED, 'AUTH.REFRESH.REJECTED')
  @CoreApiErrorSwagger(HttpStatus.TOO_MANY_REQUESTS, 'CORE.HTTP.TOO_MANY_REQUESTS')
  @CoreSla(CoreSlaCategory.STANDARD)
  async refresh(@Headers('authorization') authorization?: string): Promise<AuthRefreshResponseDto> {
    const refreshToken = authorization?.startsWith('Bearer ') ? authorization.slice(7).trim() : '';
    if (!refreshToken) throw new AuthRefreshMissingTokenException();
    const result = await this.orchestrator.refresh(refreshToken);
    return AuthApiResponseMapper.toRefreshResponse(result);
  }

  @Post('logout')
  @Version(VERSION_NEUTRAL)
  @CoreRateLimit(CoreRateLimitTier.AUTH_LOGOUT)
  @CoreRoles(...AUTH_ALL_ROLES)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Revoke the current Auth refresh session (Compatibility).' })
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
  async logout(@Req() request: AuthRequest): Promise<null> {
    const user = request.user;
    if (!user) throw new AuthContextUnavailableException();
    await this.orchestrator.logout(user.sub, user.role as AuthRole, user.sid);
    return null;
  }

  @Get('me')
  @Version(VERSION_NEUTRAL)
  @CoreRateLimit(CoreRateLimitTier.AUTH_ME)
  @CoreRoles(...AUTH_ALL_ROLES)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Return the authoritative authenticated user identity (Compatibility).' })
  @CoreApiResponseSwagger(AuthUserResponseDto, HttpStatus.OK)
  @CoreApiErrorSwagger(HttpStatus.UNAUTHORIZED, 'CORE.HTTP.UNAUTHORIZED')
  @CoreApiErrorSwagger(HttpStatus.FORBIDDEN, 'CORE.HTTP.FORBIDDEN')
  @CoreApiErrorSwagger(HttpStatus.TOO_MANY_REQUESTS, 'CORE.HTTP.TOO_MANY_REQUESTS')
  @CoreSla(CoreSlaCategory.STANDARD)
  async findAuthenticatedUser(@Req() request: AuthQueryRequest): Promise<AuthUserResponseDto> {
    const user = request.user;
    if (!user) throw new AuthContextUnavailableException();
    return AuthApiResponseMapper.toUserResponse(await this.authMeService.findAuthenticatedUserById(user.sub));
  }
}
