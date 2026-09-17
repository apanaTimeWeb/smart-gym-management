// DATA FLOW: MSW/Backend → fetchInfrastructureApiHealth() → TanStack Query → Platform API Health UI
// RESPONSIBILITY: Owns query orchestration for Platform API Health. No JSX.
'use client';
import { useQuery } from '@tanstack/react-query';
import { fetchInfrastructureApiHealth } from '@/app/superadmin/infrastructure/infrastructure_api/superadmin_infrastructure_api_health_api';
export function useSuperadminInfrastructureV1() {
    return useQuery({ queryKey: ['superadmin', 'infrastructure_api_health'], queryFn: fetchInfrastructureApiHealth });
}
