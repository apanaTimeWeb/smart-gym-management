// DATA FLOW: MSW/Backend → fetchJobsQueueHealth() → TanStack Query → Background Job Queue Health UI
// RESPONSIBILITY: Owns query orchestration for Background Job Queue Health. No JSX.
'use client';
import { useQuery } from '@tanstack/react-query';
import { fetchJobsQueueHealth } from '@/app/superadmin/jobs/jobs_api/SuperadminJobsQueueHealthApi';
/**
 * Purpose: Owns query orchestration for Background Job Queue Health. No JSX.
 * Inputs: values defined by the exported hook signature.
 * Output: the hook's typed state/actions/query contract.
 * Side effects: remain scoped to the owning feature or approved application infrastructure.
 * Invariant: does not move feature business state into unrelated modules.
 */
export function useSuperadminJobsV1() {
    return useQuery({ queryKey: ['superadmin', 'jobs_queue_health'], queryFn: fetchJobsQueueHealth });
}
