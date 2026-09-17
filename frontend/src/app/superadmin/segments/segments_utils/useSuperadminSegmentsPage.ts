// DATA FLOW: API → useSuperadminSegmentsPage.ts → SuperadminSegmentsClient.tsx
// RESPONSIBILITY: Owns TanStack Query state for this Superadmin page.
'use client';
import { useQuery } from '@tanstack/react-query';
import { fetchSegmentsData } from '@/app/superadmin/segments/segments_api/superadmin_segments_api';
export function useSuperadminSegmentsPage() { const query = useQuery({ queryKey: ['superadmin', 'segments', 'overview'], queryFn: fetchSegmentsData }); return { data: query.data?.data ?? null, isLoading: query.isPending, isError: query.isError, refetch: query.refetch }; }
