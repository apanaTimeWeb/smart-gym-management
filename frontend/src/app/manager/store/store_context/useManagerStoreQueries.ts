'use client';

import { useState, useCallback } from 'react';
import { storeApi } from '@/app/manager/store/store_api/ManagerStoreApi';
import type { Product, Order, StoreSummary, FetchState, StoreInitialData } from '@/app/manager/store/store_types/ManagerStoreTypes';
import type { ToastType } from '@/app/manager/manager_components/ManagerFeedback/ManagerToast';

export function useManagerStoreQueries(
  currentPage: number,
  sortOrder: 'ASC' | 'DESC',
  debouncedSearch: string,
  startDate: string,
  endDate: string,
  categoryFilter: string,
  stockFilter: string,
  showToast: (msg: string, type: ToastType) => void,
  initialData?: StoreInitialData | null
) {
  const [products, setProducts] = useState<Product[]>(initialData?.products || []);
  const [orders, setOrders] = useState<Order[]>(initialData?.orders || []);
  const [totalOrders, setTotalOrders] = useState<number>(initialData?.totalOrders || 0);
  const [summary, setSummary] = useState<StoreSummary | null>(initialData?.summary || null);
  const [fetchState, setFetchState] = useState<FetchState>(initialData ? 'success' : 'loading');

  const loadAll = useCallback(async () => {
    setFetchState('loading');
    try {
      const params: Record<string, string> = { 
        sortOrder
      };
      if (startDate) params.startDate = startDate;
      if (endDate) params.endDate = endDate;

      const [productsRes, ordersRes, summaryRes] = await Promise.all([
        storeApi.getProducts(params),
        storeApi.getOrders(params),
        storeApi.getStoreSummary(),
      ]);
      let fetchedProducts = Array.isArray(productsRes.data) ? productsRes.data : (productsRes.data as { products?: unknown[] }).products as Product[] || [];
      let fetchedOrders = ordersRes.data?.orders || [];

      if (debouncedSearch || categoryFilter !== 'ALL' || stockFilter !== 'ALL') {
        const q = debouncedSearch.toLowerCase();
        fetchedProducts = fetchedProducts.filter((p: Product) => {
          const matchesSearch = !debouncedSearch || p.name?.toLowerCase().includes(q) || (p.category && p.category?.toLowerCase().includes(q));
          const matchesCategory = categoryFilter === 'ALL' || p.category === categoryFilter;
          const matchesStock = stockFilter === 'ALL' || (stockFilter === 'IN_STOCK' ? p.stock > 0 : p.stock === 0);
          return matchesSearch && matchesCategory && matchesStock;
        });
        
        if (debouncedSearch) {
          fetchedOrders = fetchedOrders.filter((o: Order) => 
            o.id?.toLowerCase().includes(q) || (o.notes && o.notes?.toLowerCase().includes(q))
          );
        }
      }

      if (startDate) {
        const start = new Date(startDate).getTime();
        fetchedOrders = fetchedOrders.filter((o: Order) => new Date(o.createdAt).getTime() >= start);
      }
      if (endDate) {
        const end = new Date(endDate).getTime();
        fetchedOrders = fetchedOrders.filter((o: Order) => new Date(o.createdAt).getTime() <= end + 86400000);
      }

      fetchedOrders.sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return sortOrder === 'ASC' ? dateA - dateB : dateB - dateA;
      });

      setProducts(fetchedProducts);
      setOrders(fetchedOrders);
      setTotalOrders(ordersRes.data?.total || 0);
      setSummary(summaryRes.data);
    } catch (e) { 
      showToast((e as Error).message, 'error'); 
      setFetchState('error');
    } finally { 
      setFetchState('success'); 
    }
  }, [showToast, currentPage, debouncedSearch, categoryFilter, stockFilter, startDate, endDate, sortOrder]);

  return {
    products, setProducts,
    orders, setOrders,
    totalOrders,
    summary, setSummary,
    fetchState, loadAll
  };
}
