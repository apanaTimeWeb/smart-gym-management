import { describe, expect, it, vi } from 'vitest';
import { AuthIdempotencyFingerprintUtils } from '@/app/frontend_auth/auth/auth_utils/AuthIdempotencyFingerprintUtils';

describe('AuthIdempotencyFingerprintUtils', () => {
  it('changes when login credentials change but remains stable for the same normalized intent', async () => {
    const first = await AuthIdempotencyFingerprintUtils.forLogin({ email: ' Admin@Example.com ', password: 'demo123' });
    const sameIntent = await AuthIdempotencyFingerprintUtils.forLogin({ email: 'admin@example.com', password: 'demo123' });
    const changedPassword = await AuthIdempotencyFingerprintUtils.forLogin({ email: 'admin@example.com', password: 'demo124' });
    expect(first).toBe(sameIntent);
    expect(first).not.toBe(changedPassword);
  });

  it('does not depend on random generation for demo intent fingerprints', () => {
    const randomSpy = vi.spyOn(globalThis.crypto, 'randomUUID');
    expect(AuthIdempotencyFingerprintUtils.forDemoRole('ADMIN')).toBe('demo:ADMIN');
    expect(randomSpy).not.toHaveBeenCalled();
    randomSpy.mockRestore();
  });
});
