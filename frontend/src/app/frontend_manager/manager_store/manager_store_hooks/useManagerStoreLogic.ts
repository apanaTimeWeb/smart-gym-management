'use client';
// DATA FLOW: URL/local UI state or feature input → feature hook → module-owned TanStack Query/Zustand mutation/query → observable UI result.
import { useCallback } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useConfirm } from '@/components/ui/manager_confirm_provider/ManagerConfirmProvider';
import { useManagerDebounce } from '@/app/frontend_manager/manager_infrastructure/useManagerDebounce';
import { useManagerStoreOrder } from '@/app/frontend_manager/manager_store/manager_store_hooks/useManagerStoreOrder';
import { useManagerStoreProducts } from '@/app/frontend_manager/manager_store/manager_store_hooks/useManagerStoreProducts';
import { useManagerStoreQueries } from '@/app/frontend_manager/manager_store/manager_store_hooks/useManagerStoreQueries';
import { useManagerStoreUiStore } from '@/app/frontend_manager/manager_store/manager_store_store/useManagerStoreUiStore';
import type { ManagerStoreSortOrder } from '@/app/frontend_manager/manager_store/manager_store_types/ManagerStoreTypes';
import type { ManagerStoreViewModel, StoreInitialData } from '@/app/frontend_manager/manager_store/manager_store_types/ManagerStoreTypes';


/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description Coordinates store feature state and its documented UI/API boundary through useManagerStoreLogic.
 * @dependencies Uses ManagerConfirmProvider, ManagerDebounce, useManagerStoreOrder, useManagerStoreProducts.
 * @edge-case surfaces request errors without exposing transport details; preserves explicit loading state until the query or mutation settles; preserves shareable filter, search, sort, or pagination state in the URL.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useManagerStoreLogic owns the store feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
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
    const current = new URLSearchParams(searchParams.toString());
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

  const {
    products, setProducts,
    orders,
    totalOrders,
    summary, setSummary,
    isPending, isError, error, loadAll
  } = useManagerStoreQueries(
    currentPage, sortOrder, debouncedSearch, startDate, endDate, categoryFilter, stockFilter, showToast, initialData
  );

  const productLogic = useManagerStoreProducts(
    setProducts,
    setSummary,
    showToast,
  );

  const orderLogic = useManagerStoreOrder(
    setTab,
    showToast,
    ui.setPrintData,
    confirm
  );

  return {
    tab, setTab,
    products, orders, totalOrders, summary, isPending, isError, errorMessage: error instanceof Error ? error.message : '', saving: productLogic.isSaving || orderLogic.isPlacingOrder,
    toast: ui.toast, printData: ui.printData, setPrintData: ui.setPrintData, search, debouncedSearch, setSearch,
    categoryFilter, setCategoryFilter, stockFilter, setStockFilter,
    currentPage, setCurrentPage,
    startDate, setStartDate, endDate, setEndDate, sortOrder, setSortOrder,
    ...productLogic,
    ...orderLogic,
    hideToast, loadAll
 };
}

