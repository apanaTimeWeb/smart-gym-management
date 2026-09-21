// RESPONSIBILITY: Owns Auth read endpoints only and delegates authoritative identity resolution to AuthMeService.
// FLOW: GET /auth/me -> verified JWT -> AuthMeService -> domain user -> response mapper -> envelope.

import { Controller, Get, HttpStatus, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CoreSla, CoreSlaCategory } from '@/core/http/core-sla.decorator';
import { CoreRateLimitTier } from '@/core/rate-limit/core-rate-limit.constants';
import { CoreRateLimit } from '@/core/rate-limit/core-rate-limit.decorator';
import { CoreRoles } from '@/core/security/core-roles.decorator';
import { AuthContextUnavailableException } from '@/modules/auth/auth.exceptions';
import { AUTH_ALL_ROLES } from '@/modules/auth/auth.roles.constants';
import { AuthUserResponseDto } from '@/modules/auth/dtos/auth-user-response.dto';
import { AuthMeService } from '@/modules/auth/services/auth-me.service';
import { AuthApiResponseMapper } from '@/modules/auth/utils/auth-api-response.mapper';

import type { AuthQueryRequest } from '@/modules/auth/auth-http.interfaces';
import type { CoreJwtClaims } from '@/core/security/core-jwt-claims';

@ApiTags('Auth')
@Controller({ path: 'auth', version: '1' })
export class AuthQueryController {
  constructor(private readonly authMeService: AuthMeService) {}

  @Get('me')
  @CoreRateLimit(CoreRateLimitTier.AUTH_ME)
  @CoreRoles(...AUTH_ALL_ROLES)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Return the authoritative authenticated user identity.' })
  @ApiResponse({ status: HttpStatus.OK, type: AuthUserResponseDto })
  @CoreSla(CoreSlaCategory.STANDARD)
  // SLA: STANDARD
  async findAuthenticatedUser(@Req() request: AuthQueryRequest): Promise<AuthUserResponseDto> {
    const user = request.user;
    if (!user) throw new AuthContextUnavailableException();
    return AuthApiResponseMapper.toUserResponse(await this.authMeService.findAuthenticatedUserById(user.sub));
  }
}
