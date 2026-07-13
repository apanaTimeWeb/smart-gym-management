// RESPONSIBILITY: page.tsx handles the logic and UI for its corresponding feature.
import FinanceMain from '@/app/erp/finance/finance_components/FinanceMain/FinanceMain';
import { ssrFinanceApi } from '@/lib/server-api';
import { FinanceInitialData } from '@/app/erp/finance/finance_types/finance_types';

export default async function FinancePage() {
  let initialData: FinanceInitialData | null = null;
  
  try {
    const [paymentsRes, summaryRes] = await Promise.all([
      ssrFinanceApi.getPayments({ limit: '10', page: '1' }),
      ssrFinanceApi.getSummary(),
    ]);
    initialData = {
      payments: paymentsRes.data?.payments || [],
      totalPayments: paymentsRes.data?.total || 0,
      summary: summaryRes.data || null
    };
  } catch (e) {
    // console.error('Failed to fetch finance initial data:', e);
  }

  return <FinanceMain initialData={initialData} />;
}
