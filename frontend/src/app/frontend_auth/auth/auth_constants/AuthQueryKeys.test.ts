import { describe, expect, it } from 'vitest';

import { AUTH_QUERY_KEYS } from '@/app/frontend_auth/auth/auth_constants/AuthQueryKeys';



describe('AUTH_QUERY_KEYS', () => {
  it('keeps Auth token status under the module namespace', () => {
    expect(AUTH_QUERY_KEYS.tokenStatus()).toEqual(['auth', 'token-status']);
  });
});
