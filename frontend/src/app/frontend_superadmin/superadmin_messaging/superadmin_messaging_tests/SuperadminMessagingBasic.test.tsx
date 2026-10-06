// RESPONSIBILITY: Renders the SuperadminMessagingBasic.test UI for the messaging feature. Business/data orchestration is delegated to module-owned hooks.
import { beforeEach, describe, expect, it } from 'vitest';

import { MOCK_SUPERADMIN_MESSAGING_MESSAGES, MOCK_SUPERADMIN_MESSAGING_TENANTS, MOCK_SUPERADMIN_NOTIFICATIONS } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_mocks/superadmin_messaging_mocks_fixtures/SuperadminMessagingMockFixtures';
import { resetSuperadminMessagingMockState } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_mocks/superadmin_messaging_mocks_handlers/SuperadminMessagingMockHandlers';



beforeEach(() => {
  resetSuperadminMessagingMockState();
});

describe('Superadmin Messaging fixture behavior', () => {
  it('contains messages, notification severity variation, and tenant records for interactive flows', () => {
    expect(MOCK_SUPERADMIN_MESSAGING_MESSAGES).toHaveLength(8);
    expect(new Set(MOCK_SUPERADMIN_MESSAGING_MESSAGES.map((message) => message.status))).toEqual(new Set(['SENT', 'SCHEDULED', 'FAILED']));
    expect(MOCK_SUPERADMIN_NOTIFICATIONS.some((notification) => notification.type === 'CRITICAL')).toBe(true);
    expect(MOCK_SUPERADMIN_MESSAGING_TENANTS).toHaveLength(8);
  });
});
