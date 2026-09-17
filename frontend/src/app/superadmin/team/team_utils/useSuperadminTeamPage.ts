// DATA FLOW: API → useSuperadminTeamPage.ts → SuperadminTeamClient.tsx
// RESPONSIBILITY: Owns TanStack Query state for this Superadmin page.
'use client';
import { useQuery } from '@tanstack/react-query';
import { fetchTeamData } from '@/app/superadmin/team/team_api/superadmin_team_api';
export function useSuperadminTeamPage() { const query = useQuery({ queryKey: ['superadmin', 'team', 'overview'], queryFn: fetchTeamData }); return { data: query.data?.data ?? null, isLoading: query.isPending, isError: query.isError, refetch: query.refetch }; }
