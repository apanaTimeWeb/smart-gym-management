import { AuthSessionConstants } from '@/app/frontend_auth/auth/auth_constants/AuthSessionConstants';



export const AuthRequestHeaderUtilities = {
  /**
   * Returns a trimmed idempotency key when the caller supplied a usable value.
   * @param request Incoming Auth mutation request.
   * @returns Normalized key or null when absent/blank.
   */
  getIdempotencyKey(request: Pick<Request, 'headers'>): string | null {
    const key = request.headers.get(AuthSessionConstants.HEADERS.IDEMPOTENCY_KEY)?.trim();
    return key ? key : null;
  },
} as const;
