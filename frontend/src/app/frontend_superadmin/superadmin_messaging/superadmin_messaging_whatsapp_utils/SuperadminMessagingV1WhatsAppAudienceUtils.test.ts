import { describe, expect, it } from 'vitest';

import { getEligibleWhatsAppRecipients, getUniqueWhatsAppTenants, isWhatsAppRecipientReady, matchesWhatsAppAudience } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_whatsapp_utils/SuperadminMessagingV1WhatsAppAudienceUtils';



const ready = { id: '1', phone: '+91 9876543210', whatsappOptIn: true, contactRole: 'TENANT_ADMIN', audienceKey: 'A', tenantId: 'T1', tenantName: 'Alpha' } as never;
const notReady = { ...ready, id: '2', phone: '123', whatsappOptIn: false, tenantId: 'T2', tenantName: 'Beta' } as never;

describe('SuperadminMessagingV1WhatsAppAudienceUtils', () => {
  it('filters recipients by readiness, audience, and tenant', () => {
    expect(isWhatsAppRecipientReady(ready)).toBe(true);
    expect(matchesWhatsAppAudience(ready, 'ALL_TENANT_ADMINS')).toBe(true);
    expect(getEligibleWhatsAppRecipients([ready, notReady], 'A', 'T1')).toEqual([ready]);
    expect(getUniqueWhatsAppTenants([ready, notReady])).toHaveLength(2);
  });
});
