import { resetSuperadminTicketsMockState } from '@/app/superadmin/tickets/tickets_mocks/handlers/SuperadminTicketsMockHandlers';
import {describe, expect, it, beforeEach} from 'vitest';
import { SUPERADMIN_TICKETS_SERVICE_INSIGHTS_MOCK_FIXTURE } from '@/app/superadmin/tickets/tickets_mocks/fixtures/SuperadminTicketsV1MockFixtures';

beforeEach(() => {
  resetSuperadminTicketsMockState();
});

describe('Superadmin Tickets module fixture contract', () => {
  it('exposes non-empty module-owned demo data for frontend flows', () => {
    expect(SUPERADMIN_TICKETS_SERVICE_INSIGHTS_MOCK_FIXTURE).toBeDefined();
    const serialized = JSON.stringify(SUPERADMIN_TICKETS_SERVICE_INSIGHTS_MOCK_FIXTURE);
    expect(serialized.length).toBeGreaterThan(20);
    expect(serialized).not.toMatch(/\b(TBD|TODO|lorem ipsum|placeholder)\b/i);
  });

});
