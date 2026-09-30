
/**
 * RESPONSIBILITY: Reports safe session status without ever returning access or refresh token values.
 * DATA FLOW: HTTP-only session cookie presence -> validated AuthUser resolution -> sanitized status response.
 */
import { AuthResponseMessages } from '@/app/frontend_auth/auth/auth_constants/AuthResponseMessages';
import { AuthSessionConstants } from '@/app/frontend_auth/auth/auth_constants/AuthSessionConstants';
import { AuthTokenStatusSchema } from '@/app/frontend_auth/auth/auth_types/AuthContracts';
import { AuthApiResponseUtils } from '@/app/frontend_auth/auth/auth_utils/AuthApiResponseUtils';
import { AuthSessionServerUtils } from '@/app/frontend_auth/auth/auth_utils/AuthSessionServerUtils';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const accessToken = request.cookies.get(AuthSessionConstants.COOKIES.ACCESS_TOKEN)?.value;
  const user = await AuthSessionServerUtils.resolveUser(accessToken);
  const payload = AuthTokenStatusSchema.parse({
    authenticated: Boolean(user),
    user,
  });

  return AuthApiResponseUtils.success(AuthResponseMessages.SESSION_STATUS, payload);
}
