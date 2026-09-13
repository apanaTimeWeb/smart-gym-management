// RESPONSIBILITY: Custom hook for managing URL-based search and filter state for members.
// DATA FLOW: URLSearchParams -> useTrainerMembersFilters -> Component -> Router
import { useCallback } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useDebounce } from '@/app/trainer/trainer_utils/useDebounce';

export function useTrainerMembersFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const search = searchParams.get('search') || '';
  const statusFilter = searchParams.get('status') || 'All';
  const progressStatusFilter = searchParams.get('progressStatus') || 'All';
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const debouncedSearch = useDebounce(search, 300);

  const setUrlParam = useCallback((key: string, value: string | null) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    if (value) current.set(key, value);
    else current.delete(key);
    if (key !== 'page') current.set('page', '1'); // reset page on filter change
    router.push(`${pathname}?${current.toString()}`);
  }, [searchParams, pathname, router]);

  const setSearch = useCallback((val: string) => setUrlParam('search', val || null), [setUrlParam]);
  const setStatusFilter = useCallback((val: string) => setUrlParam('status', val === 'All' ? null : val), [setUrlParam]);
  const setProgressStatusFilter = useCallback((val: string) => setUrlParam('progressStatus', val === 'All' ? null : val), [setUrlParam]);
  const setCurrentPage = useCallback((val: number) => setUrlParam('page', val.toString()), [setUrlParam]);

  return {
    search,
    debouncedSearch,
    setSearch,
    statusFilter,
    setStatusFilter,
    progressStatusFilter,
    setProgressStatusFilter,
    currentPage,
    setCurrentPage,
  };
}
