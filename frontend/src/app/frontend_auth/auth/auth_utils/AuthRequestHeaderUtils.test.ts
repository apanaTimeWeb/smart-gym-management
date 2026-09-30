import { describe, expect, it } from 'vitest';
import { AuthRequestHeaderUtils } from '@/app/frontend_auth/auth/auth_utils/AuthRequestHeaderUtils';

describe('AuthRequestHeaderUtils', () => {
  it('normalizes an idempotency key and ignores blank values', () => {
    const request = new Request('https://example.test/auth', { headers: { 'Idempotency-Key': '  intent-1  ' } });
    expect(AuthRequestHeaderUtils.getIdempotencyKey(request as never)).toBe('intent-1');

    const blankRequest = new Request('https://example.test/auth', { headers: { 'Idempotency-Key': '   ' } });
    expect(AuthRequestHeaderUtils.getIdempotencyKey(blankRequest as never)).toBeNull();
  });
});
