import { StatusCodes } from 'http-status-codes';

import { beforeEach, describe, expect, it, vi } from 'vitest';

import { AuthApi } from '@/app/frontend_auth/auth/auth_api/AuthApi';

import { AuthApiError } from '@/app/frontend_auth/auth/auth_api/AuthApiError';

import { AuthErrorConstants } from '@/app/frontend_auth/auth/auth_constants/AuthErrorConstants';

import { AuthResponseMessages } from '@/app/frontend_auth/auth/auth_constants/AuthResponseMessages';



const apiFetchMock = vi.fn();

vi.mock('@/lib/api', () => ({
  apiFetch: apiFetchMock,
}));

describe('AuthApi', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('surfaces the backend message without exposing token fields', async () => {
    apiFetchMock.mockResolvedValueOnce(new Response(JSON.stringify({
      success: false,
      message: AuthErrorConstants.MESSAGE.INVALID_CREDENTIALS,
      data: null,
      errorCode: AuthErrorConstants.CODE.BACKEND_REJECTED,
      statusCode: StatusCodes.UNAUTHORIZED,
    }), { status: StatusCodes.UNAUTHORIZED }));

    await expect(AuthApi.login({ email: 'wrong@example.com', password: 'wrong123' }, 'intent-2'))
      .rejects.toEqual(new AuthApiError(AuthErrorConstants.MESSAGE.INVALID_CREDENTIALS, AuthErrorConstants.CODE.BACKEND_REJECTED));
  });


  it('rejects a canonical success envelope delivered with a non-2xx HTTP response', async () => {
    apiFetchMock.mockResolvedValueOnce(new Response(JSON.stringify({
      success: true,
      message: AuthResponseMessages.LOGIN_SUCCESS,
      data: { id: 'u1', name: 'Admin', email: 'admin@example.com', role: 'ADMIN' },
    }), { status: StatusCodes.INTERNAL_SERVER_ERROR }));

    await expect(AuthApi.login({ email: 'admin@example.com', password: 'demo123' }, 'intent-status-mismatch'))
      .rejects.toMatchObject({ errorCode: AuthErrorConstants.CODE.RESPONSE_INVALID });
  });

  it('rejects a canonical error envelope delivered with a 2xx HTTP response', async () => {
    apiFetchMock.mockResolvedValueOnce(new Response(JSON.stringify({
      success: false,
      message: AuthErrorConstants.MESSAGE.INVALID_CREDENTIALS,
      data: null,
      errorCode: AuthErrorConstants.CODE.BACKEND_REJECTED,
      statusCode: StatusCodes.UNAUTHORIZED,
    }), { status: StatusCodes.OK }));

    await expect(AuthApi.login({ email: 'wrong@example.com', password: 'wrong123' }, 'intent-status-mismatch-2'))
      .rejects.toMatchObject({ errorCode: AuthErrorConstants.CODE.RESPONSE_INVALID });
  });

  it('rejects an invalid response envelope before UI consumption', async () => {
    apiFetchMock.mockResolvedValueOnce(new Response(JSON.stringify({ success: true, message: 'ok', data: { accessToken: 'secret' } }), { status: StatusCodes.OK }));

    await expect(AuthApi.login({ email: 'admin@example.com', password: 'demo123' }, 'intent-3'))
      .rejects.toBeInstanceOf(AuthApiError);
  });
  it('rejects pagination metadata on a non-paginated Auth session response', async () => {
    apiFetchMock.mockResolvedValueOnce(new Response(JSON.stringify({
      success: true,
      message: AuthResponseMessages.LOGIN_SUCCESS,
      data: { id: 'u1', name: 'Admin', email: 'admin@example.com', role: 'ADMIN' },
      meta: { total: 1, page: 1, limit: 1, totalPages: 1, hasNextPage: false, hasPrevPage: false },
    }), { status: StatusCodes.OK }));

    await expect(AuthApi.login({ email: 'admin@example.com', password: 'demo123' }, 'intent-meta-forbidden'))
      .rejects.toMatchObject({ errorCode: AuthErrorConstants.CODE.RESPONSE_INVALID });
  });

  it('rejects an invalid pagination metadata contract before UI consumption', async () => {
    apiFetchMock.mockResolvedValueOnce(new Response(JSON.stringify({
      success: true,
      message: AuthResponseMessages.LOGIN_SUCCESS,
      data: { id: 'u1', name: 'Admin', email: 'admin@example.com', role: 'ADMIN' },
      meta: { total: -1, page: 1, limit: 10, totalPages: 0, hasNextPage: false, hasPrevPage: false },
    }), { status: StatusCodes.OK }));

    await expect(AuthApi.login({ email: 'admin@example.com', password: 'demo123' }, 'intent-meta'))
      .rejects.toBeInstanceOf(AuthApiError);
  });

  it('preserves canonical backend field validation errors for inline form rendering', async () => {
    apiFetchMock.mockResolvedValueOnce(new Response(JSON.stringify({
      success: false,
      message: 'Validation failed.',
      data: null,
      errorCode: 'AUTH.LOGIN.INVALID_INPUT',
      validationErrors: [{ field: 'email', message: 'Email is already associated with another account.' }],
    }), { status: StatusCodes.BAD_REQUEST }));

    await expect(AuthApi.login({ email: 'admin@example.com', password: 'demo123' }, 'intent-validation'))
      .rejects.toMatchObject({
        errorCode: 'AUTH.LOGIN.INVALID_INPUT',
        validationErrors: [{ field: 'email', message: 'Email is already associated with another account.' }],
      });
  });

  it('rejects an error envelope without a canonical statusCode', async () => {
    apiFetchMock.mockResolvedValueOnce(new Response(JSON.stringify({
      success: false,
      message: AuthErrorConstants.MESSAGE.INVALID_CREDENTIALS,
      data: null,
      errorCode: AuthErrorConstants.CODE.BACKEND_REJECTED,
    }), { status: StatusCodes.UNAUTHORIZED }));

    await expect(AuthApi.login({ email: 'wrong@example.com', password: 'wrong123' }, 'intent-status-missing'))
      .rejects.toMatchObject({ errorCode: AuthErrorConstants.CODE.RESPONSE_INVALID });
  });

  it('rejects validationErrors on non-400 error responses', async () => {
    apiFetchMock.mockResolvedValueOnce(new Response(JSON.stringify({
      success: false,
      message: AuthErrorConstants.MESSAGE.INVALID_CREDENTIALS,
      data: null,
      statusCode: StatusCodes.UNAUTHORIZED,
      validationErrors: [{ field: 'email', message: 'Email is invalid.' }],
    }), { status: StatusCodes.UNAUTHORIZED }));

    await expect(AuthApi.login({ email: 'wrong@example.com', password: 'wrong123' }, 'intent-validation-status'))
      .rejects.toMatchObject({ errorCode: AuthErrorConstants.CODE.RESPONSE_INVALID });
  });

  it('rejects an error envelope whose statusCode does not match the HTTP response status', async () => {
    apiFetchMock.mockResolvedValueOnce(new Response(JSON.stringify({
      success: false,
      message: AuthErrorConstants.MESSAGE.INVALID_CREDENTIALS,
      data: null,
      errorCode: AuthErrorConstants.CODE.BACKEND_REJECTED,
      statusCode: StatusCodes.UNAUTHORIZED,
    }), { status: StatusCodes.FORBIDDEN }));

    await expect(AuthApi.login({ email: 'wrong@example.com', password: 'wrong123' }, 'intent-status-mismatch'))
      .rejects.toMatchObject({ errorCode: AuthErrorConstants.CODE.RESPONSE_INVALID });
  });

});

