import { describe, expect, it } from 'vitest';
import { getSuperadminTicketsSlaRemainingMs } from '@/app/superadmin/tickets/tickets_utils/SuperadminTicketsSlaUtils';

describe('getSuperadminTicketsSlaRemainingMs', () => {
  it('calculates remaining time', () => {
    expect(getSuperadminTicketsSlaRemainingMs('2026-09-20T13:00:00.000Z', new Date('2026-09-20T12:00:00.000Z'))).toBe(3600000);
  });
});
