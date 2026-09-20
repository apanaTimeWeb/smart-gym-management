/**
 * RESPONSIBILITY: Provides the Auth module's server-only backend transport without owning endpoint-specific business logic.
 * DATA FLOW: Auth route -> AuthBackendTransport -> backend endpoint -> unknown JSON -> Zod validation at the route boundary.
 */
import { AuthApiError } from '@/app/auth/auth_api/AuthApiError';

export const AuthBackendTransport = {
  async get(endpoint: string, headers?: Record<string, string>) {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!baseUrl) {
      throw new AuthApiError('Authentication service is not configured.');
    }

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

  async post(endpoint: string, body?: unknown, headers?: Record<string, string>) {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!baseUrl) {
      throw new AuthApiError('Authentication service is not configured.');
    }

    const response = await fetch(`${baseUrl}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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
};
