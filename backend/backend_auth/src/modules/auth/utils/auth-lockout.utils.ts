// RESPONSIBILITY: Generates privacy-preserving Redis keys for Auth brute-force lockout state.
// FLOW: AuthLoginService -> AuthLockoutUtils -> SHA-256 fingerprint -> Redis.

import { createHash } from 'node:crypto';

import { AuthConstants } from '@/modules/auth/auth.constants';
export class AuthLockoutUtils {
  /** @description Creates the Redis account-lock key from a normalized email without storing the email itself. @param email - Normalized email address. @returns Hashed Redis lock key. */
  static lockoutKey(email: string): string { return `${AuthConstants.LOCKOUT.KEY_PREFIX}${this.emailFingerprint(email)}`; }

  /** @description Creates the Redis failed-attempt key from a normalized email without storing the email itself. @param email - Normalized email address. @returns Hashed Redis attempt key. */
  static attemptKey(email: string): string { return `${AuthConstants.LOCKOUT.ATTEMPT_KEY_PREFIX}${this.emailFingerprint(email)}`; }

  /** @description Creates a deterministic SHA-256 fingerprint for Redis security keys. @param email - Normalized email address. @returns Hex SHA-256 digest. */
  static emailFingerprint(email: string): string { return createHash('sha256').update(email.trim().toLowerCase(), 'utf8').digest('hex'); }
}
