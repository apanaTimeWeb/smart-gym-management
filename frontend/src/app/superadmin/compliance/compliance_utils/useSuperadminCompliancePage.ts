// DATA FLOW: API → useSuperadminCompliancePage.ts → SuperadminComplianceClient.tsx
// RESPONSIBILITY: Owns TanStack Query state for this Superadmin page.
'use client';
import { useQuery } from '@tanstack/react-query';
import { fetchComplianceData } from '@/app/superadmin/compliance/compliance_api/superadmin_compliance_api';
export function useSuperadminCompliancePage() { const query = useQuery({ queryKey: ['superadmin', 'compliance', 'overview'], queryFn: fetchComplianceData }); return { data: query.data?.data ?? null, isLoading: query.isPending, isError: query.isError, refetch: query.refetch }; }
