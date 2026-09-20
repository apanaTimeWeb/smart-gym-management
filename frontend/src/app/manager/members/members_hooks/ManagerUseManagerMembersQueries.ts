// DATA FLOW: Manager module state/API data → useManagerMembersQueries → owning Manager UI components.
'use client';
/** Manages UseMembersQueries for the Manager module. */
import { useQuery } from '@tanstack/react-query';
import { membersApi } from '@/app/manager/members/members_api/ManagerMembersApi';
import type { PlanSnapshot, PaymentSnapshot, AttendanceSnapshot } from '@/app/manager/members/members_types/ManagerMembersSnapshotTypes';
import type { MemberStats } from '@/app/manager/members/members_types/ManagerMembersTypes';


/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
export function useFetchMembers(params: Record<string, string>) {
  return useQuery({
    queryKey: ['manager', 'members', params],
    queryFn: async () => {
      const res = await membersApi.fetchMembers(params);
      return res.data;
    } });
}

/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
export function useFetchPlans() {
  return useQuery<PlanSnapshot[]>({
    queryKey: ['manager', 'members', 'plans-snapshot'],
    queryFn: async () => {
      const res = await membersApi.fetchMemberPlans();
      return (res.data as PlanSnapshot[]) || [];
    } });
}

/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
export function useFetchMemberStats() {
  return useQuery<MemberStats | null>({
    queryKey: ['manager', 'members', 'stats'],
    queryFn: async () => {
      const res = await membersApi.fetchMemberStats();
      return res.data ?? null;
    } });
}

/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
export function useFetchTrainers() {
  return useQuery({
    queryKey: ['manager', 'members', 'trainers'],
    queryFn: async () => {
      const res = await membersApi.fetchMemberTrainers();
      return res.data?.staff?.filter((staff) => staff.role.toLowerCase().includes('trainer')) ?? [];
    } });
}

/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
export function useFetchPayments(memberId: string) {
  return useQuery<PaymentSnapshot[]>({
    queryKey: ['manager', 'members', 'payments', memberId],
    queryFn: async () => {
      if (!memberId) return [];
      const res = await membersApi.fetchMemberPayments(memberId);
      return (res.data as PaymentSnapshot[]) || [];
    },
    enabled: !!memberId });
}

/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
export function useFetchAttendance(memberId: string) {
  return useQuery<AttendanceSnapshot[]>({
    queryKey: ['manager', 'members', 'attendance', memberId],
    queryFn: async () => {
      if (!memberId) return [];
      const res = await membersApi.fetchMemberAttendance(memberId);
      return (res.data as AttendanceSnapshot[]) || [];
    },
    enabled: !!memberId });
}

/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
export function useFetchMember(memberId: string | null) {
  return useQuery({
    queryKey: ['manager', 'members', 'detail', memberId],
    queryFn: async () => {
      if (!memberId) return null;
      const res = await membersApi.fetchMemberById(memberId);
      return res.data ?? null;
    },
    enabled: Boolean(memberId) });
}
