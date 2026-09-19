'use client';
// DATA FLOW: Manager Store API → TanStack Query cache → useManagerStoreQueries → Manager Store UI.
/** Manages UseStoreQueries for the Manager module. */
import { useCallback, useMemo } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { storeApi } from '@/app/manager/store/store_api/ManagerStoreApi';
import type { Product, Order, StoreSummary, StoreInitialData, ManagerStoreSortOrder } from '@/app/manager/store/store_types/ManagerStoreTypes';

/**
 * Owns server-state reads for the Store module. Query cache is the authoritative
 * source of truth; filters are sent to the API/MSW boundary rather than stored locally.
 */
export function useManagerStoreQueries(
  currentPage: number,
  sortOrder: ManagerStoreSortOrder,
  debouncedSearch: string,
  startDate: string,
  endDate: string,
  categoryFilter: string,
  stockFilter: string,
  _showToast: (msg: string, type: import('@/app/manager/manager_components/ManagerFeedback/manager_feedback_types/ManagerToastTypes').ManagerToastType) => void,
  initialData?: StoreInitialData | null,
) {
  const queryClient = useQueryClient();
  const productParams = useMemo(() => ({
    page: String(currentPage),
    limit: '12',
    search: debouncedSearch,
    category: categoryFilter,
    stock: stockFilter,
    startDate,
    endDate,
    sortOrder }), [currentPage, debouncedSearch, categoryFilter, stockFilter, startDate, endDate, sortOrder]);
  const orderParams = useMemo(() => ({
    page: String(currentPage),
    limit: '10',
    search: debouncedSearch,
    startDate,
    endDate,
    sortOrder }), [currentPage, debouncedSearch, startDate, endDate, sortOrder]);

  const productKey = ['manager', 'store', 'products', productParams] as const;
  const orderKey = ['manager', 'store', 'orders', orderParams] as const;
  const summaryKey = ['manager', 'store', 'summary'] as const;

  const productsQuery = useQuery({
    queryKey: productKey,
    queryFn: async () => (await storeApi.fetchProducts(productParams)).data ?? { products: [], total: 0 },
    initialData: initialData ? { products: initialData.products, total: initialData.products.length } : undefined });
  const ordersQuery = useQuery({
    queryKey: orderKey,
    queryFn: async () => (await storeApi.fetchOrders(orderParams)).data ?? { orders: [], total: 0 },
    initialData: initialData ? { orders: initialData.orders, total: initialData.totalOrders } : undefined });
  const summaryQuery = useQuery({
    queryKey: summaryKey,
    queryFn: async () => (await storeApi.fetchStoreSummary()).data ?? null,
    initialData: initialData?.summary ?? undefined });

  const setProducts = useCallback((updater: Product[] | ((previous: Product[]) => Product[])) => {
    queryClient.setQueryData<{ products: Product[]; total: number }>(productKey, (previous) => {
      const current = previous?.products ?? [];
      const products = typeof updater === 'function' ? updater(current) : updater;
      return { products, total: products.length };
    });
  }, [productKey, queryClient]);

  const setSummary = useCallback((updater: StoreSummary | null | ((previous: StoreSummary | null) => StoreSummary | null)) => {
    queryClient.setQueryData<StoreSummary | null>(summaryKey, (previous) =>
      typeof updater === 'function' ? updater(previous ?? null) : updater,
    );
  }, [queryClient]);

  const loadAll = useCallback(async () => {
    await Promise.all([
      productsQuery.refetch(),
      ordersQuery.refetch(),
      summaryQuery.refetch(),
    ]);
  }, [ordersQuery, productsQuery, summaryQuery]);

  return {
    products: productsQuery.data?.products ?? [],
    setProducts,
    orders: ordersQuery.data?.orders ?? [],
    totalOrders: ordersQuery.data?.total ?? 0,
    summary: summaryQuery.data ?? null,
    setSummary,
    isLoading: productsQuery.isPending || ordersQuery.isPending || summaryQuery.isPending,
    isError: productsQuery.isError || ordersQuery.isError || summaryQuery.isError,
    error: productsQuery.error ?? ordersQuery.error ?? summaryQuery.error,
    loadAll };
}
