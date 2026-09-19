// DATA FLOW: API → useSuperadminSegmentsPage.ts → SuperadminSegmentsClient.tsx
// RESPONSIBILITY: Owns TanStack Query state for this Superadmin page.
'use client';
import { useQuery } from '@tanstack/react-query';
import { fetchSegments } from '@/app/superadmin/segments/segments_api/SuperadminSegmentsApi';
/**
 * Purpose: Owns TanStack Query state for this Superadmin page.
 * Inputs: values defined by the exported hook signature.
 * Output: the hook's typed state/actions/query contract.
 * Side effects: remain scoped to the owning feature or approved application infrastructure.
 * Invariant: does not move feature business state into unrelated modules.
 */
export function useSuperadminSegmentsPage() { const query = useQuery({ queryKey: ['superadmin', 'segments', 'overview'], queryFn: fetchSegments }); return { data: query.data?.data ?? null, isPending: query.isPending, isError: query.isError, refetch: query.refetch }; }
