/**
 * RESPONSIBILITY: Owns browser-safe demo identities shared by module-owned MSW handlers and tests.
 * DATA FLOW: Module fixture lookup -> safe public identity -> MSW response/test assertion.
 * @edge-case This file contains no demo passwords or private tokens and is safe for MSW/browser-facing test use.
 */
import { AuthRoleConstants } from '@/app/frontend_auth/auth/auth_constants/AuthRoleConstants';
import type { AuthRole } from '@/app/frontend_auth/auth/auth_constants/AuthRoleConstants';
import type { AuthUser } from '@/app/frontend_auth/auth/auth_types/AuthContracts';

export const AuthMockPublicFixtures = {
  USERS: {
    [AuthRoleConstants.SUPERADMIN]: {
      id: 'mock-superadmin',
      name: 'Demo Superadmin',
      email: 'demo_admin@gym.com',
      role: AuthRoleConstants.SUPERADMIN,
      tenantId: 'tenant-global',
    },
    [AuthRoleConstants.ADMIN]: {
      id: 'mock-admin',
      name: 'Demo Admin',
      email: 'admin@gymsmart.com',
      role: AuthRoleConstants.ADMIN,
      tenantId: 'tenant-demo',
    },
    [AuthRoleConstants.MANAGER]: {
      id: 'mock-manager',
      name: 'Demo Manager',
      email: 'manager@gymsmart.com',
      role: AuthRoleConstants.MANAGER,
      tenantId: 'tenant-demo',
    },
    [AuthRoleConstants.TRAINER]: {
      id: 'mock-trainer',
      name: 'Demo Trainer',
      email: 'trainer@gymsmart.com',
      role: AuthRoleConstants.TRAINER,
      tenantId: 'tenant-demo',
    },
  } satisfies Record<AuthRole, AuthUser>,
} as const;
