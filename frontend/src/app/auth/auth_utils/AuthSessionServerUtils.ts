/**
 * RESPONSIBILITY: Resolves an authenticated Auth user on the server without trusting unsigned browser user data in production.
 * DATA FLOW: HTTP-only access cookie -> authoritative `/auth/me` verification (or gated demo fixture) -> safe AuthUser.
 */
import { AuthBackendTransport } from '@/app/auth/auth_api/AuthBackendTransport';
import { AuthUrlConfig } from '@/app/auth/auth_url_config';
import { AuthBackendUserResponseSchema, AuthSessionUserCookieSchema } from '@/app/auth/auth_types/AuthContracts';
import type { AuthUser } from '@/app/auth/auth_types/AuthContracts';

export const AuthSessionServerUtils = {
  parseUserCookie(rawUserCookie: string | undefined): AuthUser | null {
    if (!rawUserCookie) return null;
    try {
      const directValue = AuthSessionUserCookieSchema.safeParse(JSON.parse(rawUserCookie));
      if (directValue.success) return directValue.data;
      const decodedValue = AuthSessionUserCookieSchema.safeParse(JSON.parse(decodeURIComponent(rawUserCookie)));
      return decodedValue.success ? decodedValue.data : null;
    } catch {
      return null;
    }
  },

  async resolveUser(accessToken: string | undefined, rawUserCookie: string | undefined): Promise<AuthUser | null> {
    if (!accessToken) return null;

    const demoEnabled = process.env.AUTH_DEMO_MODE === 'true' || process.env.NEXT_PUBLIC_DEMO_MODE === 'true';
    if (demoEnabled) {
      return AuthSessionServerUtils.parseUserCookie(rawUserCookie);
    }

    try {
      const { response, payload } = await AuthBackendTransport.get(
        AuthUrlConfig.BACKEND_API.ME,
        { Authorization: `Bearer ${accessToken}` },
      );
      const parsed = AuthBackendUserResponseSchema.safeParse(payload);
      if (!response.ok || !parsed.success || !parsed.data.success || !parsed.data.data) return null;
      return parsed.data.data;
    } catch {
      return null;
    }
  },
};
