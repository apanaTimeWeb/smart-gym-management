/**
 * RESPONSIBILITY: Reports safe session status without ever returning access or refresh token values.
 * DATA FLOW: HTTP-only session cookie presence -> sanitized authentication status -> canonical response.
 */
import { NextRequest } from 'next/server';
import { AuthSessionConstants } from '@/app/auth/auth_constants/AuthSessionConstants';
import { AuthTokenStatusSchema } from '@/app/auth/auth_types/AuthContracts';
import { AuthSessionServerUtils } from '@/app/auth/auth_utils/AuthSessionServerUtils';
import { AuthApiResponseUtils } from '@/app/auth/auth_utils/AuthApiResponseUtils';

export async function GET(request: NextRequest) {
  const token = request.cookies.get(AuthSessionConstants.COOKIES.ACCESS_TOKEN)?.value;
  const userCookie = request.cookies.get(AuthSessionConstants.COOKIES.USER)?.value;
  const user = await AuthSessionServerUtils.resolveUser(token, userCookie);
  const payload = {
    authenticated: Boolean(user),
    user,
    token, // Include token for apiFetch
  };

  return AuthApiResponseUtils.success('Session status', payload);
}
