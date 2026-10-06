'use client';
import { useCallback, useMemo } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ManagerStoreApi } from '@/app/frontend_manager/manager_store/manager_store_api/ManagerStoreApi';
import { ManagerStoreQueryKeys } from '@/app/frontend_manager/manager_store/manager_store_constants/ManagerStoreQueryKeys';
import type { Product, StoreSummary, StoreInitialData, ManagerStoreSortOrder } from '@/app/frontend_manager/manager_store/manager_store_types/ManagerStoreTypes';


/**
 * Owns server-state reads for the Store module. Query cache is the authoritative
 * source of truth; filters are sent to the API/MSW boundary rather than stored locally.
 */
/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description Coordinates store feature state and its documented UI/API boundary through useManagerStoreQueries.
 * @dependencies Uses ManagerStoreApi, ManagerStoreTypes.
 * @edge-case surfaces request errors without exposing transport details; preserves explicit loading state until the query or mutation settles.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useManagerStoreQueries owns the store feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useManagerStoreQueries(
  currentPage: number,
  sortOrder: ManagerStoreSortOrder,
  debouncedSearch: string,
  startDate: string,
  endDate: string,
  categoryFilter: string,
  stockFilter: string,
  _showToast: (msg: string, type: import('@/components/ui/manager_toast/ManagerToastTypes').ManagerToastType) => void,
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

  const productKey = ManagerStoreQueryKeys.products(productParams);
  const orderKey = ManagerStoreQueryKeys.orders(orderParams);
  const summaryKey = ManagerStoreQueryKeys.summary();

  const productsQuery = useQuery({
    queryKey: productKey,
    queryFn: async () => (await ManagerStoreApi.fetchProducts(productParams)).data ?? { products: [], total: 0 },
    initialData: initialData ? { products: initialData.products, total: initialData.products.length } : undefined });
  const ordersQuery = useQuery({
    queryKey: orderKey,
    queryFn: async () => (await ManagerStoreApi.fetchOrders(orderParams)).data ?? { orders: [], total: 0 },
    initialData: initialData ? { orders: initialData.orders, total: initialData.totalOrders } : undefined });
  const summaryQuery = useQuery({
    queryKey: summaryKey,
    queryFn: async () => (await ManagerStoreApi.fetchStoreSummary()).data ?? null,
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
    isPending: productsQuery.isPending || ordersQuery.isPending || summaryQuery.isPending,
    isError: productsQuery.isError || ordersQuery.isError || summaryQuery.isError,
    error: productsQuery.error ?? ordersQuery.error ?? summaryQuery.error,
    loadAll };
}
