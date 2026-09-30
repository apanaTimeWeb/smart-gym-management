/**
 * RESPONSIBILITY: Builds the Login credential Zod schema with locale-specific validation messages.
 * DATA FLOW: Login UI -> translated schema -> React Hook Form resolver -> validated Auth credentials.
 */
import { z } from 'zod';
import { AuthLoginSharedConstants } from '@/app/frontend_auth/auth/login/auth_login_constants/AuthLoginSharedConstants';

export const AuthLoginFormTranslationKeys = {
  EMAIL_INVALID: 'VALIDATION.EMAIL_INVALID',
  PASSWORD_MIN_LENGTH: 'VALIDATION.PASSWORD_MIN_LENGTH',
} as const;

export type AuthLoginFormTranslationKey =
  (typeof AuthLoginFormTranslationKeys)[keyof typeof AuthLoginFormTranslationKeys];

export type AuthLoginFormTranslator = (key: AuthLoginFormTranslationKey) => string;

/**
 * Creates the Login credential schema using the active Login locale and the centralized password length rule.
 * @param translate Translation lookup scoped to the Login feature.
 */
export const AuthLoginFormSchema = (translate: AuthLoginFormTranslator) =>
  z.object({
    email: z.string().email(translate(AuthLoginFormTranslationKeys.EMAIL_INVALID)),
    password: z.string().min(
      AuthLoginSharedConstants.PASSWORD_MIN_LENGTH,
      translate(AuthLoginFormTranslationKeys.PASSWORD_MIN_LENGTH),
    ),
  });
