// DATA FLOW: Manager module state/API data → useManagerFinanceQueries → owning Manager UI components.
/** Manages UseFinanceQueries for the Manager module. */
import { useQuery } from '@tanstack/react-query';
import { financeApi } from '@/app/manager/finance/finance_api/ManagerFinanceApi';

export function useManagerFinancePayments(params: Record<string, string>) {
  return useQuery({
    queryKey: ['manager', 'finance', 'payments', params],
    queryFn: async () => {
      const res = await financeApi.getPayments(params);
      
      // Client-side fallback filtering matching previous Zustand logic,
      // since backend mock might not support all filters out of the box.
      let fetched = res.data?.payments || [];
      if (params?.search) {
        const q = params.search.toLowerCase();
        fetched = fetched.filter(p =>
          p.invoiceNumber?.toLowerCase().includes(q) ||
          p.member?.name?.toLowerCase().includes(q) ||
          p.method?.toLowerCase().includes(q)
        );
      }
      if (params?.status && params.status !== 'ALL') {
        fetched = fetched.filter(p => p.status === params.status);
      }
      if (params?.method && params.method !== 'ALL') {
        fetched = fetched.filter(p => p.method === params.method);
      }
      
      return {
        payments: fetched,
        total: res.data?.total || fetched.length
      };
    }
  });
}

export function useManagerFinanceSummary(range: string) {
  return useQuery({
    queryKey: ['manager', 'finance', 'summary', range],
    queryFn: async () => {
      const params: Record<string, string> = range ? { range } : {};
      const res = await financeApi.getSummary(params);
      return res.data;
    }
  });
}
