import {describe, expect, it, beforeEach} from 'vitest';

import { resetSuperadminMessagingMockState } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_mocks/superadmin_messaging_mocks_handlers/SuperadminMessagingMockHandlers';
import { SUPERADMIN_WHATSAPP_BULK_CENTER_MOCK_FIXTURE } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_whatsapp_mocks/superadmin_messaging_whatsapp_mocks_fixtures/SuperadminMessagingV1WhatsAppMockFixtures';
import { resetSuperadminMessagingV1WhatsAppMockState } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_whatsapp_mocks/superadmin_messaging_whatsapp_mocks_handlers/SuperadminMessagingV1WhatsAppMockHandlers';
import { buildWhatsAppLink, getWhatsAppAudienceCount, isWhatsAppRecipientReady, replaceWhatsAppVariables } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_whatsapp_utils/SuperadminMessagingV1WhatsAppUtils';

beforeEach(() => {
  resetSuperadminMessagingV1WhatsAppMockState();
});

beforeEach(() => {
  resetSuperadminMessagingMockState();
});

describe('Superadmin tenant WhatsApp free workflow utilities', () => {
    const subscriptionRecipient = SUPERADMIN_WHATSAPP_BULK_CENTER_MOCK_FIXTURE.recipients[0]!;
    it('personalizes tenant contact and platform lifecycle fields with explicit fallbacks', () => {
        const message = replaceWhatsAppVariables('Hi {contact_name}, {tenant_name}, {contact_role}, {plan_name}, {subscription_amount}, {invoice_number}, {due_date}, {dashboard_link}', subscriptionRecipient);
        expect(message).toContain('Rahul Mehta');
        expect(message).toContain('Iron Paradise');
        expect(message).toContain('Owner');
        expect(message).toContain('Growth');
        expect(message).toContain('₹7,999.00');
        expect(message).toContain('INV-T1-0926');
        expect(message).toContain('2026-09-20');
        expect(message).toContain('https://app.example.com/t1');
        const partial = SUPERADMIN_WHATSAPP_BULK_CENTER_MOCK_FIXTURE.recipients[10]!;
        expect(replaceWhatsAppVariables('{due_date}|{invoice_number}|{support_link}', partial)).toBe('—|INV-T6-0926|https://support.example.com/t6');
    });
    it('filters only tenant contacts, scopes by gym, and respects WhatsApp opt-in', () => {
        expect(buildWhatsAppLink('+91 98101 00001', 'Hi Rahul')).toBe('https://wa.me/919810100001?text=Hi%20Rahul');
        expect(getWhatsAppAudienceCount(SUPERADMIN_WHATSAPP_BULK_CENTER_MOCK_FIXTURE.recipients, 'ALL_TENANT_CONTACTS', 'ALL_TENANTS')).toBe(14);
        expect(getWhatsAppAudienceCount(SUPERADMIN_WHATSAPP_BULK_CENTER_MOCK_FIXTURE.recipients, 'SUBSCRIPTION_DUE', 'ALL_TENANTS')).toBe(2);
        expect(getWhatsAppAudienceCount(SUPERADMIN_WHATSAPP_BULK_CENTER_MOCK_FIXTURE.recipients, 'ALL_TENANT_ADMINS', 't8')).toBe(2);
        expect(getWhatsAppAudienceCount(SUPERADMIN_WHATSAPP_BULK_CENTER_MOCK_FIXTURE.recipients, 'ALL_TENANT_CONTACTS', 't7')).toBe(0);
        expect(isWhatsAppRecipientReady(SUPERADMIN_WHATSAPP_BULK_CENTER_MOCK_FIXTURE.recipients[12]!)).toBe(false);
    });
});
