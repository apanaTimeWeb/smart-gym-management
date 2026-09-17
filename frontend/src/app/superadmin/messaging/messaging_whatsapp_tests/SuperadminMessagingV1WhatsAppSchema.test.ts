import { describe, expect, it } from 'vitest';
import { SUPERADMIN_WHATSAPP_BULK_CENTER_MOCK_FIXTURE } from '@/app/superadmin/messaging/messaging_whatsapp_mocks/fixtures/SuperadminMessagingV1WhatsAppMockFixtures';
import { SuperadminWhatsAppBulkCenterDataSchema } from '@/app/superadmin/messaging/messaging_whatsapp_types/SuperadminMessagingV1WhatsAppTypes';
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
