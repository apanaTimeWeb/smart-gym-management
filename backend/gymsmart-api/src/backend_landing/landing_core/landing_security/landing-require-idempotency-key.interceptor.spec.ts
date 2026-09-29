// RESPONSIBILITY: Proves the Rule 103 HTTP boundary rejects missing mutation idempotency keys and permits valid ones.
// FLOW: Unit test -> LandingRequireIdempotencyKeyInterceptor -> Request header -> controller handler.
import { ExecutionContext } from '@nestjs/common';

import { of } from 'rxjs';

import { LandingRequireIdempotencyKeyInterceptor } from '@/backend_landing/landing_core/landing_security/landing-require-idempotency-key.interceptor';

describe('LandingRequireIdempotencyKeyInterceptor', () => {
  const next = { handle: jest.fn(() => of({ ok: true })) };

  const context = (key?: string): ExecutionContext => ({
    switchToHttp: () => ({ getRequest: () => ({ header: () => key }) }),
  } as never);

  beforeEach(() => jest.clearAllMocks());

  it('rejects a missing key before controller execution', () => {
    const interceptor = new LandingRequireIdempotencyKeyInterceptor();
    expect(() => interceptor.intercept(context(), next)).toThrow();
    expect(next.handle).not.toHaveBeenCalled();
  });

  it('rejects an overlong key before controller execution', () => {
    const interceptor = new LandingRequireIdempotencyKeyInterceptor();
    expect(() => interceptor.intercept(context('x'.repeat(256)), next)).toThrow();
    expect(next.handle).not.toHaveBeenCalled();
  });

  it('passes a valid key to the controller handler', () => {
    const interceptor = new LandingRequireIdempotencyKeyInterceptor();
    const result = interceptor.intercept(context('valid-key'), next);
    expect(result).toBeDefined();
    expect(next.handle).toHaveBeenCalledTimes(1);
  });
});
