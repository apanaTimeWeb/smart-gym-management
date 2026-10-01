import { AuthMockFixtures } from '@/app/frontend_auth/auth/auth_mocks/auth_mock_fixtures/AuthMockFixtures';

import { AuthMockTokenConstants } from '@/app/frontend_auth/auth/auth_mocks/auth_mock_fixtures/AuthMockTokenConstants';

import type { AuthRole } from '@/app/frontend_auth/auth/auth_types/AuthContracts';

import type { AuthUser } from '@/app/frontend_auth/auth/auth_types/AuthContracts';

import type { AuthMockDemoEntry, AuthMockIdempotencyRecord, AuthMockRefreshIdempotencyRecord, AuthMockSession, AuthMockSessionCredentials } from '@/app/frontend_auth/auth/auth_types/AuthMockTypes';

// RESPONSIBILITY: Owns mutable in-memory Auth demo sessions, refresh rotation, logout revocation, and idempotency replay state for module-owned mocks.

const AUTH_DEMO_ENTRIES: readonly AuthMockDemoEntry[] = Object.values(AuthMockFixtures.USERS);
const AUTH_MOCK_SESSIONS = new Map<string, AuthMockSession>();
const AUTH_MOCK_REFRESH_INDEX = new Map<string, string>();
const AUTH_MOCK_LOGIN_IDEMPOTENCY = new Map<string, AuthMockIdempotencyRecord>();
const AUTH_MOCK_REFRESH_IDEMPOTENCY = new Map<string, AuthMockRefreshIdempotencyRecord>();

/**
 * Creates a unique in-memory mock token with a fixture-only prefix.
 * @description Provides deterministic token shape for tests without using real credentials.
 * @dependencies Web Crypto randomUUID and AuthMockTokenConstants.
 * @edge-case These tokens are session-test material only and must never be treated as production authentication credentials.
 */
function createMockToken(prefix: typeof AuthMockTokenConstants.ACCESS_PREFIX | typeof AuthMockTokenConstants.REFRESH_PREFIX): string {
  return `${prefix}_${crypto.randomUUID()}`;
}

export const AuthMockFixturesApi = {
  /** Looks up a demo user by normalized email and exact password. */
  findByCredentials(email: string, password: string): AuthUser | null {
    const candidate = AUTH_DEMO_ENTRIES.find((entry) => entry.user.email.toLowerCase() === email.trim().toLowerCase() && entry.password === password);
    return candidate?.user ?? null;
  },

  /** Returns the demo entry for a supported role. */
  findByRole(role: AuthRole): AuthMockDemoEntry {
    const entry = AuthMockFixtures.USERS[role];
    if (!entry) throw new Error('Unsupported demo role');
    return entry;
  },

  /** Issues and registers a fresh mutable mock session. */
  issueSession(user: AuthUser): AuthMockSessionCredentials {
    const accessToken = createMockToken(AuthMockTokenConstants.ACCESS_PREFIX);
    const refreshToken = createMockToken(AuthMockTokenConstants.REFRESH_PREFIX);
    const session = { user, refreshToken };
    AUTH_MOCK_SESSIONS.set(accessToken, session);
    AUTH_MOCK_REFRESH_INDEX.set(refreshToken, accessToken);
    return { accessToken, refreshToken, user };
  },

  /** Issues or replays one login result for a specific idempotent user intent. */
  issueSessionForIntent(user: AuthUser, idempotencyKey: string, fingerprint: string): AuthMockSessionCredentials | null {
    const existing = AUTH_MOCK_LOGIN_IDEMPOTENCY.get(idempotencyKey);
    if (existing) return existing.fingerprint === fingerprint ? existing.session : null;
    const session = this.issueSession(user);
    AUTH_MOCK_LOGIN_IDEMPOTENCY.set(idempotencyKey, { fingerprint, session });
    return session;
  },

  /** Resolves a mock user from an active access token. */
  resolveUserByAccessToken(accessToken: string): AuthUser | null {
    return AUTH_MOCK_SESSIONS.get(accessToken)?.user ?? null;
  },

  /** Returns whether a refresh idempotency key is bound to a different refresh-token intent. */
  isRefreshIdempotencyConflict(idempotencyKey: string, refreshToken: string): boolean {
    const replay = AUTH_MOCK_REFRESH_IDEMPOTENCY.get(idempotencyKey);
    return Boolean(replay && replay.fingerprint !== refreshToken);
  },

  /** Refreshes a mock session and replays the same credentials for the same idempotent refresh intent. */
  refreshSession(refreshToken: string, idempotencyKey?: string): { accessToken: string; refreshToken: string } | null {
    if (idempotencyKey) {
      const replay = AUTH_MOCK_REFRESH_IDEMPOTENCY.get(idempotencyKey);
      if (replay) return replay.fingerprint === refreshToken ? replay.tokens : null;
    }
    const currentAccessToken = AUTH_MOCK_REFRESH_INDEX.get(refreshToken);
    if (!currentAccessToken) return null;
    const currentSession = AUTH_MOCK_SESSIONS.get(currentAccessToken);
    if (!currentSession) return null;
    const nextAccessToken = createMockToken(AuthMockTokenConstants.ACCESS_PREFIX);
    AUTH_MOCK_SESSIONS.delete(currentAccessToken);
    AUTH_MOCK_SESSIONS.set(nextAccessToken, currentSession);
    AUTH_MOCK_REFRESH_INDEX.set(refreshToken, nextAccessToken);
    const tokens = { accessToken: nextAccessToken, refreshToken };
    if (idempotencyKey) AUTH_MOCK_REFRESH_IDEMPOTENCY.set(idempotencyKey, { fingerprint: refreshToken, tokens });
    return tokens;
  },

  /** Revokes a mock session and removes related idempotency records. */
  revokeSession(accessToken: string | undefined, refreshToken: string | undefined): void {
    const revokedAccessTokens = new Set<string>();
    if (accessToken) {
      const session = AUTH_MOCK_SESSIONS.get(accessToken);
      AUTH_MOCK_SESSIONS.delete(accessToken);
      revokedAccessTokens.add(accessToken);
      if (session) AUTH_MOCK_REFRESH_INDEX.delete(session.refreshToken);
    }
    if (refreshToken) {
      const indexedAccessToken = AUTH_MOCK_REFRESH_INDEX.get(refreshToken);
      AUTH_MOCK_REFRESH_INDEX.delete(refreshToken);
      if (indexedAccessToken) {
        AUTH_MOCK_SESSIONS.delete(indexedAccessToken);
        revokedAccessTokens.add(indexedAccessToken);
      }
    }
    for (const [key, record] of AUTH_MOCK_LOGIN_IDEMPOTENCY.entries()) {
      if (revokedAccessTokens.has(record.session.accessToken)) AUTH_MOCK_LOGIN_IDEMPOTENCY.delete(key);
    }
    for (const [key, record] of AUTH_MOCK_REFRESH_IDEMPOTENCY.entries()) {
      if (revokedAccessTokens.has(record.tokens.accessToken)) AUTH_MOCK_REFRESH_IDEMPOTENCY.delete(key);
    }
  },

  /** Resets all mutable Auth mock state for deterministic test isolation. */
  resetMockSessions(): void {
    AUTH_MOCK_SESSIONS.clear();
    AUTH_MOCK_REFRESH_INDEX.clear();
    AUTH_MOCK_LOGIN_IDEMPOTENCY.clear();
    AUTH_MOCK_REFRESH_IDEMPOTENCY.clear();
  },
} as const;
