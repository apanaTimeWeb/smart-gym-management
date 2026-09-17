'use client';
// DATA FLOW: Manager module state/API data → useManagerMembersUrlState → owning Manager UI components.
/** Manages UseMembersUrlState for the Manager module. */
import { useCallback } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import type { MemberSortColumn, SortDirection } from '@/app/manager/members/members_types/ManagerMembersTypes';
import { useManagerDebounce } from '@/app/manager/manager_utils/ManagerDebounce';

export function useManagerMembersUrlState() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const search = searchParams.get('search') || '';
  const statusFilter = searchParams.get('status') || 'All';
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const debouncedSearch = useManagerDebounce(search, 300);

  const setUrlParam = useCallback((key: string, value: string | null) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    if (value) current.set(key, value);
    else current.delete(key);
    if (key !== 'page' && key !== 'sort' && key !== 'dir') current.set('page', '1');
    router.push(`${pathname}?${current.toString()}`);
  }, [searchParams, pathname, router]);

  const setSearch = useCallback((val: string) => setUrlParam('search', val || null), [setUrlParam]);
  const setStatusFilter = useCallback((val: string) => setUrlParam('status', val === 'All' ? null : val), [setUrlParam]);
  const setGenderFilter = useCallback((val: string) => setUrlParam('gender', val === 'All' ? null : val), [setUrlParam]);
  const setPlanFilter = useCallback((val: string) => setUrlParam('plan', val === 'All' ? null : val), [setUrlParam]);
  
  const setExpiryRange = useCallback((from: string, to: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    if (from) current.set('expiryFrom', from); else current.delete('expiryFrom');
    if (to) current.set('expiryTo', to); else current.delete('expiryTo');
    current.set('page', '1');
    router.push(`${pathname}?${current.toString()}`);
  }, [searchParams, pathname, router]);

  const setSortColumn = useCallback((val: 'name' | 'joinDate' | 'expiryDate' | 'paidAmount' | 'status') => setUrlParam('sort', val), [setUrlParam]);
  const setSortDirection = useCallback((val: SortDirection) => setUrlParam('dir', val), [setUrlParam]);
  const setCurrentPage = useCallback((val: number) => setUrlParam('page', val.toString()), [setUrlParam]);

  const genderFilter = searchParams.get('gender') || 'All';
  const planFilter = searchParams.get('plan') || 'All';
  const expiryFrom = searchParams.get('expiryFrom') || '';
  const expiryTo = searchParams.get('expiryTo') || '';
  const sortColumn = (searchParams.get('sort') as MemberSortColumn) || 'name';
  const sortDirection = (searchParams.get('dir') as SortDirection) || 'asc';

  return {
    searchParams,
    search, debouncedSearch, setSearch, statusFilter, setStatusFilter, currentPage, setCurrentPage,
    genderFilter, setGenderFilter, planFilter, setPlanFilter, expiryFrom, expiryTo, setExpiryRange,
    sortColumn, setSortColumn, sortDirection, setSortDirection, setUrlParam
  };
}
