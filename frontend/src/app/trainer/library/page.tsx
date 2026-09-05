// RESPONSIBILITY: Encapsulates logic, UI, or types for the trainer module.
// DATA FLOW: Standard component data flow.
// RESPONSIBILITY: Server Component � fetches initial SSR data and renders the Diet Library module entry point.
import TrainerLibraryMain from '@/app/trainer/library/library_components/TrainerLibraryMain/TrainerLibraryMain';
import { ssrLibraryApi } from '@/app/trainer/library/library_api/library_server_api';
import type { LibraryInitialData } from '@/app/trainer/library/library_types/library_types';

export default async function LibraryPage() {
  let initialData: LibraryInitialData | null = null;
  
  try {
    const [exRes, dietRes] = await Promise.all([
      ssrLibraryApi.getExercises(),
      ssrLibraryApi.getDietPlans(),
    ]);
    initialData = {
      exercises: exRes.data?.exercises || exRes.data || [],
      dietPlans: dietRes.data?.dietPlans || dietRes.data || [],
    };
  } catch (e) {
    // console.error('Failed to fetch library initial data:', e);
  }

  return <TrainerLibraryMain initialData={initialData} />;
}

