'use client';
// RESPONSIBILITY: Custom hook for managing URL-based search and filter state for members.
// DATA FLOW: URLSearchParams -> useTrainerMembersFilters -> Component -> Router
import { useCallback } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useDebounce } from '@/app/trainer/trainer_utils/TrainerUseDebounce';
import { TRAINER_MEMBERS_SORT_FIELDS, type TrainerMembersSortDirection, type TrainerMembersSortField } from '@/app/trainer/members/members_types/TrainerMembers_types';

/** Owns useTrainerMembersFilters behavior for this Trainer module. */
export function useTrainerMembersFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const search = searchParams.get('search') || '';
  const statusFilter = searchParams.get('status') || 'All';
  const progressStatusFilter = searchParams.get('progressStatus') || 'All';
  const currentPageValue = parseInt(searchParams.get('page') || '1', 10);
  const currentPage = Number.isInteger(currentPageValue) && currentPageValue > 0 ? currentPageValue : 1;
  const sortByValue = searchParams.get('sortBy') || 'name';
  const sortBy: TrainerMembersSortField = TRAINER_MEMBERS_SORT_FIELDS.includes(sortByValue as TrainerMembersSortField) ? sortByValue as TrainerMembersSortField : 'name';
  const sortDirection: TrainerMembersSortDirection = searchParams.get('sortDirection') === 'asc' ? 'asc' : 'desc';
  const debouncedSearch = useDebounce(search, 300);

  const setUrlParam = useCallback((key: string, value: string | null) => {
    const current = new URLSearchParams(searchParams.toString());
    if (value) current.set(key, value);
    else current.delete(key);
    if (key !== 'page') current.set('page', '1'); // reset page on filter change
    router.push(`${pathname}?${current.toString()}`);
  }, [searchParams, pathname, router]);

  const setSearch = useCallback((val: string) => setUrlParam('search', val || null), [setUrlParam]);
  const setStatusFilter = useCallback((val: string) => setUrlParam('status', val === 'All' ? null : val), [setUrlParam]);
  const setProgressStatusFilter = useCallback((val: string) => setUrlParam('progressStatus', val === 'All' ? null : val), [setUrlParam]);
  const setCurrentPage = useCallback((val: number) => setUrlParam('page', val.toString()), [setUrlParam]);
  const setSort = useCallback((field: TrainerMembersSortField) => {
    const nextDirection = field === sortBy && sortDirection === 'asc' ? 'desc' : 'asc';
    const current = new URLSearchParams(searchParams.toString());
    current.set('sortBy', field);
    current.set('sortDirection', nextDirection);
    current.set('page', '1');
    router.push(`${pathname}?${current.toString()}`);
  }, [pathname, router, searchParams, sortBy, sortDirection]);

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
    sortBy,
    sortDirection,
    setSort,
  };
}
