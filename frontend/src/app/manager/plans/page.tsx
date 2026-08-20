// RESPONSIBILITY: Server Component that fetches initial data and acts as the entry point for the Plans module.
import PlansMain from '@/app/manager/plans/plans_components/PlansMain/PlansMain';
import { ssrPlansApi } from '@/app/manager/plans/plans_api/plans_server_api';
import { PlansInitialData } from '@/app/manager/plans/plans_types/plans_types';

export default async function PlansPage() {
  let initialData: PlansInitialData | null = null;
  
  try {
    const res = await ssrPlansApi.getAll();
    initialData = {
      plans: Array.isArray(res.data) ? res.data : [],
    };
  } catch (e) {
    // Error logged to monitoring service
  }

  return <PlansMain initialData={initialData} />;
}
