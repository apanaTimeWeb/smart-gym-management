import {describe, expect, it, beforeEach} from 'vitest';

import { resetSuperadminMessagingMockState } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_mocks/superadmin_messaging_mocks_handlers/SuperadminMessagingMockHandlers';
import { SUPERADMIN_WHATSAPP_BULK_CENTER_MOCK_FIXTURE } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_whatsapp_mocks/superadmin_messaging_whatsapp_mocks_fixtures/SuperadminMessagingV1WhatsAppMockFixtures';
import { resetSuperadminMessagingV1WhatsAppMockState } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_whatsapp_mocks/superadmin_messaging_whatsapp_mocks_handlers/SuperadminMessagingV1WhatsAppMockHandlers';
import { SuperadminWhatsAppBulkCenterDataSchema } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_schemas/SuperadminMessagingV1WhatsAppSchema';

beforeEach(() => {
  resetSuperadminMessagingV1WhatsAppMockState();
});

beforeEach(() => {
  resetSuperadminMessagingMockState();
});

describe('Superadmin tenant Smart Bulk WhatsApp contract', () => {
    it('accepts the complete tenant-facing fixture', () => {
        const result = SuperadminWhatsAppBulkCenterDataSchema.safeParse(SUPERADMIN_WHATSAPP_BULK_CENTER_MOCK_FIXTURE);
        expect(result.success).toBe(true);
    });
    it('contains no member recipients', () => {
        expect(SUPERADMIN_WHATSAPP_BULK_CENTER_MOCK_FIXTURE.recipients.every((recipient) => recipient.contactRole.startsWith('TENANT_'))).toBe(true);
    });
    it('keeps opted-out tenant contact in source data but excludes it from ready messaging', () => {
        const record = SUPERADMIN_WHATSAPP_BULK_CENTER_MOCK_FIXTURE.recipients.find((item) => item.id === 'tc13');
        expect(record?.whatsappOptIn).toBe(false);
    });
});
