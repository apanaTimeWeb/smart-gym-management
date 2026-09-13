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
      await new Promise(res => setTimeout(res, 300));
      return [
        { id: 'p1', name: 'Annual Pro', durationMonths: 12, price: 15000 },
        { id: 'p2', name: 'Quarterly Starter', durationMonths: 3, price: 5000 },
        { id: 'p3', name: 'Monthly Basic', durationMonths: 1, price: 2000 }
      ] as any[];
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
        const res = await membersApi.getTrainers() as { data?: { staff?: Array<{ role?: string; [key: string]: unknown }> } };
        return res.data?.staff?.filter((s) => s.role?.toLowerCase().includes('trainer')) || [];
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
      await new Promise(res => setTimeout(res, 300));
      return [
        { id: 'pay1', amount: 15000, method: 'UPI', date: new Date().toISOString(), status: 'Completed', invoiceNumber: 'INV-001' }
      ] as any[];
    },
    enabled: !!memberId,
  });
}

export function useFetchAttendance(memberId: string) {
  return useQuery({
    queryKey: ['manager', 'attendance', memberId],
    queryFn: async () => {
      if (!memberId) return [];
      await new Promise(res => setTimeout(res, 300));
      return [
        { id: 'att1', date: new Date().toISOString(), checkIn: '08:00 AM', status: 'Present' }
      ] as any[];
    },
    enabled: !!memberId,
  });
}
