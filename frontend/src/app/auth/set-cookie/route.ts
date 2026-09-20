/**
 * RESPONSIBILITY: Retired security boundary. Direct client-provided token-to-cookie writes are intentionally disabled.
 * DATA FLOW: Any legacy caller receives a deterministic gone response and must migrate to POST /auth/session.
 */
import { StatusCodes } from 'http-status-codes';
import { AuthErrorConstants } from '@/app/auth/auth_constants/AuthErrorConstants';
import { AuthApiResponseUtils } from '@/app/auth/auth_utils/AuthApiResponseUtils';

export async function POST() {
  return AuthApiResponseUtils.failure(
    AuthErrorConstants.MESSAGE.SET_COOKIE_RETIRED,
    StatusCodes.GONE,
    AuthErrorConstants.NAME.ENDPOINT_RETIRED,
    AuthErrorConstants.CODE.SESSION_SET_COOKIE_RETIRED,
  );
}
