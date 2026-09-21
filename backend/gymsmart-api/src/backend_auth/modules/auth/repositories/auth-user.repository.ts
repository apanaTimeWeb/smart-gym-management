// RESPONSIBILITY: Owns Auth-user persistence queries and named seed mutations; services never receive TypeORM entities.
// FLOW: Auth service -> AuthUserRepository -> TypeORM AuthUserEntity -> AuthUserMapper -> domain contract.

import { Injectable } from '@nestjs/common';

import { CoreBaseRepository } from '@/backend_auth/core/database/core-base-repository';
import { AuthUserNotFoundException, AuthUserDisabledException } from '@/backend_auth/modules/auth/auth.exceptions';
import { AuthUserStatus } from '@/backend_auth/modules/auth/auth.status.constants';
import { AuthUserEntity } from '@/backend_auth/modules/auth/entities/auth-user.entity';
import { AuthUserMapper } from '@/backend_auth/modules/auth/mappers/auth-user.mapper';

import { CoreRequestContextService } from '@/backend_auth/core/context/core-request-context';
import type { AuthCredentialRecord, AuthSeedUserInput, AuthUserDomain } from '@/backend_auth/modules/auth/auth.interfaces';
import { DataSource, IsNull } from 'typeorm';
@Injectable()
export class AuthUserRepository extends CoreBaseRepository<AuthUserEntity> {
  constructor(dataSource: DataSource, requestContext: CoreRequestContextService) {
    super(AuthUserEntity, dataSource, requestContext);
  }

  /** @description Finds credentials for one normalized active email. @param email - Normalized email. @returns Credential record or null. */
  async findCredentialsByEmail(email: string): Promise<AuthCredentialRecord | null> {
    const entity = await this.getRepository().findOne({
      where: { email: email.toLowerCase(), status: AuthUserStatus.ACTIVE, deletedAt: IsNull() },
      select: ['id', 'name', 'email', 'passwordHash', 'role', 'tenantId'],
    });
    return entity ? AuthUserMapper.toCredentials(entity) : null;
  }

  /** @description Loads an active user as a domain object or throws a typed Auth exception. @param id - User UUID. @returns User domain object. @throws AuthUserNotFoundException/AuthUserDisabledException. */
  async findUserByIdOrThrow(id: string): Promise<AuthUserDomain> {
    const entity = await this.findById(id);
    if (!entity) throw new AuthUserNotFoundException();
    if (entity.status !== AuthUserStatus.ACTIVE) throw new AuthUserDisabledException();
    return AuthUserMapper.toDomain(entity);
  }

  /** @description Checks whether an active non-deleted user exists. @param id - User UUID. @returns True when active. */
  async doesUserExist(id: string): Promise<boolean> {
    return this.getRepository().exists({ where: { id, status: AuthUserStatus.ACTIVE, deletedAt: IsNull() } });
  }

  /** @description Creates or updates one deterministic Auth seed identity through a named repository mutation. @param input - Seed identity and hashed password. @returns void. */
  async seedAuthUser(input: AuthSeedUserInput): Promise<void> {
    const existing = await this.getRepository().findOne({ where: { id: input.id } });
    if (existing) {
      await this.getRepository().update(input.id, {
        name: input.name,
        email: input.email,
        role: input.role,
        status: input.status,
        updatedAt: input.now,
        deletedAt: null,
      });
      return;
    }
    await this.getRepository().insert({
      id: input.id,
      name: input.name,
      email: input.email,
      passwordHash: input.passwordHash,
      role: input.role,
      tenantId: null,
      status: input.status,
      createdAt: input.now,
      updatedAt: input.now,
      deletedAt: null,
    });
  }
}
