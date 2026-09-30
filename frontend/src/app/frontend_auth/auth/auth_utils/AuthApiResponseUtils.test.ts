import { StatusCodes } from 'http-status-codes';
import { describe, expect, it } from 'vitest';
import { AuthApiResponseUtils } from '@/app/frontend_auth/auth/auth_utils/AuthApiResponseUtils';
describe('AuthApiResponseUtils', () => {
  it('creates a canonical successful envelope', async () => {
    const response = AuthApiResponseUtils.success('ok', { id: 'u1' });
    expect(response.status).toBe(StatusCodes.OK);
    await expect(response.json()).resolves.toEqual({ success: true, message: 'ok', data: { id: 'u1' } });
  });

  it('creates a canonical failure envelope with validation errors when supplied', async () => {
    const response = AuthApiResponseUtils.failure('invalid', StatusCodes.BAD_REQUEST, 'VALIDATION_ERROR', 'AUTH.TEST.INVALID', [
      { field: 'email', message: 'Invalid email' },
    ]);
    expect(response.status).toBe(StatusCodes.BAD_REQUEST);
    await expect(response.json()).resolves.toEqual({
      success: false,
      message: 'invalid',
      data: null,
      error: 'VALIDATION_ERROR',
      errorCode: 'AUTH.TEST.INVALID',
      statusCode: StatusCodes.BAD_REQUEST,
      validationErrors: [{ field: 'email', message: 'Invalid email' }],
    });
  });
});
