// RESPONSIBILITY: Proves canonical success-envelope mapping for Landing controller results.
// FLOW: Test -> LandingResponseInterceptor -> command result/envelope detection -> canonical HTTP shape.
import { Reflector } from '@nestjs/core';

import { of } from 'rxjs';

import { LandingResponseInterceptor } from '@/backend_landing/landing_core/landing_http/landing-response.interceptor';

/**
 * Intent: Prevent response-envelope drift from breaking the supplied Landing frontend contract.
 * Edge Cases: Command results must not be nested under data; already-canonical envelopes must not be double-wrapped.
 * Side Effects: None.
 * AI Notes: These tests target the actual response-mapping decision logic instead of mocking the implementation under test.
 */
describe('LandingResponseInterceptor', () => {
  const reflector = { get: jest.fn().mockReturnValue(false) } as unknown as Reflector;
  const interceptor = new LandingResponseInterceptor(reflector);
  const context = { getHandler: () => undefined } as never;

  it('maps a command result to the canonical envelope with data at the top level', (done) => {
    const next = { handle: () => of({ message: 'Created.', data: null }) };
    interceptor.intercept(context, next as never).subscribe({
      next: (value) => {
        expect(value).toEqual({ success: true, message: 'Created.', data: null });
        done();
      },
      error: done,
    });
  });

  it('does not double-wrap an already canonical envelope', (done) => {
    const canonical = { success: true, message: 'Created.', data: null };
    const next = { handle: () => of(canonical) };
    interceptor.intercept(context, next as never).subscribe({
      next: (value) => {
        expect(value).toBe(canonical);
        done();
      },
      error: done,
    });
  });
});
