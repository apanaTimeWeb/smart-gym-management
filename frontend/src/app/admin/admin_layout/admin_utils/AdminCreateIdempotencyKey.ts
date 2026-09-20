// RESPONSIBILITY: Creates one standards-compliant idempotency key for a single confirmed Admin user intent.
// DATA FLOW: Feature confirmation → createAdminIdempotencyKey → feature API request header.
export function createAdminIdempotencyKey(): string {
  return globalThis.crypto.randomUUID();
}
