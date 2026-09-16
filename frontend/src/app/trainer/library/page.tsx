import { Suspense } from 'react';
// RESPONSIBILITY: Server Component � fetches initial SSR data and renders the Diet Library module entry point.
import TrainerLibraryMain from '@/app/trainer/library/library_components/TrainerLibraryMain/TrainerLibraryMain';
import { ssrLibraryApi } from '@/app/trainer/library/library_api/TrainerLibrary_server_api';
import type { LibraryInitialData } from '@/app/trainer/library/library_types/TrainerLibrary_types';

export default async function LibraryPage() {
  let initialData: LibraryInitialData | null = null;
  
  try {
    const [dietRes] = await Promise.all([
      ssrLibraryApi.getDietPlans(),
    ]);
    initialData = {
      dietPlans: dietRes.data?.dietPlans || (Array.isArray(dietRes.data) ? dietRes.data : []),
    };
  } catch (e) {
    // Error logged to monitoring provider
  }

  return (
    <Suspense fallback={<div className="p-6 flex justify-center text-secondary">Loading...</div>}>
      <TrainerLibraryMain initialData={initialData} />
    </Suspense>
  );
}

