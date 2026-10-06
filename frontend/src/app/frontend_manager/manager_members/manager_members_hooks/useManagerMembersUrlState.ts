'use client';
import { useCallback } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useManagerDebounce } from '@/app/frontend_manager/manager_infrastructure/useManagerDebounce';
import { MANAGER_MEMBERS_STATUS_VALUES } from '@/app/frontend_manager/manager_members/manager_members_constants/ManagerMembersConstants';
import type { MemberSortColumn, SortDirection } from '@/app/frontend_manager/manager_members/manager_members_types/ManagerMembersTypes';


/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description Coordinates members feature state and its documented UI/API boundary through useManagerMembersUrlState.
 * @dependencies Uses ManagerDebounce, ManagerMembersTypes.
 * @edge-case preserves shareable filter, search, sort, or pagination state in the URL.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useManagerMembersUrlState owns the members feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useManagerMembersUrlState() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const search = searchParams.get('search') || '';
  const statusFilter = searchParams.get('status') || MANAGER_MEMBERS_STATUS_VALUES.ALL_STATUS_FILTER;
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const debouncedSearch = useManagerDebounce(search, 300);

  const setUrlParam = useCallback((key: string, value: string | null) => {
    const current = new URLSearchParams(searchParams.toString());
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
    const current = new URLSearchParams(searchParams.toString());
    if (from) current.set('expiryFrom', from); else current.delete('expiryFrom');
    if (to) current.set('expiryTo', to); else current.delete('expiryTo');
    current.set('page', '1');
    router.push(`${pathname}?${current.toString()}`);
  }, [searchParams, pathname, router]);

  const setSortColumn = useCallback((val: MemberSortColumn) => setUrlParam('sort', val), [setUrlParam]);
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
