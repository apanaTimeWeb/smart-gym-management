// RESPONSIBILITY: Stores feature-owned mutable mock state and processed idempotency keys used by PublicLanding MSW handlers and tests.
import type { PublicLandingMockBookingRecord, PublicLandingMockContactRecord } from '@/app/frontend_public/landing/landing_types/PublicLandingTypes';

const initialBookings: PublicLandingMockBookingRecord[] = [];
const initialContacts: PublicLandingMockContactRecord[] = [];
const processedPublicLandingMutationKeys = new Set<string>();

export const landingMockState = { bookings: [...initialBookings], contacts: [...initialContacts] };

let landingMockSequence = 1;

/** Resets all module mock records and idempotency history so tests remain independent. */
export function resetPublicLandingMockState(): void {
  landingMockState.bookings.splice(0, landingMockState.bookings.length, ...initialBookings);
  landingMockState.contacts.splice(0, landingMockState.contacts.length, ...initialContacts);
  processedPublicLandingMutationKeys.clear();
  landingMockSequence = 1;
}

/** Returns whether a user-intent idempotency key has already been accepted by the mock service. */
export function hasPublicLandingMutationKey(key: string): boolean { return processedPublicLandingMutationKeys.has(key); }
/** Records an accepted user-intent idempotency key so retries cannot create duplicates. */
export function rememberPublicLandingMutationKey(key: string): void { processedPublicLandingMutationKeys.add(key); }
/** Creates a deterministic mock identifier for a submitted PublicLanding record. */
export function nextPublicLandingMockId(prefix: 'booking' | 'contact'): string { const id = `${prefix}-${landingMockSequence}`; landingMockSequence += 1; return id; }
