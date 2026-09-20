/**
 * RESPONSIBILITY: Ends the current Auth session, best-effort revokes the backend session, and always clears local HTTP-only cookies.
 * DATA FLOW: Access cookie -> backend logout attempt -> cookie clearing -> canonical logged-out response.
 */
import { NextRequest } from 'next/server';
import { AuthUrlConfig } from '@/app/auth/auth_url_config';
import { AuthSessionConstants } from '@/app/auth/auth_constants/AuthSessionConstants';
import { AuthBackendTransport } from '@/app/auth/auth_api/AuthBackendTransport';
import { AuthApiResponseUtils } from '@/app/auth/auth_utils/AuthApiResponseUtils';
import { AuthCookieUtils } from '@/app/auth/auth_utils/AuthCookieUtils';

export async function POST(request: NextRequest) {
  const token = request.cookies.get(AuthSessionConstants.COOKIES.ACCESS_TOKEN)?.value;
  if (token && process.env.NEXT_PUBLIC_API_URL) {
    try {
      await AuthBackendTransport.post(
        AuthUrlConfig.BACKEND_API.LOGOUT,
        undefined,
        { Authorization: `Bearer ${token}` },
      );
    } catch {
      // Local session cleanup remains authoritative for logout UX.
    }
  }

  const response = AuthApiResponseUtils.success('Logged out successfully', null);
  AuthCookieUtils.clearSession(response);
  return response;
}
