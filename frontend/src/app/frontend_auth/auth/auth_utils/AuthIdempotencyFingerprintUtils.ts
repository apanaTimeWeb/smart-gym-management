/**
 * RESPONSIBILITY: Creates non-secret idempotency fingerprints for Auth mutation intents without storing plaintext credentials.
 * DATA FLOW: Validated Auth request -> normalized intent fields -> SHA-256 fingerprint -> module-owned idempotency registry.
 * @edge-case Password text is used only transiently to calculate the digest and is never returned, logged, or persisted.
 */
import type { AuthRole } from '@/app/frontend_auth/auth/auth_constants/AuthRoleConstants';
import type { AuthLoginCredentials } from '@/app/frontend_auth/auth/auth_types/AuthContracts';

export const AuthIdempotencyFingerprintUtils = {
  /** Creates a credential fingerprint from normalized email and password material. */
  async forLogin(credentials: AuthLoginCredentials): Promise<string> {
    const input = `${credentials.email.trim().toLowerCase()}\u0000${credentials.password}`;
    const encoded = new TextEncoder().encode(input);
    const digest = await crypto.subtle.digest('SHA-256', encoded);
    return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('');
  },

  /** Creates a stable fingerprint from the non-secret demo role. */
  forDemoRole(role: AuthRole): string {
    return `demo:${role}`;
  },
} as const;
