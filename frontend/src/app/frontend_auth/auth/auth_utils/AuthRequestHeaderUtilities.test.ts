import { describe, expect, it } from 'vitest';

import { AuthRequestHeaderUtilities } from '@/app/frontend_auth/auth/auth_utils/AuthRequestHeaderUtilities';



describe('AuthRequestHeaderUtilities', () => {
  it('normalizes an idempotency key and ignores blank values', () => {
    const request = new Request('https://example.test/auth', { headers: { 'Idempotency-Key': '  intent-1  ' } });
    expect(AuthRequestHeaderUtilities.getIdempotencyKey(request)).toBe('intent-1');

    const blankRequest = new Request('https://example.test/auth', { headers: { 'Idempotency-Key': '   ' } });
    expect(AuthRequestHeaderUtilities.getIdempotencyKey(blankRequest)).toBeNull();
  });
});
