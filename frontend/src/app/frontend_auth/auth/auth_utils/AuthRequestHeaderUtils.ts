/**
 * RESPONSIBILITY: Reads security-sensitive Auth request headers through centralized names and returns only normalized values.
 * DATA FLOW: NextRequest headers -> AuthRequestHeaderUtils -> Auth route validation/forwarding.
 */
import { AuthSessionConstants } from '@/app/frontend_auth/auth/auth_constants/AuthSessionConstants';
import type { NextRequest } from 'next/server';

export const AuthRequestHeaderUtils = {
  /**
   * Returns a trimmed idempotency key when the caller supplied a usable value.
   * @param request Incoming Auth mutation request.
   * @returns Normalized key or null when absent/blank.
   */
  getIdempotencyKey(request: NextRequest): string | null {
    const key = request.headers.get(AuthSessionConstants.HEADERS.IDEMPOTENCY_KEY)?.trim();
    return key ? key : null;
  },
} as const;
