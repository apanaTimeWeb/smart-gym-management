// RESPONSIBILITY: Resolves the authoritative active user identity for GET /auth/me.
// FLOW: AuthQueryController -> AuthMeService -> AuthUserRepository -> AuthUserEntity -> mapper.

import { Injectable } from '@nestjs/common';

import { AuthUserRepository } from '@/backend_auth/auth_modules/auth/auth_repositories/auth-user.repository';

import type { AuthUserDomain } from '@/backend_auth/auth_modules/auth/auth.interfaces';
@Injectable()
export class AuthMeService {
  constructor(private readonly userRepository: AuthUserRepository) {}

  /** @description Loads the active user from PostgreSQL using the verified JWT subject. @param userId - Auth user UUID. @returns Authoritative Auth user domain. */
  async findAuthenticatedUserById(userId: string): Promise<AuthUserDomain> { return this.userRepository.findUserByIdOrThrow(userId); }
}
