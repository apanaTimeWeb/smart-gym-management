/**
 * Provides the browser sessionStorage backend for the Gyms module's persisted ghost-login state.
 * Browser access is isolated here instead of being performed directly inside React components or stores.
 */
/**
 * @description Provides gyms formatting or feature utility behavior for getSuperadminGymsSessionStorage.
 * @dependencies Pure or module-local utility with no UI rendering or API transport ownership.
 * @edge-case Returns deterministic output for nullable or boundary values handled by the utility contract.
 */
export function getSuperadminGymsSessionStorage(): Storage {
  return sessionStorage;
}
