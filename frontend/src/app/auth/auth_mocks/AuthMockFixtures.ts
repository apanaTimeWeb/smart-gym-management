/**
 * RESPONSIBILITY: Owns development-only demo credentials and corresponding safe user profiles for Auth mock behavior.
 * DATA FLOW: Auth demo UI -> /auth/session -> development-only lookup -> mock session cookie + canonical user response.
 */
import { AuthRoleConstants } from '@/app/auth/auth_constants/AuthRoleConstants';
import type { AuthRole } from '@/app/auth/auth_constants/AuthRoleConstants';
import type { AuthUser } from '@/app/auth/auth_types/AuthContracts';

type AuthDemoEntry = {
  email: string;
  password: string;
  user: AuthUser;
};

export const AuthMockFixtures = {
  USERS: {
    [AuthRoleConstants.SUPERADMIN]: {
      email: 'demo_admin@gym.com',
      password: 'demo123',
      user: {
        id: 'mock-superadmin',
        name: 'Demo Superadmin',
        email: 'demo_admin@gym.com',
        role: AuthRoleConstants.SUPERADMIN,
        tenantId: 'tenant-global',
      },
    },
    [AuthRoleConstants.ADMIN]: {
      email: 'admin@gymsmart.com',
      password: 'demo123',
      user: {
        id: 'mock-admin',
        name: 'Demo Admin',
        email: 'admin@gymsmart.com',
        role: AuthRoleConstants.ADMIN,
        tenantId: 'tenant-demo',
      },
    },
    [AuthRoleConstants.MANAGER]: {
      email: 'manager@gymsmart.com',
      password: 'demo123',
      user: {
        id: 'mock-manager',
        name: 'Demo Manager',
        email: 'manager@gymsmart.com',
        role: AuthRoleConstants.MANAGER,
        tenantId: 'tenant-demo',
      },
    },
    [AuthRoleConstants.TRAINER]: {
      email: 'trainer@gymsmart.com',
      password: 'demo123',
      user: {
        id: 'mock-trainer',
        name: 'Demo Trainer',
        email: 'trainer@gymsmart.com',
        role: AuthRoleConstants.TRAINER,
        tenantId: 'tenant-demo',
      },
    },
  } satisfies Record<AuthRole, AuthDemoEntry>,
} as const;

const AUTH_DEMO_ENTRIES = [
  AuthMockFixtures.USERS[AuthRoleConstants.SUPERADMIN],
  AuthMockFixtures.USERS[AuthRoleConstants.ADMIN],
  AuthMockFixtures.USERS[AuthRoleConstants.MANAGER],
  AuthMockFixtures.USERS[AuthRoleConstants.TRAINER],
] as const;

export const AuthMockFixturesApi = {
  findByCredentials(email: string, password: string): AuthUser | null {
    const candidate = AUTH_DEMO_ENTRIES.find(
      (entry) =>
        entry.email.toLowerCase() === email.trim().toLowerCase() &&
        entry.password === password,
    );
    return candidate?.user ?? null;
  },

  findByRole(role: keyof typeof AuthMockFixtures.USERS): AuthDemoEntry {
    return AuthMockFixtures.USERS[role];
  },
};
