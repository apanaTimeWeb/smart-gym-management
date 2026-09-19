"use client";
// DATA FLOW: URL query parameters → useAdminHrUrlState → Admin HR views.
import { useCallback, useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebounce } from '@/app/admin/admin_layout/admin_utils/useAdminDebounce';

/** Keeps Admin HR list/search filters shareable through the URL and debounces backend search updates. */
export function useAdminHrUrlState() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.get('search') || '';
  const currentPage = Math.max(1, Number.parseInt(searchParams.get('page') || '1', 10) || 1);
  const staffSortKey = searchParams.get('staffSortKey') || 'name';
  const staffSortDir = searchParams.get('staffSortDir') || 'asc';
  const payrollSortKey = searchParams.get('payrollSortKey') || 'month';
  const payrollSortDir = searchParams.get('payrollSortDir') || 'desc';
  const roleFilter = searchParams.get('role') || 'All';
  const branchFilter = searchParams.get('branch') || 'All';
  const payrollMonth = searchParams.get('month') || new Date().toISOString().substring(0, 7);
  const debouncedSearch = useDebounce(search, 300);

  const setUrlParam = useCallback((key: string, value: string | null) => {
    const next = new URLSearchParams(Array.from(searchParams.entries()));
    if (value) next.set(key, value); else next.delete(key);
    if (key !== 'page' && key !== 'month') next.set('page', '1');
    router.push(`${pathname}?${next.toString()}`);
  }, [pathname, router, searchParams]);

  const setStaffSort = useCallback((key: string, direction: string) => {
    const next = new URLSearchParams(searchParams.toString());
    next.set('staffSortKey', key);
    next.set('staffSortDir', direction);
    next.set('page', '1');
    router.push(`${pathname}?${next.toString()}`);
  }, [pathname, router, searchParams]);
  const setPayrollSort = useCallback((key: string, direction: string) => {
    const next = new URLSearchParams(searchParams.toString());
    next.set('payrollSortKey', key);
    next.set('payrollSortDir', direction);
    next.set('page', '1');
    router.push(`${pathname}?${next.toString()}`);
  }, [pathname, router, searchParams]);

  useEffect(() => {
    if (debouncedSearch !== search) setUrlParam('search', debouncedSearch || null);
  }, [debouncedSearch, search, setUrlParam]);

  return {
    search,
    currentPage,
    staffSortKey,
    staffSortDir,
    payrollSortKey,
    payrollSortDir,
    roleFilter,
    branchFilter,
    payrollMonth,
    debouncedSearch,
    setSearch: useCallback((value: string) => setUrlParam('search', value || null), [setUrlParam]),
    setCurrentPage: useCallback((value: number) => setUrlParam('page', String(value)), [setUrlParam]),
    setRoleFilter: useCallback((value: string) => setUrlParam('role', value === 'All' ? null : value), [setUrlParam]),
    setBranchFilter: useCallback((value: string) => setUrlParam('branch', value === 'All' ? null : value), [setUrlParam]),
    setPayrollMonth: useCallback((value: string) => setUrlParam('month', value), [setUrlParam]),
    setStaffSort,
    setPayrollSort,
  };
}
