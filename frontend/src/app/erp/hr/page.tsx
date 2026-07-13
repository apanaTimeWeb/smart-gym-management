// RESPONSIBILITY: page.tsx handles the logic and UI for its corresponding feature.
import HrMain from '@/app/erp/hr/hr_components/HrMain/HrMain';
import { ssrHrApi } from '@/lib/server-api';
import { HrInitialData } from '@/app/erp/hr/hr_types/hr_types';

export default async function HrPage() {
  let initialData: HrInitialData | null = null;
  
  try {
    const [staffRes, payrollRes, summaryRes] = await Promise.all([
      ssrHrApi.getStaff(),
      ssrHrApi.getPayrolls(),
      ssrHrApi.getSummary(),
    ]);
    initialData = {
      staff: staffRes.data?.staff || staffRes.data || [],
      payrolls: payrollRes.data?.payrolls || payrollRes.data || [],
      summary: summaryRes.data || null
    };
  } catch (e) {
    console.error('Failed to fetch hr initial data:', e);
  }

  return <HrMain initialData={initialData} />;
}
