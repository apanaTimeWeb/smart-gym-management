import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useCallback } from 'react';

export function useTrainerWorkoutFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const tab = searchParams.get('tab') ?? 'Workout Plans';
  const search = searchParams.get('search') ?? '';
  const category = searchParams.get('category') ?? 'All';
  const page = Number(searchParams.get('page')) || 1;

  const setUrlParam = useCallback((key: string, value: string | null) => {
    const current = new URLSearchParams(searchParams.toString());
    if (value) current.set(key, value);
    else current.delete(key);
    if (key !== 'page' && key !== 'tab') current.set('page', '1');
    router.push(`${pathname}?${current.toString()}`, { scroll: false });
  }, [searchParams, pathname, router]);

  const handleTabChange = useCallback((newTab: string) => {
    const current = new URLSearchParams(searchParams.toString());
    current.set('tab', newTab);
    current.delete('category'); // Reset filter
    router.push(`${pathname}?${current.toString()}`, { scroll: false });
  }, [searchParams, pathname, router]);

  const handleSearchChange = useCallback((newSearch: string) => setUrlParam('search', newSearch || null), [setUrlParam]);
  const handleCategoryChange = useCallback((newCategory: string) => setUrlParam('category', newCategory), [setUrlParam]);
  const handlePageChange = useCallback((newPage: number) => setUrlParam('page', newPage.toString()), [setUrlParam]);

  return {
    tab, setTab: handleTabChange,
    search, setSearch: handleSearchChange,
    category, setCategory: handleCategoryChange,
    page, setPage: handlePageChange
  };
}
