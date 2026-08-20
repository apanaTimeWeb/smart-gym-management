// RESPONSIBILITY: Server Component — fetches initial SSR data and renders the Diet Library module entry point.
import LibraryMain from '@/app/admin/library/library_components/LibraryMain/LibraryMain';
import { ssrLibraryApi } from '@/app/admin/library/library_api/library_server_api';
import { LibraryInitialData } from '@/app/admin/library/library_types/library_types';

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

  return <LibraryMain initialData={initialData} />;
}
