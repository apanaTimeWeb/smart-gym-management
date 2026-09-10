import { useQuery } from '@tanstack/react-query';
import { membersApi } from '@/app/manager/members/members_api/ManagerMembersApi';
import { plansApi } from '@/app/manager/plans/plans_api/ManagerPlansApi';
import { financeApi } from '@/app/manager/finance/finance_api/ManagerFinanceApi';
import { attendanceApi } from '@/app/manager/attendance/attendance_api/ManagerAttendanceApi';

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
  return useQuery({
    queryKey: ['manager', 'plans'],
    queryFn: async () => {
      const res = await plansApi.getAll();
      return res.data || [];
    },
  });
}

export function useFetchMemberStats() {
  return useQuery({
    queryKey: ['manager', 'members', 'stats'],
    queryFn: async () => {
      const res = await membersApi.getStats();
      return res.data;
    },
  });
}

export function useFetchTrainers() {
  return useQuery({
    queryKey: ['manager', 'trainers'],
    queryFn: async () => {
      try {
        const res = await membersApi.getTrainers();
        return (res as any)?.data?.staff?.filter((s: any) => s.role?.toLowerCase().includes('trainer')) || [];
      } catch {
        return [];
      }
    },
  });
}

export function useFetchPayments(memberId: string) {
  return useQuery({
    queryKey: ['manager', 'payments', memberId],
    queryFn: async () => {
      if (!memberId) return [];
      const res = await financeApi.getByMember(memberId);
      return res.data || [];
    },
    enabled: !!memberId,
  });
}

export function useFetchAttendance(memberId: string) {
  return useQuery({
    queryKey: ['manager', 'attendance', memberId],
    queryFn: async () => {
      if (!memberId) return [];
      const res = await attendanceApi.getAll({ memberId });
      return res.data?.attendance || (res.data as any)?.attendances || [];
    },
    enabled: !!memberId,
  });
}
