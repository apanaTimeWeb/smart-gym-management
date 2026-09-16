// DATA FLOW: Manager module state/API data → useManagerMembersQueries → owning Manager UI components.
/** Manages UseMembersQueries for the Manager module. */
import { useQuery } from '@tanstack/react-query';
import { membersApi } from '@/app/manager/members/members_api/ManagerMembersApi';
import type { MemberStats } from '@/app/manager/members/members_types/ManagerMembersTypes';
import type { PlanSnapshot, PaymentSnapshot, AttendanceSnapshot } from '@/app/manager/members/members_types/ManagerMembersSnapshotTypes';

export function useFetchMembers(params: Record<string, string>) {
  return useQuery({
    queryKey: ['manager', 'members', params],
    queryFn: async () => {
      const res = await membersApi.getAll(params);
      return res.data;
    },
  });
}

export function useFetchPlans() {
  return useQuery<PlanSnapshot[]>({
    queryKey: ['manager', 'members', 'plans-snapshot'],
    queryFn: async () => {
      const res = await membersApi.getPlans();
      return (res.data as PlanSnapshot[]) || [];
    },
  });
}

export function useFetchMemberStats() {
  return useQuery<MemberStats | null>({
    queryKey: ['manager', 'members', 'stats'],
    queryFn: async () => {
      const res = await membersApi.getStats();
      return res.data ?? null;
    },
  });
}

export function useFetchTrainers() {
  return useQuery({
    queryKey: ['manager', 'members', 'trainers'],
    queryFn: async () => {
      try {
        const res = await membersApi.getTrainers();
        return res.data?.staff?.filter((s) => s.role?.toLowerCase().includes('trainer')) || [];
      } catch {
        return [];
      }
    },
  });
}

export function useFetchPayments(memberId: string) {
  return useQuery<PaymentSnapshot[]>({
    queryKey: ['manager', 'members', 'payments', memberId],
    queryFn: async () => {
      if (!memberId) return [];
      const res = await membersApi.getPayments(memberId);
      return (res.data as PaymentSnapshot[]) || [];
    },
    enabled: !!memberId,
  });
}

export function useFetchAttendance(memberId: string) {
  return useQuery<AttendanceSnapshot[]>({
    queryKey: ['manager', 'members', 'attendance', memberId],
    queryFn: async () => {
      if (!memberId) return [];
      const res = await membersApi.getAttendance(memberId);
      return (res.data as AttendanceSnapshot[]) || [];
    },
    enabled: !!memberId,
  });
}

export function useFetchMember(memberId: string | null) {
  return useQuery({
    queryKey: ['manager', 'members', 'detail', memberId],
    queryFn: async () => {
      if (!memberId) return null;
      const res = await membersApi.getOne(memberId);
      return res.data ?? null;
    },
    enabled: Boolean(memberId),
  });
}
