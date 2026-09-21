// RESPONSIBILITY: Converts Auth refresh-session entities into persistence-neutral session domain objects.
// FLOW: AuthRefreshSessionRepository -> AuthRefreshSessionMapper -> Auth refresh service.

import type { AuthSessionDomain } from '@/backend_auth/modules/auth/auth.interfaces';
import type { AuthRefreshSessionEntity } from '@/backend_auth/modules/auth/entities/auth-refresh-session.entity';
export class AuthRefreshSessionMapper {
  /** @description Maps a persisted refresh session to the domain contract. @param entity - Refresh session entity. @returns Session domain object. */
  static toDomain(entity: AuthRefreshSessionEntity): AuthSessionDomain {
    return {
      id: entity.id,
      userId: entity.userId,
      refreshTokenHash: entity.refreshTokenHash,
      expiresAt: entity.expiresAt,
      revokedAt: entity.revokedAt,
    };
  }
}
