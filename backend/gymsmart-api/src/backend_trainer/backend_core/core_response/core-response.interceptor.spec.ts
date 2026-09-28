// RESPONSIBILITY: Proves the canonical interceptor preserves array data and lifts pagination metadata to the envelope.
// FLOW: Jest → interceptor → handler result `{ data, meta }` → canonical ApiResponse.
import { CoreResponseInterceptor } from '@/backend_trainer/backend_core/core_response/core-response.interceptor';
import type { Reflector } from '@nestjs/core';
import type { CallHandler, ExecutionContext } from '@nestjs/common';

import { of, lastValueFrom } from 'rxjs';

test('wraps feature data/meta without nesting the response', async () => {
  const interceptor = new CoreResponseInterceptor({ getAllAndOverride: () => false } as unknown as Reflector);
  const context = { getHandler: () => undefined, getClass: () => undefined, switchToHttp: () => ({}) } as unknown as ExecutionContext;
  const handler = { handle: () => of({ data: [{ id: '1' }], meta: { total: 1, page: 1, limit: 10, totalPages: 1, hasNextPage: false, hasPrevPage: false } }) } as unknown as CallHandler;
  const result = await lastValueFrom(interceptor.intercept(context, handler));
  expect(result.data).toEqual([{ id: '1' }]);
  expect(result.meta?.total).toBe(1);
});
