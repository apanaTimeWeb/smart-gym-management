import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { createWhatsAppCampaign } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_whatsapp_api/SuperadminMessagingWhatsappApi';
import { useSuperadminMessagingV1WhatsAppCampaign } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_whatsapp_hooks/useSuperadminMessagingV1WhatsAppCampaign';

import type { ReactNode } from 'react';



vi.mock('@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_whatsapp_api/SuperadminMessagingWhatsappApi', () => ({ createWhatsAppCampaign: vi.fn() }));

describe('useSuperadminMessagingV1WhatsAppCampaign', () => {
  it('validates and forwards a campaign payload through the WhatsApp API', async () => {
    vi.mocked(createWhatsAppCampaign).mockResolvedValue({ success: true, message: 'Created', data: { id: 'campaign-1' } } as never);
    const client = new QueryClient({ defaultOptions: { mutations: { retry: false } } });
    const wrapper = ({ children }: { children: ReactNode }) => <QueryClientProvider client={client}>{children}</QueryClientProvider>;
    const { result } = renderHook(() => useSuperadminMessagingV1WhatsAppCampaign(), { wrapper });
    const payload = { tenantId: 'tenant-1', title: 'Renewal' };
    await result.current.createCampaign(payload);
    expect(createWhatsAppCampaign).toHaveBeenCalledWith(expect.objectContaining(payload), expect.any(String));
  });
});
