import { describe, expect, it, vi } from 'vitest';

import { AuthApiError } from '@/app/frontend_auth/auth/auth_api/AuthApiError';

import { AuthErrorConstants } from '@/app/frontend_auth/auth/auth_constants/AuthErrorConstants';

import { AuthLoginErrorMessageUtilities } from '@/app/frontend_auth/auth/login/auth_login_utils/AuthLoginErrorMessageUtilities';



describe('AuthLoginErrorMessageUtilities', () => {
  const translate = vi.fn((key: string) => `translated:${key}`);

  it('preserves a non-empty backend message', () => {
    const error = new AuthApiError('Backend says no', AuthErrorConstants.CODE.BACKEND_REJECTED);
    expect(AuthLoginErrorMessageUtilities.getSafeMessage(error, translate)).toBe('Backend says no');
  });

  it('uses the translated fallback for blank or unknown errors', () => {
    expect(AuthLoginErrorMessageUtilities.getSafeMessage(new AuthApiError('   ', AuthErrorConstants.CODE.UPSTREAM_UNAVAILABLE), translate)).toBe('translated:ERRORS.UNAVAILABLE');
    expect(AuthLoginErrorMessageUtilities.getSafeMessage(new Error('secret'), translate)).toBe('translated:ERRORS.UNAVAILABLE');
  });
});
