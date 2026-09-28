// RESPONSIBILITY: Proves request context survives asynchronous execution and exposes the live scoped object.
// FLOW: Jest → CoreRequestContext.run() → awaited callback → getOptional()/get().

import { CoreRequestContext } from '@/backend_trainer/backend_core/core_context/core-request-context';

describe('CoreRequestContext', () => {
  it('preserves the same mutable context across an asynchronous boundary', async () => {
    const result = await CoreRequestContext.run({ requestId: 'req-1' }, async () => {
      const context = CoreRequestContext.get();
      context.userId = 'user-1';
      await Promise.resolve();
      context.tenantId = 'tenant-1';
      return CoreRequestContext.get();
    });

    expect(result.userId).toBe('user-1');
    expect(result.tenantId).toBe('tenant-1');
    expect(result.requestId).toBe('req-1');
  });

  it('fails closed when accessed outside a request scope', () => {
    expect(() => CoreRequestContext.get()).toThrow('CORE.REQUEST_CONTEXT.MISSING');
  });
});
