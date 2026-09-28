// RESPONSIBILITY: Verifies idempotency replay preserves state, cookies, and non-2xx response status without re-executing mutations.
// FLOW: Mock request → claim/replay → captured controller result → second request → cached result + headers/status.

import { ExecutionContext, HttpStatus } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { firstValueFrom, of } from 'rxjs';
import type { Request, Response } from 'express';
import { CoreIdempotencyInterceptor } from '@/backend_trainer/backend_core/core_security/core-idempotency.interceptor';
import { CoreIdempotencyCacheService } from '@/backend_trainer/backend_core/core_security/core-idempotency-cache.service';
import { CoreRequestContext } from '@/backend_trainer/backend_core/core_context/core-request-context';
import { CORE_IDEMPOTENCY_REQUIRED } from '@/backend_trainer/backend_core/core_security/core-idempotency.decorator';

interface MockResponseState { statusCode: number; headers: Record<string, string | string[]>; }

const makeResponse = (): MockResponseState & Response => {
  const state: MockResponseState = { statusCode: HttpStatus.OK, headers: {} };
  const response = {
    statusCode: state.statusCode,
    status(code: number): Response { state.statusCode = code; response.statusCode = code; return response as Response; },
    getHeader(name: string): string | string[] | undefined { return state.headers[name.toLowerCase()]; },
    setHeader(name: string, value: string | string[]): Response { state.headers[name.toLowerCase()] = value; return response as Response; },
  } as MockResponseState & Response;
  return response;
};

describe('CoreIdempotencyInterceptor', () => {
  it('replays refresh cookies and the original accepted status without re-running the mutation', async () => {
    const store = new Map<string, string>();
    const redis = {
      client: {
        eval: jest.fn(async (_script: string, _keys: number, key: string, marker: string) => {
          if (store.has(key)) return `EXISTING:${store.get(key)}`;
          store.set(key, marker);
          return `CLAIMED:${marker}`;
        }),
        get: jest.fn(async (key: string) => store.get(key) ?? null),
        set: jest.fn(async (key: string, value: string) => { store.set(key, value); return 'OK'; }),
      },
    } as never;
    const reflector = {
      getAllAndOverride: jest.fn((metadataKey: string) => metadataKey === CORE_IDEMPOTENCY_REQUIRED ? true : 60),
    } as unknown as Reflector;
    const cache = new CoreIdempotencyCacheService(redis as never);
    const interceptor = new CoreIdempotencyInterceptor(cache, reflector);
    const response1 = makeResponse();
    response1.status(HttpStatus.ACCEPTED);
    response1.setHeader('Set-Cookie', ['refresh_token=rotated; HttpOnly', 'access_token=access; HttpOnly']);
    const request1 = { method: 'POST', baseUrl: '/api/v1/auth', path: '/refresh', body: {}, query: {}, cookies: { refresh_token: 'old-token' }, header: () => 'same-key' } as unknown as Request;
    const context1 = { getHandler: jest.fn(), getClass: jest.fn(), switchToHttp: () => ({ getRequest: () => request1, getResponse: () => response1 }) } as unknown as ExecutionContext;
    const next = { handle: jest.fn(() => of({ accessToken: 'access' })) };

    await CoreRequestContext.run({ requestId: 'req-1' }, async () => { await firstValueFrom(interceptor.intercept(context1, next)); });

    const response2 = makeResponse();
    const request2 = { ...request1 } as Request;
    const context2 = { getHandler: jest.fn(), getClass: jest.fn(), switchToHttp: () => ({ getRequest: () => request2, getResponse: () => response2 }) } as unknown as ExecutionContext;
    let replayed: unknown;
    await CoreRequestContext.run({ requestId: 'req-2' }, async () => { replayed = await firstValueFrom(interceptor.intercept(context2, next)); });

    expect(replayed).toEqual({ accessToken: 'access' });
    expect(response2.statusCode).toBe(HttpStatus.ACCEPTED);
    expect(response2.headers['set-cookie']).toEqual(['refresh_token=rotated; HttpOnly', 'access_token=access; HttpOnly']);
    expect(next.handle).toHaveBeenCalledTimes(1);
  });
});
