'use client';
// DATA FLOW: Manager module state/API data → useManagerStoreLogic → owning Manager UI components.
// RESPONSIBILITY: Custom hook encapsulating all UI state and API orchestration for the gym product Store module.
/** Manages UseStoreLogic for the Manager module. */
import type { ManagerStoreSortOrder } from '@/app/manager/store/store_types/ManagerStoreTypes';
import { useCallback } from 'react';
import { useManagerDebounce } from '@/app/manager/manager_infrastructure/ManagerDebounce';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import type { ManagerStoreViewModel, StoreInitialData } from '@/app/manager/store/store_types/ManagerStoreTypes';
import { useConfirm } from '@/app/manager/manager_components/ManagerFeedback/ManagerConfirmProvider';
import { useManagerStoreUiStore } from '@/app/manager/store/store_store/ManagerUseManagerStoreUiStore';
import { useManagerStoreOrder } from '@/app/manager/store/store_hooks/ManagerUseManagerStoreOrder';
import { useManagerStoreProducts } from '@/app/manager/store/store_hooks/ManagerUseManagerStoreProducts';
import { useManagerStoreQueries } from '@/app/manager/store/store_hooks/ManagerUseManagerStoreQueries';

export function useManagerStoreLogic(initialData?: StoreInitialData | null): ManagerStoreViewModel {
  const { confirm } = useConfirm();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const tab = searchParams.get('tab') || 'Products';
  
  const search = searchParams.get('search') || '';
  const categoryFilter = searchParams.get('categoryFilter') || 'ALL';
  const stockFilter = searchParams.get('stockFilter') || 'ALL';
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const startDate = searchParams.get('startDate') || '';
  const endDate = searchParams.get('endDate') || '';
  const sortOrder = (searchParams.get('sortOrder') as ManagerStoreSortOrder) || 'DESC';
  
  const debouncedSearch = useManagerDebounce(search, 300);

  const setUrlParam = useCallback((key: string, value: string | null) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    if (value) current.set(key, value);
    else current.delete(key);
    if (key !== 'page' && key !== 'tab') current.set('page', '1');
    router.push(`${pathname}?${current.toString()}`, { scroll: false });
  }, [searchParams, pathname, router]);

  const setTab = useCallback((val: string) => setUrlParam('tab', val), [setUrlParam]);
  const setSearch = useCallback((val: string) => setUrlParam('search', val || null), [setUrlParam]);
  const setCategoryFilter = useCallback((val: string) => setUrlParam('categoryFilter', val || null), [setUrlParam]);
  const setStockFilter = useCallback((val: string) => setUrlParam('stockFilter', val || null), [setUrlParam]);
  const setCurrentPage = useCallback((val: number) => setUrlParam('page', val.toString()), [setUrlParam]);
  const setStartDate = useCallback((val: string) => setUrlParam('startDate', val || null), [setUrlParam]);
  const setEndDate = useCallback((val: string) => setUrlParam('endDate', val || null), [setUrlParam]);
  const setSortOrder = useCallback((val: ManagerStoreSortOrder) => setUrlParam('sortOrder', val), [setUrlParam]);

  const ui = useManagerStoreUiStore();
  const showToast = ui.showToast;
  const hideToast = ui.hideToast;
  const setSaving = ui.setSaving;

  const {
    products, setProducts,
    orders,
    totalOrders,
    summary, setSummary,
    isLoading, isError, error, loadAll
  } = useManagerStoreQueries(
    currentPage, sortOrder, debouncedSearch, startDate, endDate, categoryFilter, stockFilter, showToast, initialData
  );

  const productLogic = useManagerStoreProducts(
    setProducts,
    setSummary,
    showToast,
    setSaving,
    confirm
  );

  const orderLogic = useManagerStoreOrder(
    loadAll,
    setTab,
    showToast,
    ui.setPrintData,
    setSaving,
    confirm
  );

  return {
    tab, setTab,
    products, orders, totalOrders, summary, isLoading, isError, errorMessage: error instanceof Error ? error.message : '', saving: ui.saving,
    toast: ui.toast, printData: ui.printData, setPrintData: ui.setPrintData, search, debouncedSearch, setSearch,
    categoryFilter, setCategoryFilter, stockFilter, setStockFilter,
    currentPage, setCurrentPage,
    startDate, setStartDate, endDate, setEndDate, sortOrder, setSortOrder,
    ...productLogic,
    ...orderLogic,
    hideToast, loadAll
 };
}

