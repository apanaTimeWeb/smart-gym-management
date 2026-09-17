// DATA FLOW: API → useSuperadminOffboardingPage.ts → SuperadminOffboardingClient.tsx
// RESPONSIBILITY: Owns TanStack Query state for this Superadmin page.
'use client';
import { useQuery } from '@tanstack/react-query';
import { fetchOffboardingData } from '@/app/superadmin/offboarding/offboarding_api/superadmin_offboarding_api';
export function useSuperadminOffboardingPage() { const query = useQuery({ queryKey: ['superadmin', 'offboarding', 'overview'], queryFn: fetchOffboardingData }); return { data: query.data?.data ?? null, isLoading: query.isPending, isError: query.isError, refetch: query.refetch }; }
