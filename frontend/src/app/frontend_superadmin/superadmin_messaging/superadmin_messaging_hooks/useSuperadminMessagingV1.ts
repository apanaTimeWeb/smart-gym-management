'use client';// DATA FLOW: MSW/Backend → fetchMessagingTemplateInsights() → TanStack Query → Message Templates & Campaign Results UI
// RESPONSIBILITY: Owns query orchestration for Message Templates & Campaign Results. No JSX.
import { useQuery } from '@tanstack/react-query';

import { superadminMessagingApi } from "@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_api/SuperadminMessagingApi";
import { SUPERADMIN_MESSAGING_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_constants/SuperadminMessagingQueryKeys';



/**
 * Purpose: Owns query orchestration for Message Templates & Campaign Results. No JSX.
 * Inputs: values defined by the exported hook signature.
 * Output: the hook's typed state/actions/query contract.
 * Side effects: remain scoped to the owning feature or approved application infrastructure.
 * Invariant: does not move feature business state into unrelated modules.
 
 * @description Owns query orchestration for Message Templates & Campaign Results. No JSX.
 * @dependencies values defined by the exported hook signature.
 * @edge-case Preserves documented loading, error, retry, repeated-action, and empty-state behavior where applicable.
 */
/**
 * @description Owns the useSuperadminMessagingV1 responsibility within the superadmin_role feature boundary.
 * @dependencies Delegates domain behavior to the feature-local dependencies imported by this file.
 * @state Keeps server state in TanStack Query and module UI state in the owning feature state layer where applicable.
 * @edge-cases Preserves documented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 */
export function useSuperadminMessagingV1() {
    return useQuery({ queryKey: SUPERADMIN_MESSAGING_QUERY_KEYS.templateInsights, queryFn: () => superadminMessagingApi.fetchMessages() });
}
