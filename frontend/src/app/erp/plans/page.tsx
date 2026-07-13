// RESPONSIBILITY: page.tsx handles the logic and UI for its corresponding feature.
import PlansMain from '@/app/erp/plans/plans_components/PlansMain/PlansMain';
import { ssrPlansApi } from '@/lib/server-api';
import { PlansInitialData } from '@/app/erp/plans/plans_types/plans_types';

export default async function PlansPage() {
  let initialData: PlansInitialData | null = null;
  
  try {
    const res = await ssrPlansApi.getAll();
    initialData = {
      plans: res.data?.plans || res.data || [],
    };
  } catch (e) {
    console.error('Failed to fetch plans initial data:', e);
  }

  return <PlansMain initialData={initialData} />;
}
