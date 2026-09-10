// RESPONSIBILITY: Custom hook encapsulating all UI state and API orchestration for the Diet Library module.
// DATA FLOW: LibraryContext → useLibraryLogic → libraryApi
import { useState, useCallback, useEffect } from 'react';
import { useDebounce } from '@/app/trainer/trainer_utils/useDebounce';
import { libraryApi } from '@/app/trainer/library/library_api/library_api';
import type { LibraryContextType, LibraryInitialData } from '@/app/trainer/library/library_types/library_types';
import type { DietPlan, FetchState } from '@/app/trainer/trainer_types/trainer_types';
import type { ToastType } from '@/app/trainer/trainer_components/TrainerFeedback/TrainerToast';
import { useConfirm } from '@/app/trainer/trainer_components/TrainerFeedback/TrainerConfirmProvider';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useTrainerLibraryDiet } from '@/app/trainer/library/library_context/useTrainerLibraryDiet';
import type { ApiResponse } from '@/lib/api';

// Bug #5: typed response shape instead of any
interface DietPlansApiResponse { dietPlans?: DietPlan[]; total?: number }

export function useLibraryLogic(initialData?: LibraryInitialData | null): LibraryContextType {
  const { confirm } = useConfirm();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [dietPlans, setDietPlans] = useState<DietPlan[]>(initialData?.dietPlans ?? []);
  const [fetchState, setFetchState] = useState<FetchState>(initialData ? 'success' : 'loading');
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);

  const [search, setLocalSearch] = useState(searchParams.get('search') ?? '');
  const debouncedSearch = useDebounce(search, 300);
  const filterGoal = searchParams.get('goal') ?? 'All';
  const currentPage = Number(searchParams.get('page')) || 1;

  // Sync debouncedSearch back to URL when debounced value diverges from URL param
  useEffect(() => {
    const currentSearch = searchParams.get('search') ?? '';
    if (debouncedSearch !== currentSearch) {
      const params = new URLSearchParams(searchParams.toString());
      if (debouncedSearch) { params.set('search', debouncedSearch); params.set('page', '1'); }
      else { params.delete('search'); params.set('page', '1'); }
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    }
  }, [debouncedSearch, searchParams, router, pathname]);

  const setSearch = useCallback((val: string) => { setLocalSearch(val); }, []);

  const setUrlParam = useCallback((key: string, value: string | null) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    if (value && value !== 'All') current.set(key, value);
    else current.delete(key);
    if (key !== 'page') current.set('page', '1');
    router.push(`${pathname}?${current.toString()}`, { scroll: false });
  }, [searchParams, pathname, router]);

  const setFilterGoal = useCallback((val: string) => setUrlParam('goal', val), [setUrlParam]);

  const setCurrentPage = useCallback((page: number) => {
    setUrlParam('page', page.toString());
  }, [setUrlParam]);

  const showToast = useCallback((msg: string, t: ToastType) => setToast({ message: msg, type: t }), []);
  const hideToast = useCallback(() => setToast(null), []);

  const loadAll = useCallback(async () => {
    setFetchState('loading');
    try {
      // Bug #6 fix: pass all filter params to API — DO NOT re-filter client-side after server fetch
      const params: Record<string, string> = {
        page: currentPage.toString(),
        limit: '10'
      };
      if (debouncedSearch) params.search = debouncedSearch;
      if (filterGoal && filterGoal !== 'All') params.goal = filterGoal;

      // Bug #5 fix: typed API response instead of any
      const dietRes = await libraryApi.getDietPlans(params) as ApiResponse<DietPlansApiResponse>;

      // Bug #6 fix: trust server-side filtering — no client-side re-filter loops
      const fetchedDietPlans: DietPlan[] = dietRes.data?.dietPlans ?? (Array.isArray(dietRes.data) ? dietRes.data as DietPlan[] : []);

      setDietPlans(fetchedDietPlans);
      setFetchState('success');
    } catch (e) {
      showToast((e as Error).message, 'error');
      setFetchState('error');
    }
  }, [showToast, currentPage, debouncedSearch, filterGoal]);

  // Bug #7 fix: direct useEffect with cancelled flag instead of setTimeout anti-pattern
  // Deps: loadAll changes when URL params change, which drives re-fetch on navigation
  useEffect(() => {
    let cancelled = false;
    const run = async () => { if (!cancelled) await loadAll(); };
    void run();
    return () => { cancelled = true; };
  }, [loadAll]);

  const dietLogic = useTrainerLibraryDiet(setDietPlans, showToast, setSaving, confirm);

  return {
    dietPlans,
    fetchState, saving, toast,
    search, debouncedSearch, setSearch, filterGoal, setFilterGoal, currentPage, setCurrentPage,
    showToast, hideToast, loadAll,
    ...dietLogic
  };
}
