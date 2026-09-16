import { Suspense } from 'react';
export const dynamic = 'force-dynamic';
// RESPONSIBILITY: Server Component — fetches initial SSR data and renders the Diet Library module entry point.
import ManagerLibraryMain from '@/app/manager/library/library_components/ManagerLibraryMain/ManagerLibraryMain';
import { ssrLibraryApi } from '@/app/manager/library/library_api/ManagerLibraryServerApi';
import type { LibraryInitialData } from '@/app/manager/library/library_types/ManagerLibraryTypes';

export default async function LibraryPage() {
  let initialData: LibraryInitialData | null = null;
  
  try {
    const dietRes = await ssrLibraryApi.getDietPlans();
    initialData = {
      dietPlans: dietRes.data?.dietPlans || (Array.isArray(dietRes.data) ? dietRes.data : []),
    };
  } catch (e) {
    // Silently fail and return empty array. Client handles refetch.
  }

  return (
    <Suspense fallback={<div className="p-6 flex justify-center text-secondary">Loading...</div>}>
      <ManagerLibraryMain initialData={initialData} />
    </Suspense>
  );
}
