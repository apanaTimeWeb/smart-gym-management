import { describe, expect, it } from 'vitest';

import { z } from 'zod';

import { AuthValidationUtilities } from '@/app/frontend_auth/auth/auth_utils/AuthValidationUtilities';



describe('AuthValidationUtilities', () => {
  it('maps Zod issues to field-level validation errors', () => {
    const schema = z.object({ email: z.string().email(), password: z.string().min(6) });
    const result = schema.safeParse({ email: 'bad', password: 'x' });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(AuthValidationUtilities.toValidationErrors(result.error.issues)).toEqual([
        expect.objectContaining({ field: 'email' }),
        expect.objectContaining({ field: 'password' }),
      ]);
    }
  });
});
