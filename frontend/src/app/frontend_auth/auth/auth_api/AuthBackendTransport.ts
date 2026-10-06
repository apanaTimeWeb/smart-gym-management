// RESPONSIBILITY: Owns server-side Auth-to-backend HTTP transport used only by Auth route handlers.
// DATA FLOW: Auth route -> AuthBackendTransport -> upstream Auth API -> validated Auth response.

import { env } from '@/config/env';

import { AuthApiError } from '@/app/frontend_auth/auth/auth_api/AuthApiError';

import { AuthSessionConstants } from '@/app/frontend_auth/auth/auth_constants/AuthSessionConstants';

export const AuthBackendTransport = {
  /**
   * Performs a no-store server-side GET request.
   * @param endpoint Auth backend endpoint from AuthUrlConfig.
   */
  async get(endpoint: string, headers?: Record<string, string>) {
    const baseUrl = env.NEXT_PUBLIC_API_URL;
    if (!baseUrl) throw new AuthApiError();

    const response = await fetch(`${baseUrl}${endpoint}`, {
      method: 'GET',
      headers: { ...headers },
      cache: 'no-store',
    });

    let payload: unknown = null;
    try {
      payload = await response.json();
    } catch {
      payload = null;
    }

    return { response, payload };
  },

  /**
   * Performs a no-store server-side POST request.
   * @param endpoint Auth backend endpoint from AuthUrlConfig.
   * @param body Optional request body.
   * @param headers Optional request headers such as Authorization and Idempotency-Key.
   */
  async post(endpoint: string, body?: unknown, headers?: Record<string, string>) {
    const baseUrl = env.NEXT_PUBLIC_API_URL;
    if (!baseUrl) throw new AuthApiError();

    const response = await fetch(`${baseUrl}${endpoint}`, {
      method: 'POST',
      headers: {
        [AuthSessionConstants.HEADERS.CONTENT_TYPE]: AuthSessionConstants.HEADERS.CONTENT_TYPE_JSON,
        ...headers,
      },
      body: body === undefined ? undefined : JSON.stringify(body),
      cache: 'no-store',
    });

    let payload: unknown = null;
    try {
      payload = await response.json();
    } catch {
      payload = null;
    }

    return { response, payload };
  },
} as const;
