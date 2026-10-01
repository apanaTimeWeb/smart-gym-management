'use client';
// DATA FLOW: WhatsApp API/MSW → query state → template/audience/queue workflow → Superadmin messaging UI
// RESPONSIBILITY: Orchestrate Superadmin tenant-level WhatsApp bulk messaging mutations and query state.
import { useQuery } from '@tanstack/react-query';

import { SUPERADMIN_MESSAGING_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_query_keys/SuperadminMessagingQueryKeys';
import { fetchWhatsAppBulkCenter } from "@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_whatsapp_api/SuperadminMessagingWhatsappApi";

/**
 * Purpose: Orchestrate Superadmin tenant-level WhatsApp bulk messaging mutations and query state.
 * Inputs: values defined by the exported hook signature.
 * Output: the hook's typed state/actions/query contract.
 * Side effects: remain scoped to the owning feature or approved application infrastructure.
 * Invariant: does not move feature business state into unrelated modules.
 
 * @description Orchestrate Superadmin tenant-level WhatsApp bulk messaging mutations and query state.
 * @dependencies values defined by the exported hook signature.
 * @edge-case Preserves documented loading, error, retry, repeated-action, and empty-state behavior where applicable.
 */
export function useSuperadminMessagingV1WhatsApp() {
    return useQuery({
        queryKey: SUPERADMIN_MESSAGING_QUERY_KEYS.whatsappBulkCenter,
        queryFn: () => fetchWhatsAppBulkCenter(),
    });
}
