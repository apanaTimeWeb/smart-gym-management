// RESPONSIBILITY: Owns refresh-session reads and named creation, rotation and revocation mutations.
// FLOW: Auth refresh/logout service -> AuthRefreshSessionRepository -> TypeORM -> AuthRefreshSessionMapper -> domain.

import { Injectable } from '@nestjs/common';

import { CoreBaseRepository } from '@/backend_auth/auth_core/database/core-base-repository';
import { AuthRefreshSessionEntity } from '@/backend_auth/auth_modules/auth/auth_entities/auth-refresh-session.entity';
import { AuthRefreshSessionMapper } from '@/backend_auth/auth_modules/auth/auth_mappers/auth-refresh-session.mapper';

import { CoreRequestContextService } from '@/backend_auth/auth_core/context/core-request-context';
import type { AuthSessionDomain } from '@/backend_auth/auth_modules/auth/auth.interfaces';
import { DataSource, IsNull } from 'typeorm';
@Injectable()
export class AuthRefreshSessionRepository extends CoreBaseRepository<AuthRefreshSessionEntity> {
  constructor(dataSource: DataSource, requestContext: CoreRequestContextService) {
    super(AuthRefreshSessionEntity, dataSource, requestContext);
  }

  /** @description Finds one refresh session with a pessimistic write lock inside the current transaction. @param sessionId - Session UUID. @returns Session domain or null. */
  async findSessionByIdForUpdate(sessionId: string): Promise<AuthSessionDomain | null> {
    const entity = await this.getRepository()
      .createQueryBuilder('session')
      .where('session.id = :sessionId', { sessionId })
      .andWhere('session.deleted_at IS NULL')
      .setLock('pessimistic_write')
      .getOne();
    return entity ? AuthRefreshSessionMapper.toDomain(entity) : null;
  }

  /** @description Creates a persisted refresh session with the caller-provided UUID embedded in the JWT. @param userId - User UUID. @param sessionId - Session UUID. @param tokenHash - Refresh token hash. @param expiresAt - UTC expiry. @returns Session domain object. */
  async createRefreshSession(userId: string, sessionId: string, tokenHash: string, expiresAt: Date): Promise<AuthSessionDomain> {
    const entity = this.getRepository().create({ id: sessionId, userId, refreshTokenHash: tokenHash, expiresAt, revokedAt: null });
    await this.getRepository().insert(entity);
    return AuthRefreshSessionMapper.toDomain(entity);
  }

  /** @description Replaces one stored refresh-token hash and expiry. @param sessionId - Session UUID. @param tokenHash - New token hash. @param expiresAt - New UTC expiry. @returns void. */
  async rotateRefreshSession(sessionId: string, tokenHash: string, expiresAt: Date): Promise<void> {
    await this.getRepository().update({ id: sessionId, deletedAt: IsNull() }, { refreshTokenHash: tokenHash, expiresAt, revokedAt: null, updatedAt: new Date() });
  }

  /** @description Revokes one refresh session without deleting its row. @param sessionId - Session UUID. @returns void. */
  async revokeRefreshSession(sessionId: string): Promise<void> {
    await this.getRepository().update({ id: sessionId, deletedAt: IsNull() }, { revokedAt: new Date(), updatedAt: new Date() });
  }
}
