'use client';
// DATA FLOW: WhatsApp API/MSW → query state → template/audience/queue workflow → Superadmin messaging UI
// RESPONSIBILITY: Orchestrate Superadmin tenant-level WhatsApp bulk messaging mutations and query state.
import { useQuery } from '@tanstack/react-query';

import { SUPERADMIN_MESSAGING_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_constants/SuperadminMessagingQueryKeys';
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
/**
 * @description Owns the useSuperadminMessagingV1WhatsApp responsibility within the superadmin_role feature boundary.
 * @dependencies Delegates domain behavior to the feature-local dependencies imported by this file.
 * @state Keeps server state in TanStack Query and module UI state in the owning feature state layer where applicable.
 * @edge-cases Preserves documented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 */
export function useSuperadminMessagingV1WhatsApp() {
    return useQuery({
        queryKey: SUPERADMIN_MESSAGING_QUERY_KEYS.whatsappBulkCenter,
        queryFn: () => fetchWhatsAppBulkCenter(),
    });
}
