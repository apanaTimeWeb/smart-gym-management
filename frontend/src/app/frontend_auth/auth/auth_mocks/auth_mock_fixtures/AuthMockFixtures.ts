import { AuthRoleConstants } from '@/app/frontend_auth/auth/auth_constants/AuthRoleConstants';

import { AuthMockPublicFixtures } from '@/app/frontend_auth/auth/auth_mocks/auth_mock_fixtures/AuthMockPublicFixtures';

import type { AuthRole } from '@/app/frontend_auth/auth/auth_types/AuthContracts';

import type { AuthMockDemoEntry } from '@/app/frontend_auth/auth/auth_types/AuthMockTypes';

// RESPONSIBILITY: Owns credential-bearing demo fixture records that are restricted to server/test execution and never exposed to browser UI.

export const AuthMockFixtures = {
  USERS: {
    [AuthRoleConstants.SUPERADMIN]: { password: 'demo123', user: AuthMockPublicFixtures.USERS[AuthRoleConstants.SUPERADMIN] },
    [AuthRoleConstants.ADMIN]: { password: 'demo123', user: AuthMockPublicFixtures.USERS[AuthRoleConstants.ADMIN] },
    [AuthRoleConstants.MANAGER]: { password: 'demo123', user: AuthMockPublicFixtures.USERS[AuthRoleConstants.MANAGER] },
    [AuthRoleConstants.TRAINER]: { password: 'demo123', user: AuthMockPublicFixtures.USERS[AuthRoleConstants.TRAINER] },
  } satisfies Record<AuthRole, AuthMockDemoEntry>,
} as const;
