// RESPONSIBILITY: Orchestrate Superadmin tenant-level WhatsApp bulk messaging mutations and query state.
// DATA FLOW: WhatsApp API/MSW → query state → template/audience/queue workflow → Superadmin messaging UI
'use client';
import { useQuery } from '@tanstack/react-query';
import { fetchWhatsAppBulkCenter } from '@/app/superadmin/messaging/messaging_whatsapp_api/SuperadminMessagingWhatsappApi';
/**
 * Purpose: Orchestrate Superadmin tenant-level WhatsApp bulk messaging mutations and query state.
 * Inputs: values defined by the exported hook signature.
 * Output: the hook's typed state/actions/query contract.
 * Side effects: remain scoped to the owning feature or approved application infrastructure.
 * Invariant: does not move feature business state into unrelated modules.
 */
export function useSuperadminMessagingV1WhatsApp() {
    return useQuery({
        queryKey: ['superadmin', 'messaging', 'whatsapp-bulk-center'],
        queryFn: fetchWhatsAppBulkCenter,
    });
}
