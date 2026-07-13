// RESPONSIBILITY: page.tsx handles the logic and UI for its corresponding feature.
import LibraryMain from '@/app/erp/library/library_components/LibraryMain/LibraryMain';
import { ssrLibraryApi } from '@/lib/server-api';
import { LibraryInitialData } from '@/app/erp/library/library_types/library_types';

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
    console.error('Failed to fetch library initial data:', e);
  }

  return <LibraryMain initialData={initialData} />;
}
