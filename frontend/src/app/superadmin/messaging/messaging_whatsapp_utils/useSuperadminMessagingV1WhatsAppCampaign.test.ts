import { describe, expect, it } from 'vitest';
import { useSuperadminMessagingV1WhatsAppCampaign } from '@/app/superadmin/messaging/messaging_whatsapp_utils/useSuperadminMessagingV1WhatsAppCampaign.ts';

describe('useSuperadminMessagingV1WhatsAppCampaign', () => {
  it('exposes the owning feature contract as a callable/exported symbol', () => {
    expect(typeof useSuperadminMessagingV1WhatsAppCampaign).toBe('function');
  });
});
