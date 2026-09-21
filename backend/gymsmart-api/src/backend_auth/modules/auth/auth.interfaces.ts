// RESPONSIBILITY: Defines Auth domain contracts independent of TypeORM and HTTP DTO implementation details.
// FLOW: Repository -> domain object -> service/orchestrator -> response mapper/controller.

import type { AuthRole } from '@/backend_auth/modules/auth/auth.roles.constants';
import type { AuthUserStatus } from '@/backend_auth/modules/auth/auth.status.constants';
export interface AuthUserDomain {
  id: string;
  name: string;
  email: string;
  role: AuthRole;
  tenantId?: string;
}

export interface AuthCredentialRecord {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: AuthRole;
  tenantId?: string;
}

export interface AuthAccessTokenClaims {
  sub: string;
  sid: string;
  email: string;
  role: AuthRole;
  tenantId?: string;
}

export interface AuthLoginDomainResult {
  accessToken: string;
  refreshToken: string;
  user: AuthUserDomain;
}

export interface AuthRefreshDomainResult {
  accessToken: string;
  refreshToken: string;
}

export interface AuthSessionDomain {
  id: string;
  userId: string;
  refreshTokenHash: string;
  expiresAt: Date;
  revokedAt: Date | null;
}

export interface AuthSeedDefinition {
  id: string;
  role: AuthRole;
  email: string;
  name: string;
  passwordKey: string;
}

export interface AuthSeedUserInput {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: AuthRole;
  status: AuthUserStatus;
  now: Date;
}
