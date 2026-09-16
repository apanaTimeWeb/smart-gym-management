// DATA FLOW: Manager module state/API data → useManagerFinanceQueries → owning Manager UI components.
/** Manages UseFinanceQueries for the Manager module. */
import { useQuery } from '@tanstack/react-query';
import { financeApi } from '@/app/manager/finance/finance_api/ManagerFinanceApi';

export function useManagerFinancePayments(params: Record<string, string>) {
  return useQuery({
    queryKey: ['manager', 'finance', 'payments', params],
    queryFn: async () => {
      const res = await financeApi.fetchPayments(params);
      
      return {
        payments: res.data?.payments ?? [],
        total: res.data?.total ?? 0
      };
    }
  });
}

export function useManagerFinanceSummary(range: string) {
  return useQuery({
    queryKey: ['manager', 'finance', 'summary', range],
    queryFn: async () => {
      const params: Record<string, string> = range ? { range } : {};
      const res = await financeApi.fetchFinanceSummary(params);
      return res.data;
    }
  });
}
