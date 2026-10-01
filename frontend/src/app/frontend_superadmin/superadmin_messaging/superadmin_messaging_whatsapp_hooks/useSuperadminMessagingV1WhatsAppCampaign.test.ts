// DATA FLOW: API / URL state / module client state → useSuperadminMessagingV1WhatsAppCampaign → superadmin_messaging view components.
import { describe, expect, it } from 'vitest';

import { useSuperadminMessagingV1WhatsAppCampaign } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_whatsapp_hooks/useSuperadminMessagingV1WhatsAppCampaign';

describe('useSuperadminMessagingV1WhatsAppCampaign', () => {
  it('exposes the owning feature contract as a callable/exported symbol', () => {
    expect(typeof useSuperadminMessagingV1WhatsAppCampaign).toBe('function');
  });
});
