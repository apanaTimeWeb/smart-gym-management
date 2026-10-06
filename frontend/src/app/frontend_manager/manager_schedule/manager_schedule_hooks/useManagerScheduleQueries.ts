'use client';
import { useQuery } from '@tanstack/react-query';
import { ManagerScheduleApi } from '@/app/frontend_manager/manager_schedule/manager_schedule_api/ManagerScheduleApi';
import { ManagerScheduleQueryKeys } from '@/app/frontend_manager/manager_schedule/manager_schedule_constants/ManagerScheduleQueryKeys';


/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description Coordinates schedule feature state and its documented UI/API boundary through useManagerScheduleQuery.
 * @dependencies Uses ManagerScheduleApi, ManagerScheduleTypes.
 * @edge-case reuses the caller-provided idempotency key for the same mutation intent; refreshes affected TanStack Query server state after successful mutations.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useManagerScheduleQuery owns the schedule feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useManagerScheduleQuery(filters: Record<string, string>) {
  return useQuery({ queryKey: ManagerScheduleQueryKeys.list(filters), queryFn: () => ManagerScheduleApi.fetchSchedule(filters).then(res => res.data) });
}

