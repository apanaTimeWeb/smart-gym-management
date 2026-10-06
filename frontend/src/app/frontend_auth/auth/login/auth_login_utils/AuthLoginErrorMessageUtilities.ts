/**
 * Maps unknown Login failures to a user-safe translated message without exposing raw transport details.
 * @description Preserves the standardized backend message when it is safe and available, otherwise uses the Login translation contract.
 * @dependencies AuthApiError and Login translation-key types.
 * @edge-case Empty or non-Auth errors never surface internal stack/transport details.
 */
import { AuthApiError } from '@/app/frontend_auth/auth/auth_api/AuthApiError';

import { AuthLoginFormTranslationKeys } from '@/app/frontend_auth/auth/login/auth_login_constants/AuthLoginConstants';

import type { AuthLoginFormTranslator } from '@/app/frontend_auth/auth/login/auth_login_types/AuthLoginTypes';



export const AuthLoginErrorMessageUtilities = {
  /**
   * Converts an Auth mutation failure into a safe user-visible message.
   * @param error Unknown mutation failure received from the Login mutation boundary.
   * @param translate Active Login translation function used for the unavailable fallback.
   * @description Preserves the canonical backend message when the Auth API explicitly supplies one and otherwise uses the localized safe fallback.
   * @edge-case Malformed or non-Auth errors never expose raw exception objects to the UI.
   */
  getSafeMessage(error: unknown, translate: AuthLoginFormTranslator): string {
    if (error instanceof AuthApiError && error.message.trim().length > 0) return error.message;
    return translate(AuthLoginFormTranslationKeys.ERROR_UNAVAILABLE);
  },
} as const;
