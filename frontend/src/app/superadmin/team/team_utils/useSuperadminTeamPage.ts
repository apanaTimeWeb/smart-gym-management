// DATA FLOW: API → useSuperadminTeamPage.ts → SuperadminTeamClient.tsx
// RESPONSIBILITY: Owns TanStack Query state for this Superadmin page.
'use client';
import { useQuery } from '@tanstack/react-query';
import { fetchTeam } from '@/app/superadmin/team/team_api/SuperadminTeamApi';
/**
 * Purpose: Owns TanStack Query state for this Superadmin page.
 * Inputs: values defined by the exported hook signature.
 * Output: the hook's typed state/actions/query contract.
 * Side effects: remain scoped to the owning feature or approved application infrastructure.
 * Invariant: does not move feature business state into unrelated modules.
 */
export function useSuperadminTeamPage() { const query = useQuery({ queryKey: ['superadmin', 'team', 'overview'], queryFn: fetchTeam }); return { data: query.data?.data ?? null, isPending: query.isPending, isError: query.isError, refetch: query.refetch }; }
