/**
 * RESPONSIBILITY: Mocks the browser-facing Auth proxy endpoints used by Login when the real host routes/backend are unavailable.
 * DATA FLOW: Login AuthApi -> same-origin Auth route -> module-owned browser mock handler -> canonical Auth response -> Login UI.
 * @description Contains no credential-bearing fixture passwords, private tokens, or server environment imports.
 * @dependencies Auth public fixtures, Auth contracts, Auth URL configuration, idempotency utility, and semantic response/error constants.
 * @edge-case Reusing an idempotency key with a different login intent returns a deterministic conflict instead of replaying another user.
 */
import { StatusCodes } from 'http-status-codes';
import { http, HttpResponse } from 'msw';
import { AuthErrorConstants } from '@/app/frontend_auth/auth/auth_constants/AuthErrorConstants';
import { AuthResponseMessages } from '@/app/frontend_auth/auth/auth_constants/AuthResponseMessages';
import { AuthSessionConstants } from '@/app/frontend_auth/auth/auth_constants/AuthSessionConstants';
import { AuthMockPublicFixtures } from '@/app/frontend_auth/auth/auth_mocks/auth_mock_fixtures/AuthMockPublicFixtures';
import { AuthDemoLoginRequestSchema, AuthLoginCredentialsSchema } from '@/app/frontend_auth/auth/auth_schemas/AuthSchema';
import { AuthUrlConfig } from '@/app/frontend_auth/auth/auth_url_config';
import { AuthIdempotencyFingerprintUtilities } from '@/app/frontend_auth/auth/auth_utils/AuthIdempotencyFingerprintUtilities';
import type { AuthMockBrowserIdempotencyRecord, AuthMockBrowserUser } from '@/app/frontend_auth/auth/auth_types/AuthMockTypes';

const mockBrowserIdempotency = new Map<string, AuthMockBrowserIdempotencyRecord>();

/**
 * Resolves the browser-visible mock identity from a normalized email address.
 * @description Uses only the browser-safe public fixture set and never touches credential-bearing fixture data.
 * @dependencies AuthMockPublicFixtures.
 * @edge-case Unknown or blank emails return null without throwing.
 */
function resolveProxyUser(email: string): AuthMockBrowserUser | null {
  const normalized = email.trim().toLowerCase();
  return Object.values(AuthMockPublicFixtures.USERS).find((user) => user.email.toLowerCase() === normalized) ?? null;
}

/**
 * Reads and trims the Login idempotency header from a browser mock request.
 * @description Keeps header normalization deterministic across all browser-facing mock mutation handlers.
 * @dependencies AuthSessionConstants.
 * @edge-case Blank or missing headers resolve to null.
 */
function getRequestIdempotencyKey(request: Request): string | null {
  return request.headers.get(AuthSessionConstants.HEADERS.IDEMPOTENCY_KEY)?.trim() || null;
}

/**
 * Builds the canonical browser-mock response for an idempotency-key intent collision.
 * @description Returns a deterministic conflict without leaking mock session credentials.
 * @dependencies AuthApiResponse contract constants and HTTP status constants.
 * @edge-case Replaying a key for different request intent never creates or selects another session.
 */
function idempotencyRequiredResponse() {
  return HttpResponse.json(
    {
      success: false,
      message: AuthErrorConstants.MESSAGE.IDEMPOTENCY_REQUIRED,
      data: null,
      error: AuthErrorConstants.NAME.VALIDATION,
      errorCode: AuthErrorConstants.CODE.IDEMPOTENCY_REQUIRED,
      statusCode: StatusCodes.BAD_REQUEST,
    },
    { status: StatusCodes.BAD_REQUEST },
  );
}

/**
 * Builds the canonical browser-mock conflict response for a reused idempotency key with a different intent.
 * @description Prevents replaying a response for a request that does not match the original intent fingerprint.
 * @dependencies Auth error constants and HTTP status constants.
 * @edge-case The conflicting request receives no user/session data.
 */
function idempotencyConflictResponse() {
  return HttpResponse.json(
    {
      success: false,
      message: AuthErrorConstants.MESSAGE.IDEMPOTENCY_CONFLICT,
      data: null,
      error: AuthErrorConstants.NAME.CONFLICT,
      errorCode: AuthErrorConstants.CODE.IDEMPOTENCY_CONFLICT,
      statusCode: StatusCodes.CONFLICT,
    },
    { status: StatusCodes.CONFLICT },
  );
}

export const AuthMockBrowserHandlers = [
  // Deliberately empty: Browser mocks MUST NOT intercept PROXY_API routes.
  // Next.js API Routes (like /frontend_auth/auth/session/route.ts) MUST handle these
  // in order to correctly set the secure HttpOnly session cookies.
  // The server-side route.ts has its own mock bypass when NEXT_PUBLIC_DEMO_MODE=true.
];

export const AuthMockBrowserHandlersTestApi = {
  reset(): void {
    mockBrowserIdempotency.clear();
  },
};
