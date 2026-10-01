import {describe, expect, it, beforeEach} from 'vitest';

import { SUPERADMIN_MESSAGING_TEMPLATE_INSIGHTS_MOCK_FIXTURE } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_mocks/superadmin_messaging_mocks_fixtures/SuperadminMessagingV1MockFixtures';
import { resetSuperadminMessagingMockState } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_mocks/superadmin_messaging_mocks_handlers/SuperadminMessagingMockHandlers';
import { SuperadminMessagingV1DataSchema } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_schemas/SuperadminMessagingV1Schema';
import { resetSuperadminMessagingV1WhatsAppMockState } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_whatsapp_mocks/superadmin_messaging_whatsapp_mocks_handlers/SuperadminMessagingV1WhatsAppMockHandlers';

beforeEach(() => {
  resetSuperadminMessagingV1WhatsAppMockState();
});

beforeEach(() => {
  resetSuperadminMessagingMockState();
});

describe('Message Templates & Campaign Results contract', () => {
    it('accepts the complete module fixture', () => {
        const result = SuperadminMessagingV1DataSchema.safeParse(SUPERADMIN_MESSAGING_TEMPLATE_INSIGHTS_MOCK_FIXTURE);
        expect(result.success).toBe(true);
    });
});
