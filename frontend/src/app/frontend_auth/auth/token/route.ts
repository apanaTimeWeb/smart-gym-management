// RESPONSIBILITY: Owns the secure session-status route and returns sanitized authentication state without token material.
import { AuthResponseMessages } from '@/app/frontend_auth/auth/auth_constants/AuthResponseMessages';

import { AuthSessionConstants } from '@/app/frontend_auth/auth/auth_constants/AuthSessionConstants';

import { AuthTokenStatusSchema } from '@/app/frontend_auth/auth/auth_schemas/AuthSchema';

import { AuthApiResponseUtilities } from '@/app/frontend_auth/auth/auth_utils/AuthApiResponseUtilities';

import { AuthSessionServerUtilities } from '@/app/frontend_auth/auth/auth_utils/AuthSessionServerUtilities';

import type { NextRequest } from 'next/server';



export async function GET(request: NextRequest) {
  const accessToken = request.cookies.get(AuthSessionConstants.COOKIES.ACCESS_TOKEN)?.value;
  const user = await AuthSessionServerUtilities.resolveUser(accessToken);
  const payload = AuthTokenStatusSchema.parse({
    authenticated: Boolean(user),
    user,
  });

  return AuthApiResponseUtilities.success(AuthResponseMessages.SESSION_STATUS, payload);
}
