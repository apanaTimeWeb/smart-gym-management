'use client';
import { useQuery } from '@tanstack/react-query';
import { ManagerMembersApi } from '@/app/frontend_manager/manager_members/manager_members_api/ManagerMembersApi';
import { ManagerMembersQueryKeys } from '@/app/frontend_manager/manager_members/manager_members_constants/ManagerMembersQueryKeys';
import type { PlanSnapshot, PaymentSnapshot, AttendanceSnapshot } from '@/app/frontend_manager/manager_members/manager_members_types/ManagerMembersSnapshotTypes';
import type { MemberStats } from '@/app/frontend_manager/manager_members/manager_members_types/ManagerMembersTypes';
/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description Coordinates members feature state and its documented UI/API boundary through useFetchMembers.
 * @dependencies Uses ManagerMembersApi, ManagerMembersSnapshotTypes, ManagerMembersTypes.
 * @edge-case preserves documented empty, retry, and boundary states for this module.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useFetchMembers owns the members feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useFetchMembers(params: Record<string, string>) {
  return useQuery({
    queryKey: ManagerMembersQueryKeys.list(params),
    queryFn: async () => {
      const res = await ManagerMembersApi.fetchMembers(params);
      return res.data;
    } });
}

/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description useFetchPlans owns the members feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useFetchPlans() {
  return useQuery<PlanSnapshot[]>({
    queryKey: ManagerMembersQueryKeys.plansSnapshot(),
    queryFn: async () => {
      const res = await ManagerMembersApi.fetchMemberPlans();
      return (res.data as PlanSnapshot[]) || [];
    } });
}

/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description useFetchMemberStats coordinates this module-specific query, mutation, or UI-state flow at the documented feature boundary.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior defined by the feature contract.
 */
export function useFetchMemberStats() {
  return useQuery<MemberStats | null>({
    queryKey: ManagerMembersQueryKeys.stats(),
    queryFn: async () => {
      const res = await ManagerMembersApi.fetchMemberStats();
      return res.data ?? null;
    } });
}

/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description useFetchTrainers coordinates this module-specific query, mutation, or UI-state flow at the documented feature boundary.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior defined by the feature contract.
 */
export function useFetchTrainers() {
  return useQuery({
    queryKey: ManagerMembersQueryKeys.trainers(),
    queryFn: async () => {
      const res = await ManagerMembersApi.fetchMemberTrainers();
      return res.data?.staff?.filter((staff) => staff.role.toLowerCase().includes('trainer')) ?? [];
    } });
}

/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description useFetchPayments coordinates this module-specific query, mutation, or UI-state flow at the documented feature boundary.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior defined by the feature contract.
 */
export function useFetchPayments(memberId: string) {
  return useQuery<PaymentSnapshot[]>({
    queryKey: ManagerMembersQueryKeys.payments(memberId),
    queryFn: async () => {
      if (!memberId) return [];
      const res = await ManagerMembersApi.fetchMemberPayments(memberId);
      return (res.data as PaymentSnapshot[]) || [];
    },
    enabled: !!memberId });
}

/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description useFetchAttendance coordinates this module-specific query, mutation, or UI-state flow at the documented feature boundary.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior defined by the feature contract.
 */
export function useFetchAttendance(memberId: string) {
  return useQuery<AttendanceSnapshot[]>({
    queryKey: ManagerMembersQueryKeys.attendance(memberId),
    queryFn: async () => {
      if (!memberId) return [];
      const res = await ManagerMembersApi.fetchMemberAttendance(memberId);
      return (res.data as AttendanceSnapshot[]) || [];
    },
    enabled: !!memberId });
}

/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description useFetchMember coordinates this module-specific query, mutation, or UI-state flow at the documented feature boundary.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior defined by the feature contract.
 */
export function useFetchMember(memberId: string | null) {
  return useQuery({
    queryKey: ManagerMembersQueryKeys.detail(memberId),
    queryFn: async () => {
      if (!memberId) return null;
      const res = await ManagerMembersApi.fetchMemberById(memberId);
      return res.data ?? null;
    },
    enabled: Boolean(memberId) });
}
