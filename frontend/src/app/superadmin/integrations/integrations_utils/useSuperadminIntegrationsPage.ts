// DATA FLOW: API → useSuperadminIntegrationsPage.ts → SuperadminIntegrationsClient.tsx
// RESPONSIBILITY: Owns TanStack Query state for this Superadmin page.
'use client';
import { useQuery } from '@tanstack/react-query';
import { fetchIntegrationsData } from '@/app/superadmin/integrations/integrations_api/superadmin_integrations_api';
export function useSuperadminIntegrationsPage() { const query = useQuery({ queryKey: ['superadmin', 'integrations', 'overview'], queryFn: fetchIntegrationsData }); return { data: query.data?.data ?? null, isLoading: query.isPending, isError: query.isError, refetch: query.refetch }; }
