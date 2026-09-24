// RESPONSIBILITY: Seeds deterministic Auth identities only when an explicit non-production seed flag is enabled.
// FLOW: CoreMasterSeeder -> AuthSeeder -> AuthUserRepository -> PostgreSQL.

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AuthRole } from '@/backend_auth/auth_modules/auth/auth.roles.constants';
import { AuthUserStatus } from '@/backend_auth/auth_modules/auth/auth.status.constants';
import { AuthUserRepository } from '@/backend_auth/auth_modules/auth/auth_repositories/auth-user.repository';
import { AuthPasswordUtils } from '@/backend_auth/auth_modules/auth/auth_utils/auth-password.utils';

import type { AuthSeedDefinition, AuthSeedUserInput } from '@/backend_auth/auth_modules/auth/auth.interfaces';
const AUTH_SEED_NOW = new Date('2026-01-01T00:00:00.000Z');

@Injectable()
export class AuthSeeder {
  constructor(
    private readonly userRepository: AuthUserRepository,
    private readonly config: ConfigService,
  ) {}

  /** @description Creates or refreshes deterministic local Auth accounts when explicitly enabled. @returns Number of processed seed accounts. */
  async seedAuthUsers(): Promise<number> {
    if (!this.config.getOrThrow<boolean>('environment.ALLOW_DETERMINISTIC_SEED_DATA')) return 0;
    let processed = 0;
    for (const entry of this.seedEntries()) {
      const password = this.config.get<string>(entry.passwordKey);
      if (!password) continue;
      await this.userRepository.seedAuthUser(this.createSeedInput(entry, await AuthPasswordUtils.hash(password)));
      processed += 1;
    }
    return processed;
  }

  /** @description Builds the repository-neutral seed contract for one deterministic identity. @param entry - Stable identity definition. @param passwordHash - Bcrypt password hash. @returns Auth seed input. */
  private createSeedInput(entry: AuthSeedDefinition, passwordHash: string): AuthSeedUserInput {
    return { id: entry.id, role: entry.role, email: entry.email, name: entry.name, passwordHash, status: AuthUserStatus.ACTIVE, now: AUTH_SEED_NOW };
  }

  /** @description Returns the stable identities used by local deterministic seed data. @returns Auth seed definitions. */
  private seedEntries(): AuthSeedDefinition[] {
    return [
      { id: '11111111-1111-4111-8111-111111111111', role: AuthRole.SUPERADMIN, email: 'superadmin@gymsmart.local', name: 'Seed Superadmin', passwordKey: 'environment.SEED_SUPERADMIN_PASSWORD' },
      { id: '22222222-2222-4222-8222-222222222222', role: AuthRole.ADMIN, email: 'admin@gymsmart.local', name: 'Seed Admin', passwordKey: 'environment.SEED_ADMIN_PASSWORD' },
      { id: '33333333-3333-4333-8333-333333333333', role: AuthRole.MANAGER, email: 'manager@gymsmart.local', name: 'Seed Manager', passwordKey: 'environment.SEED_MANAGER_PASSWORD' },
      { id: '44444444-4444-4444-8444-444444444444', role: AuthRole.TRAINER, email: 'trainer@gymsmart.local', name: 'Seed Trainer', passwordKey: 'environment.SEED_TRAINER_PASSWORD' },
    ];
  }
}
