import {describe, expect, it, beforeEach} from 'vitest';

import { MOCK_SUPERADMIN_BROADCASTS } from '@/app/frontend_superadmin/superadmin_broadcasts/superadmin_broadcasts_mocks/superadmin_broadcasts_mocks_fixtures/SuperadminBroadcastsMockFixtures';
import { resetSuperadminBroadcastsMockState } from '@/app/frontend_superadmin/superadmin_broadcasts/superadmin_broadcasts_mocks/superadmin_broadcasts_mocks_handlers/SuperadminBroadcastsMockHandlers';



beforeEach(() => {
  resetSuperadminBroadcastsMockState();
});

describe('Superadmin Broadcasts module fixture contract', () => {
  it('provides broadcast records with the fields consumed by list actions', () => {
    expect(Array.isArray(MOCK_SUPERADMIN_BROADCASTS)).toBe(true);
    expect(MOCK_SUPERADMIN_BROADCASTS.length).toBeGreaterThan(0);
    expect(MOCK_SUPERADMIN_BROADCASTS[0]).toBeDefined();
    expect(MOCK_SUPERADMIN_BROADCASTS.every((broadcast) => Boolean(broadcast.id && broadcast.title && broadcast.status))).toBe(true);
    expect(new Set(MOCK_SUPERADMIN_BROADCASTS.map((broadcast) => broadcast.status)).size).toBeGreaterThan(1);
  });

});
