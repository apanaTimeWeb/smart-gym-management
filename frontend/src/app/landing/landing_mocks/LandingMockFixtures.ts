// RESPONSIBILITY: Stores feature-owned mutable mock state used by Landing MSW handlers and tests.
import type { LandingMockBookingRecord, LandingMockContactRecord } from '@/app/landing/landing_types/landing_types';

const initialBookings: LandingMockBookingRecord[] = [];
const initialContacts: LandingMockContactRecord[] = [];

export const landingMockState = {
  bookings: [...initialBookings],
  contacts: [...initialContacts],
};

let landingMockSequence = 1;

/** Resets the module mock store so tests remain independent and deterministic. */
export function resetLandingMockState(): void {
  landingMockState.bookings.splice(0, landingMockState.bookings.length, ...initialBookings);
  landingMockState.contacts.splice(0, landingMockState.contacts.length, ...initialContacts);
  landingMockSequence = 1;
}

/** Creates a deterministic mock identifier for a submitted Landing record. */
export function nextLandingMockId(prefix: 'booking' | 'contact'): string {
  const id = `${prefix}-${landingMockSequence}`;
  landingMockSequence += 1;
  return id;
}
