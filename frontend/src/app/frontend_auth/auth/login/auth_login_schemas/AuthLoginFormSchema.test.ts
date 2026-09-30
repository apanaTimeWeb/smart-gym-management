import { describe, expect, it } from 'vitest';
import { AuthLoginFormSchema, AuthLoginFormTranslationKeys } from '@/app/frontend_auth/auth/login/auth_login_schemas/AuthLoginFormSchema';

describe('AuthLoginFormSchema', () => {
  it('uses translated validation messages and blocks invalid credentials', () => {
    const schema = AuthLoginFormSchema((key) => ({
      [AuthLoginFormTranslationKeys.EMAIL_INVALID]: 'Translated email error',
      [AuthLoginFormTranslationKeys.PASSWORD_MIN_LENGTH]: 'Translated password error',
    }[key]));

    const parsed = schema.safeParse({ email: 'bad', password: '123' });
    expect(parsed.success).toBe(false);
    if (!parsed.success) {
      expect(parsed.error.issues.map((issue) => issue.message)).toEqual([
        'Translated email error',
        'Translated password error',
      ]);
    }
  });
});
