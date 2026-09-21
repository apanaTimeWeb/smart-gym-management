// RESPONSIBILITY: Converts Auth TypeORM user entities into persistence-neutral domain contracts.
// FLOW: AuthUserRepository -> AuthUserMapper -> Auth domain/service.

import type { AuthCredentialRecord, AuthUserDomain } from '@/backend_auth/modules/auth/auth.interfaces';
import type { AuthUserEntity } from '@/backend_auth/modules/auth/entities/auth-user.entity';
export class AuthUserMapper {
  /** @description Maps an ORM entity to the safe Auth user domain object. @param entity - Auth user entity. @returns Domain user without password hash. */
  static toDomain(entity: AuthUserEntity): AuthUserDomain {
    return {
      id: entity.id,
      name: entity.name,
      email: entity.email,
      role: entity.role,
      ...(entity.tenantId ? { tenantId: entity.tenantId } : {}),
    };
  }

  /** @description Maps selected ORM credential fields to the domain credential record. @param entity - Auth user entity. @returns Credential record required by login. */
  static toCredentials(entity: AuthUserEntity): AuthCredentialRecord {
    return {
      id: entity.id,
      name: entity.name,
      email: entity.email,
      passwordHash: entity.passwordHash,
      role: entity.role,
      ...(entity.tenantId ? { tenantId: entity.tenantId } : {}),
    };
  }
}
