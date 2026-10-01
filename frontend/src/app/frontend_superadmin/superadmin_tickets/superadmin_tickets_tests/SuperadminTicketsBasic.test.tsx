// RESPONSIBILITY: Renders the SuperadminTicketsBasic.test UI for the tickets feature. Business/data orchestration is delegated to module-owned hooks.
import { beforeEach, describe, expect, it } from 'vitest';

import { SUPERADMIN_TICKETS_SERVICE_INSIGHTS_MOCK_FIXTURE } from '@/app/frontend_superadmin/superadmin_tickets/superadmin_tickets_mocks/superadmin_tickets_mocks_fixtures/SuperadminTicketsV1MockFixtures';
import { resetSuperadminTicketsMockState } from '@/app/frontend_superadmin/superadmin_tickets/superadmin_tickets_mocks/superadmin_tickets_mocks_handlers/SuperadminTicketsMockHandlers';

beforeEach(() => resetSuperadminTicketsMockState());

describe('Superadmin Tickets fixture behavior', () => {
  it('contains summary, agent, aging, and category data required by the service-insights UI', () => {
    expect(SUPERADMIN_TICKETS_SERVICE_INSIGHTS_MOCK_FIXTURE.summary).toMatchObject({ open: 42, urgent: 7, overTarget: 4 });
    expect(SUPERADMIN_TICKETS_SERVICE_INSIGHTS_MOCK_FIXTURE.agents).toHaveLength(3);
    expect(SUPERADMIN_TICKETS_SERVICE_INSIGHTS_MOCK_FIXTURE.aging).toHaveLength(4);
    expect(SUPERADMIN_TICKETS_SERVICE_INSIGHTS_MOCK_FIXTURE.categories).toHaveLength(4);
  });
});
