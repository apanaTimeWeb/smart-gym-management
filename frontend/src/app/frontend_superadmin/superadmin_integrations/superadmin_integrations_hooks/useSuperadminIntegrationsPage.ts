'use client';
// DATA FLOW: API → useSuperadminIntegrationsPage.ts → SuperadminIntegrationsMain.tsx
// RESPONSIBILITY: Owns TanStack Query state for this Superadmin page.
import { useQuery } from '@tanstack/react-query';

import { fetchIntegrations } from '@/app/frontend_superadmin/superadmin_integrations/superadmin_integrations_api/SuperadminIntegrationsApiCrudApi';
import { SUPERADMIN_INTEGRATIONS_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_integrations/superadmin_integrations_constants/SuperadminIntegrationsQueryKeys';



/**
 * Purpose: Owns TanStack Query state for this Superadmin page.
 * Inputs: values defined by the exported hook signature.
 * Output: the hook's typed state/actions/query contract.
 * Side effects: remain scoped to the owning feature or approved application infrastructure.
 * Invariant: does not move feature business state into unrelated modules.
 
 * @description Owns TanStack Query state for this Superadmin page.
 * @dependencies values defined by the exported hook signature.
 * @edge-case Preserves documented loading, error, retry, repeated-action, and empty-state behavior where applicable.
 */
/**
 * @description Owns the useSuperadminIntegrationsPage responsibility within the superadmin_role feature boundary.
 * @dependencies Delegates domain behavior to the feature-local dependencies imported by this file.
 * @state Keeps server state in TanStack Query and module UI state in the owning feature state layer where applicable.
 * @edge-cases Preserves documented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 */
export function useSuperadminIntegrationsPage() { const query = useQuery({ queryKey: SUPERADMIN_INTEGRATIONS_QUERY_KEYS.overview, queryFn: fetchIntegrations }); return { data: query.data?.data ?? null, isPending: query.isPending, isError: query.isError, refetch: query.refetch }; }
