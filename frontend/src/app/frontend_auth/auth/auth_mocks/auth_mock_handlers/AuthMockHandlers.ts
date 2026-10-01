import { AuthMockBackendHandlers, AuthMockBackendHandlersTestApi } from '@/app/frontend_auth/auth/auth_mocks/auth_mock_handlers/AuthMockBackendHandlers';

import { AuthMockBrowserHandlers, AuthMockBrowserHandlersTestApi } from '@/app/frontend_auth/auth/auth_mocks/auth_mock_handlers/AuthMockBrowserHandlers';

import type { AuthRole } from '@/app/frontend_auth/auth/auth_types/AuthContracts';



/**
 * Test-only combined handler set for Node integration tests that need to exercise both the frontend proxy contract and upstream backend contract.
 */
export const AuthMockHandlers = [
  ...AuthMockBrowserHandlers,
  ...AuthMockBackendHandlers,
] as const;

/**
 * Test-only controls for resetting and seeding mutable Auth mock session state.
 */
export const AuthMockHandlersTestApi = {
  reset(): void {
    AuthMockBrowserHandlersTestApi.reset();
    AuthMockBackendHandlersTestApi.reset();
  },
  seed(role: AuthRole) {
    return AuthMockBackendHandlersTestApi.seed(role);
  },
} as const;
