import { resetSuperadminMessagingMockState } from '@/app/superadmin/messaging/messaging_mocks/handlers/SuperadminMessagingMockHandlers';
import { resetSuperadminMessagingV1WhatsAppMockState } from '@/app/superadmin/messaging/messaging_whatsapp_mocks/handlers/SuperadminMessagingV1WhatsAppMockHandlers';
import {describe, expect, it, beforeEach} from 'vitest';
import { SuperadminMessagingV1DataSchema } from '@/app/superadmin/messaging/messaging_types/SuperadminMessagingV1Types';
import { SUPERADMIN_MESSAGING_TEMPLATE_INSIGHTS_MOCK_FIXTURE } from '@/app/superadmin/messaging/messaging_mocks/fixtures/SuperadminMessagingV1MockFixtures';
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
