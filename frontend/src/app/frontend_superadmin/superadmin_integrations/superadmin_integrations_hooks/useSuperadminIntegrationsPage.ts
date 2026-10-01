'use client';
// DATA FLOW: API → useSuperadminIntegrationsPage.ts → SuperadminIntegrationsMain.tsx
// RESPONSIBILITY: Owns TanStack Query state for this Superadmin page.
import { useQuery } from '@tanstack/react-query';

import { SUPERADMIN_INTEGRATIONS_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_integrations/superadmin_integrations_query_keys/SuperadminIntegrationsQueryKeys';
import { fetchIntegrations } from '@/app/frontend_superadmin/superadmin_integrations/superadmin_integrations_api/SuperadminIntegrationsApiCrudApi';

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
export function useSuperadminIntegrationsPage() { const query = useQuery({ queryKey: SUPERADMIN_INTEGRATIONS_QUERY_KEYS.overview, queryFn: fetchIntegrations }); return { data: query.data?.data ?? null, isPending: query.isPending, isError: query.isError, refetch: query.refetch }; }
