import { StatusCodes } from 'http-status-codes';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { AuthBackendTransport } from '@/app/frontend_auth/auth/auth_api/AuthBackendTransport';
import { AuthUrlConfig } from '@/app/frontend_auth/auth/auth_url_config';
import { AuthSessionConstants } from '@/app/frontend_auth/auth/auth_constants/AuthSessionConstants';

vi.mock('@/config/env', () => ({
  env: { NEXT_PUBLIC_API_URL: 'https://api.example.com' },
}));

describe('AuthBackendTransport', () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    vi.stubGlobal('fetch', fetchMock);
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('constructs a no-store POST request using the provided endpoint and headers', async () => {
    fetchMock.mockResolvedValueOnce(new Response(JSON.stringify({ success: true, message: 'ok', data: null }), { status: StatusCodes.OK }));

    const result = await AuthBackendTransport.post(AuthUrlConfig.BACKEND_API.LOGIN, { email: 'a@example.com' }, { [AuthSessionConstants.HEADERS.IDEMPOTENCY_KEY]: 'intent-1' });

    expect(fetchMock).toHaveBeenCalledWith('https://api.example.com/auth/login', {
      method: 'POST',
      headers: {
        [AuthSessionConstants.HEADERS.CONTENT_TYPE]: AuthSessionConstants.HEADERS.CONTENT_TYPE_JSON,
        [AuthSessionConstants.HEADERS.IDEMPOTENCY_KEY]: 'intent-1',
      },
      body: JSON.stringify({ email: 'a@example.com' }),
      cache: 'no-store',
    });
    expect(result.response.status).toBe(StatusCodes.OK);
    expect(result.payload).toEqual({ success: true, message: 'ok', data: null });
  });

  it('returns null payload when the upstream response is not JSON', async () => {
    fetchMock.mockResolvedValueOnce(new Response('not-json', { status: StatusCodes.BAD_GATEWAY }));

    const result = await AuthBackendTransport.get(AuthUrlConfig.BACKEND_API.ME);

    expect(result.payload).toBeNull();
  });
});
