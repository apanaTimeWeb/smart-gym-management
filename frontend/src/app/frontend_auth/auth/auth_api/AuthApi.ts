/**
 * RESPONSIBILITY: Encapsulates browser-facing Auth API calls; browser JavaScript receives only sanitized AuthUser data.
 * DATA FLOW: Login view/hook -> AuthApi -> same-origin Auth route -> sanitized AuthUser.
 * @edge-case Malformed responses become typed AuthApiError instances without exposing token material or internal transport details.
 */
import { AuthApiError } from '@/app/frontend_auth/auth/auth_api/AuthApiError';
import { AuthErrorConstants } from '@/app/frontend_auth/auth/auth_constants/AuthErrorConstants';
import { AuthSessionConstants } from '@/app/frontend_auth/auth/auth_constants/AuthSessionConstants';
import { AuthSessionResponseSchema } from '@/app/frontend_auth/auth/auth_types/AuthContracts';
import { AuthUrlConfig } from '@/app/frontend_auth/auth/auth_url_config';
import type { AuthLoginCredentials, AuthRole, AuthUser } from '@/app/frontend_auth/auth/auth_types/AuthContracts';

async function parseAuthSessionResponse(response: Response): Promise<AuthUser> {
  let rawPayload: unknown;
  try {
    rawPayload = await response.json();
  } catch {
    throw new AuthApiError('', AuthErrorConstants.CODE.RESPONSE_UNREADABLE);
  }

  const parsed = AuthSessionResponseSchema.safeParse(rawPayload);
  if (!parsed.success) {
    throw new AuthApiError('', AuthErrorConstants.CODE.RESPONSE_INVALID);
  }

  if (parsed.data.success !== response.ok) {
    throw new AuthApiError('', AuthErrorConstants.CODE.RESPONSE_INVALID);
  }

  if (!parsed.data.success || !parsed.data.data) {
    if (parsed.data.statusCode !== response.status) {
      throw new AuthApiError('', AuthErrorConstants.CODE.RESPONSE_INVALID);
    }
    throw new AuthApiError(parsed.data.message, parsed.data.errorCode, parsed.data.validationErrors);
  }

  return parsed.data.data;
}

async function postAuthSession(endpoint: string, body: unknown, idempotencyKey: string): Promise<AuthUser> {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      [AuthSessionConstants.HEADERS.CONTENT_TYPE]: AuthSessionConstants.HEADERS.CONTENT_TYPE_JSON,
      [AuthSessionConstants.HEADERS.IDEMPOTENCY_KEY]: idempotencyKey,
    },
    body: JSON.stringify(body),
  });

  return parseAuthSessionResponse(response);
}

export const AuthApi = {
  /**
   * Authenticates user-entered credentials through the secure same-origin session route.
   * @param credentials Validated email/password values.
   * @param idempotencyKey Stable key for the current user intent.
   */
  async login(credentials: AuthLoginCredentials, idempotencyKey: string): Promise<AuthUser> {
    return postAuthSession(AuthUrlConfig.PROXY_API.SESSION, credentials, idempotencyKey);
  },

  /**
   * Starts a development-only demo login without sending fixture credentials to the browser.
   * @param role Demo role selected by the user.
   * @param idempotencyKey Stable key for the current demo-login intent.
   */
  async loginDemo(role: AuthRole, idempotencyKey: string): Promise<AuthUser> {
    return postAuthSession(AuthUrlConfig.PROXY_API.DEMO_LOGIN, { role }, idempotencyKey);
  },
} as const;
