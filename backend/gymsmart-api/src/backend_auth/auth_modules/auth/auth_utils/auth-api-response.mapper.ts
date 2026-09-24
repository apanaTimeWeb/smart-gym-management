// RESPONSIBILITY: Maps Auth domain objects to HTTP DTOs without exposing TypeORM entities.
// FLOW: Auth domain -> AuthApiResponseMapper -> response DTO -> global response envelope.

import { AuthLoginResponseDto } from '@/backend_auth/auth_modules/auth/auth_dtos/auth-login-response.dto';
import { AuthRefreshResponseDto } from '@/backend_auth/auth_modules/auth/auth_dtos/auth-refresh-response.dto';
import { AuthUserResponseDto } from '@/backend_auth/auth_modules/auth/auth_dtos/auth-user-response.dto';

import type { AuthLoginDomainResult, AuthRefreshDomainResult, AuthUserDomain } from '@/backend_auth/auth_modules/auth/auth.interfaces';
export class AuthApiResponseMapper {
  /** @description Maps a domain user into the frozen frontend user DTO. @param user - Domain user. @returns User DTO. */
  static toUserResponse(user: AuthUserDomain): AuthUserResponseDto {
    return { id: user.id, name: user.name, email: user.email, role: user.role, ...(user.tenantId ? { tenantId: user.tenantId } : {}) };
  }

  /** @description Maps login result into the backend login DTO. @param result - Domain login result. @returns Login DTO. */
  static toLoginResponse(result: AuthLoginDomainResult): AuthLoginResponseDto {
    return { accessToken: result.accessToken, refreshToken: result.refreshToken, user: this.toUserResponse(result.user) };
  }

  /** @description Maps refresh result into the backend refresh DTO. @param result - Domain refresh result. @returns Refresh DTO. */
  static toRefreshResponse(result: AuthRefreshDomainResult): AuthRefreshResponseDto {
    return { accessToken: result.accessToken, refreshToken: result.refreshToken };
  }
}
