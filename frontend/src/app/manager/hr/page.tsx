// RESPONSIBILITY: Server Component � fetches initial SSR data and renders the HR & Payroll module entry point.
import ManagerHrMain from '@/app/manager/hr/hr_components/ManagerHrMain/ManagerHrMain';
import { ssrHrApi } from '@/app/manager/hr/hr_api/hr_server_api';
import type { HrInitialData } from '@/app/manager/hr/hr_types/hr_types';

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
  } catch {
    // console.error('Failed to fetch hr initial data:', e);
  }

  return <ManagerHrMain initialData={initialData} />;
}
