// RESPONSIBILITY: Owns the retired set-cookie compatibility route and rejects direct client token-to-cookie writes.
import { StatusCodes } from 'http-status-codes';

import { AuthErrorConstants } from '@/app/frontend_auth/auth/auth_constants/AuthErrorConstants';

import { AuthApiResponseUtilities } from '@/app/frontend_auth/auth/auth_utils/AuthApiResponseUtilities';



export async function POST() {
  return AuthApiResponseUtilities.failure(
    AuthErrorConstants.MESSAGE.SET_COOKIE_RETIRED,
    StatusCodes.GONE,
    AuthErrorConstants.NAME.ENDPOINT_RETIRED,
    AuthErrorConstants.CODE.SESSION_SET_COOKIE_RETIRED,
  );
}
