'use client';
// DATA FLOW: MSW/Backend → fetchJobs() → TanStack Query → Background Job Queue Health UI
// RESPONSIBILITY: Owns query orchestration for Background Job Queue Health. No JSX.
import { useQuery } from '@tanstack/react-query';

import { jobsApi } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_jobs/superadmin_system_ops_jobs_api/SuperadminSystemOpsJobsApi';
import { SUPERADMIN_JOBS_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_jobs/superadmin_system_ops_jobs_constants/SuperadminSystemOpsJobsQueryKeys';



/**
 * Purpose: Owns query orchestration for Background Job Queue Health. No JSX.
 * Inputs: values defined by the exported hook signature.
 * Output: the hook's typed state/actions/query contract.
 * Side effects: remain scoped to the owning feature or approved application infrastructure.
 * Invariant: does not move feature business state into unrelated modules.
 
 * @description Owns query orchestration for Background Job Queue Health. No JSX.
 * @dependencies values defined by the exported hook signature.
 * @edge-case Preserves documented loading, error, retry, repeated-action, and empty-state behavior where applicable.
 */
/**
 * @description Owns the useSuperadminSystemOpsJobsV1 responsibility within the superadmin_role feature boundary.
 * @dependencies Delegates domain behavior to the feature-local dependencies imported by this file.
 * @state Keeps server state in TanStack Query and module UI state in the owning feature state layer where applicable.
 * @edge-cases Preserves documented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 */
export function useSuperadminSystemOpsJobsV1() {
    return useQuery({ queryKey: SUPERADMIN_JOBS_QUERY_KEYS.queueHealth, queryFn: () => jobsApi.fetchJobs() });
}
