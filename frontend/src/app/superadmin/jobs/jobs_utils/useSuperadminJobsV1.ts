// DATA FLOW: MSW/Backend → fetchJobsQueueHealth() → TanStack Query → Background Job Queue Health UI
// RESPONSIBILITY: Owns query orchestration for Background Job Queue Health. No JSX.
'use client';
import { useQuery } from '@tanstack/react-query';
import { fetchJobsQueueHealth } from '@/app/superadmin/jobs/jobs_api/superadmin_jobs_queue_health_api';
export function useSuperadminJobsV1() {
    return useQuery({ queryKey: ['superadmin', 'jobs_queue_health'], queryFn: fetchJobsQueueHealth });
}
