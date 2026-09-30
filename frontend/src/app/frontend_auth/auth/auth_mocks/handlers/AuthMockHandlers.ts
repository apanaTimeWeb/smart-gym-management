/**
 * RESPONSIBILITY: Provides the test-only aggregate of Auth browser and upstream-backend MSW handlers for Node-based module tests.
 * DATA FLOW: Auth test harness -> browser/backend handler sets -> module-owned fixtures -> deterministic API-shaped response.
 * @edge-case Browser MSW registration must import `AuthMockBrowserHandlers` directly so server-only runtime configuration never enters the browser bundle.
 */
import { AuthMockBackendHandlers, AuthMockBackendHandlersTestApi } from '@/app/frontend_auth/auth/auth_mocks/handlers/AuthMockBackendHandlers';
import { AuthMockBrowserHandlers, AuthMockBrowserHandlersTestApi } from '@/app/frontend_auth/auth/auth_mocks/handlers/AuthMockBrowserHandlers';
import type { AuthRole } from '@/app/frontend_auth/auth/auth_constants/AuthRoleConstants';

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
