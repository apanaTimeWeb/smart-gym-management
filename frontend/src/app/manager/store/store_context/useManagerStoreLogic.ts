// RESPONSIBILITY: Custom hook encapsulating all UI state and API orchestration for the gym product Store module.
import React, { useState, useCallback, useEffect } from 'react';
import { useDebounce } from '@/app/manager/manager_utils/useDebounce';
import type { ToastType } from '@/app/manager/manager_components/ManagerFeedback/ManagerToast';
import type { ManagerReceiptData } from '@/app/manager/members/members_components/ManagerMembersThermalReceipt';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import type { StoreContextType, StoreInitialData } from '@/app/manager/store/store_types/ManagerStoreTypes';
import { useConfirm } from '@/app/manager/manager_components/ManagerFeedback/ManagerConfirmProvider';
import { useManagerStoreOrder } from '@/app/manager/store/store_context/useManagerStoreOrder';
import { useManagerStoreProducts } from '@/app/manager/store/store_context/useManagerStoreProducts';
import { useManagerStoreQueries } from '@/app/manager/store/store_context/useManagerStoreQueries';

export function useManagerStoreLogic(initialData?: StoreInitialData | null): StoreContextType {
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
  const sortOrder = (searchParams.get('sortOrder') as 'ASC' | 'DESC') || 'DESC';
  
  const debouncedSearch = useDebounce(search, 300);

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
  const setSortOrder = useCallback((val: 'ASC' | 'DESC') => setUrlParam('sortOrder', val), [setUrlParam]);

  const [saving, setSaving] = useState(false);
  const isFirstRender = React.useRef(true);
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);
  const [printData, setPrintData] = useState<ManagerReceiptData | null>(null);

  const showToast = useCallback((msg: string, t: ToastType) => setToast({ message: msg, type: t }), []);
  const hideToast = useCallback(() => setToast(null), []);

  const {
    products, setProducts,
    orders,
    totalOrders,
    summary, setSummary,
    fetchState, loadAll
  } = useManagerStoreQueries(
    currentPage, sortOrder, debouncedSearch, startDate, endDate, categoryFilter, stockFilter, showToast, initialData
  );

  useEffect(() => { 
    if (isFirstRender.current) {
      isFirstRender.current = false;
    }
    loadAll(); 
  }, [loadAll, initialData]);

  const productLogic = useManagerStoreProducts(
    setProducts,
    setSummary,
    showToast,
    setSaving,
    confirm as unknown as Parameters<typeof useManagerStoreProducts>[4]
  );

  const orderLogic = useManagerStoreOrder(
    loadAll,
    setTab,
    showToast,
    setPrintData,
    setSaving
  );

  return {
    tab, setTab,
    products, orders, totalOrders, summary, fetchState, saving,
    toast, printData, setPrintData, search, debouncedSearch, setSearch,
    categoryFilter, setCategoryFilter, stockFilter, setStockFilter,
    currentPage, setCurrentPage,
    startDate, setStartDate, endDate, setEndDate, sortOrder, setSortOrder,
    ...productLogic,
    ...orderLogic,
    hideToast, loadAll
 };
}

