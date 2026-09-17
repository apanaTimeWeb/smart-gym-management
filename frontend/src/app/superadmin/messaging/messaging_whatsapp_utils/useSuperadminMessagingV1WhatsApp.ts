// RESPONSIBILITY: Orchestrate Superadmin tenant-level WhatsApp bulk messaging mutations and query state.
// DATA FLOW: WhatsApp API/MSW → query state → template/audience/queue workflow → Superadmin messaging UI
'use client';
import { useQuery } from '@tanstack/react-query';
import { fetchSuperadminWhatsAppBulkCenter } from '@/app/superadmin/messaging/messaging_whatsapp_api/superadmin_messaging_whatsapp_api';
export function useSuperadminMessagingV1WhatsApp() {
    return useQuery({
        queryKey: ['superadmin', 'messaging', 'whatsapp-bulk-center'],
        queryFn: fetchSuperadminWhatsAppBulkCenter,
    });
}
