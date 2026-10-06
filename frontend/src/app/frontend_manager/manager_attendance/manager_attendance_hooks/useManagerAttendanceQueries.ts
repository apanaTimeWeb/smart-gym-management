'use client';
import { useQuery } from '@tanstack/react-query';
import { ManagerAttendanceApi } from '@/app/frontend_manager/manager_attendance/manager_attendance_api/ManagerAttendanceApi';
import { ManagerAttendanceQueryKeys } from '@/app/frontend_manager/manager_attendance/manager_attendance_constants/ManagerAttendanceQueryKeys';
import type { ManagerAttendancePersonType } from '@/app/frontend_manager/manager_attendance/manager_attendance_types/ManagerAttendanceTypes';


/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description Coordinates attendance feature state and its documented UI/API boundary through useAttendanceListQuery.
 * @dependencies Uses ManagerAttendanceApi, ManagerAttendanceTypes.
 * @edge-case preserves documented empty, retry, and boundary states for this module.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useAttendanceListQuery owns the attendance feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useAttendanceListQuery(params?: Record<string, string>) {
  return useQuery({
    queryKey: ManagerAttendanceQueryKeys.list(params),
    queryFn: async () => {
      const res = await ManagerAttendanceApi.fetchAttendanceRecords(params);
      return res.data;
    } });
}

/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description useFetchStaff owns the attendance feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useFetchStaff(params: Record<string, string>) {
  return useQuery({
    queryKey: ManagerAttendanceQueryKeys.staff(params),
    queryFn: async () => {
      const res = await ManagerAttendanceApi.fetchAttendanceStaff(params);
      return res.data;
    } });
}

/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description useTodayStatsQuery coordinates this module-specific query, mutation, or UI-state flow at the documented feature boundary.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior defined by the feature contract.
 */
export function useTodayStatsQuery() {
  return useQuery({
    queryKey: ManagerAttendanceQueryKeys.todayStats(),
    queryFn: () => ManagerAttendanceApi.fetchAttendanceStats().then(res => res.data) });
}

/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description useAttendanceHistoryQuery coordinates this module-specific query, mutation, or UI-state flow at the documented feature boundary.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior defined by the feature contract.
 */
export function useAttendanceHistoryQuery(userId: string, type: ManagerAttendancePersonType, month: string) {
  return useQuery({
    queryKey: ManagerAttendanceQueryKeys.history(userId, type, month),
    queryFn: () => ManagerAttendanceApi.fetchAttendanceHistory(userId, type, month).then(res => res.data),
    enabled: Boolean(userId) });
}

/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description useActiveMembersQuery coordinates this module-specific query, mutation, or UI-state flow at the documented feature boundary.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior defined by the feature contract.
 */
export function useActiveMembersQuery() {
  const params = { limit: '1000', status: 'active' };
  return useQuery({
    queryKey: ManagerAttendanceQueryKeys.members(params),
    queryFn: () => ManagerAttendanceApi.fetchAttendanceMembers(params).then(res => res.data) });
}

/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description useStaffQuery coordinates this module-specific query, mutation, or UI-state flow at the documented feature boundary.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior defined by the feature contract.
 */
export function useStaffQuery() {
  return useQuery({
    queryKey: ManagerAttendanceQueryKeys.staff(),
    queryFn: () => ManagerAttendanceApi.fetchAttendanceStaff().then(res => res.data) });
}
