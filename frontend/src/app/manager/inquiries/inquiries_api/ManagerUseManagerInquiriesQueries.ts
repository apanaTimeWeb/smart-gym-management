// DATA FLOW: Manager module state/API data → useManagerInquiriesQueries → owning Manager UI components.
/** Manages UseInquiriesQueries for the Manager module. */
import { useQuery } from '@tanstack/react-query';
import { inquiriesApi } from '@/app/manager/inquiries/inquiries_api/ManagerInquiriesApi';
import type { Inquiry, InquiryStats } from '@/app/manager/inquiries/inquiries_types/ManagerInquiriesTypes';

export function useInquiriesQuery(params: Record<string, string>) {
  return useQuery({
    queryKey: ['manager', 'inquiries', 'list', params],
    queryFn: async () => {
      const res = await inquiriesApi.getAll(params);
      return { inquiries: res.data!.inquiries as Inquiry[], total: res.data!.total };
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useInquiryStatsQuery() {
  return useQuery({
    queryKey: ['manager', 'inquiries', 'stats'],
    queryFn: async () => {
      const res = await inquiriesApi.getStats();
      return res.data! as InquiryStats;
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useInquiryPlansQuery() {
  return useQuery({
    queryKey: ['manager', 'inquiries', 'plans'],
    queryFn: async () => {
      const res = await inquiriesApi.getPlans();
      return res.data! as { name: string }[];
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useInquiryPlansSnapshotQuery() {
  return useQuery({
    queryKey: ['manager', 'inquiries', 'plans-snapshot'],
    queryFn: async () => {
      const res = await inquiriesApi.getPlansSnapshot();
      return res.data! as unknown[];
    },
    staleTime: 5 * 60 * 1000,
  });
}
