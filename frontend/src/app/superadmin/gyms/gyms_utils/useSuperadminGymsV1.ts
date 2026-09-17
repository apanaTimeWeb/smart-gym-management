// DATA FLOW: MSW/Backend → fetchGymsBusinessControls() → TanStack Query → Tenant Growth & Bulk Controls UI
// RESPONSIBILITY: Owns query orchestration for Tenant Growth & Bulk Controls. No JSX.
'use client';
import { useQuery } from '@tanstack/react-query';
import { fetchGymsBusinessControls } from '@/app/superadmin/gyms/gyms_api/superadmin_gyms_business_controls_api';
export function useSuperadminGymsV1() {
    return useQuery({ queryKey: ['superadmin', 'gyms_business_controls'], queryFn: fetchGymsBusinessControls });
}
