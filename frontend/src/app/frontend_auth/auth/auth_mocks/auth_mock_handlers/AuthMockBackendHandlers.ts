import { AuthMockFixturesApi } from '@/app/frontend_auth/auth/auth_mocks/auth_mock_fixtures/AuthMockFixturesApi';

import { AuthMockBackendLoginHandlers } from '@/app/frontend_auth/auth/auth_mocks/auth_mock_handlers/AuthMockBackendLoginHandlers';

import { AuthMockBackendSessionHandlers } from '@/app/frontend_auth/auth/auth_mocks/auth_mock_handlers/AuthMockBackendSessionHandlers';

import type { AuthRole } from '@/app/frontend_auth/auth/auth_types/AuthContracts';

// RESPONSIBILITY: Aggregates the module-owned upstream Auth MSW handlers for test/server transport scenarios.

export const AuthMockBackendHandlers = [
  ...AuthMockBackendLoginHandlers,
  ...AuthMockBackendSessionHandlers,
] as const;

export const AuthMockBackendHandlersTestApi = {
  reset(): void {
    AuthMockFixturesApi.resetMockSessions();
  },
  seed(role: AuthRole) {
    return AuthMockFixturesApi.issueSession(AuthMockFixturesApi.findByRole(role).user);
  },
} as const;
