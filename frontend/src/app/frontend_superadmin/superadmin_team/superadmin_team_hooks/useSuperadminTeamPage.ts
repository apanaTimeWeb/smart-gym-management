'use client';// DATA FLOW: API → useSuperadminTeamPage.ts → SuperadminTeamMain.tsx
// RESPONSIBILITY: Owns TanStack Query state for this Superadmin page.
import { useQuery } from '@tanstack/react-query';

import { fetchTeam } from '@/app/frontend_superadmin/superadmin_team/superadmin_team_api/SuperadminTeamApi';
import { SUPERADMIN_TEAM_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_team/superadmin_team_constants/SuperadminTeamQueryKeys';


/**
 * Purpose: Owns TanStack Query state for this Superadmin page.
 * Inputs: values defined by the exported hook signature.
 * Output: the hook's typed state/actions/query contract.
 * Side effects: remain scoped to the owning feature or approved application infrastructure.
 * Invariant: does not move feature business state into unrelated modules.
 */
/**
 * @description Manages team state, queries, and UI interactions for useSuperadminTeamPage.
 * @dependencies Consumes only owning-module state/API contracts and approved global infrastructure.
 * @edge-case Preserves loading, error, cancellation, retry, and repeated-action behavior.
 */
// DATA FLOW: Module API/query/store state → useSuperadminTeamPage → consuming feature component.
export function useSuperadminTeamPage() { const query = useQuery({ queryKey: SUPERADMIN_TEAM_QUERY_KEYS.overview, queryFn: fetchTeam }); return { data: query.data?.data ?? null, isPending: query.isPending, isError: query.isError, refetch: query.refetch }; }
