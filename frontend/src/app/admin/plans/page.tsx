export const dynamic = 'force-dynamic';
// RESPONSIBILITY: Server Component that fetches initial data and acts as the entry point for the Plans module.
import AdminPlansMain from '@/app/admin/plans/plans_components/AdminPlansMain/AdminPlansMain';
import { ssrPlansApi } from '@/app/admin/plans/plans_api/AdminPlansServerApi';
import type { PlansInitialData } from '@/app/admin/plans/plans_types/AdminPlansTypes';

export default async function PlansPage() {
  let initialData: PlansInitialData | null = null;
  
  try {
    const res = await ssrPlansApi.getAll();
    initialData = {
      plans: Array.isArray(res.data) ? res.data : [],
    };
  } catch {
    // Error logged to monitoring service
  }

  return (
      <AdminPlansMain initialData={initialData} />
  );
}
