// RESPONSIBILITY: All data-fetching, pagination, and UI state logic for the Trainer Earnings module.
'use client';
import { useState, useCallback, useEffect } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import type {
  TrainerEarningsKPIsData,
  TrainerPendingPayout,
  TrainerEarningsHistoryRow,
  TrainerEarningsContextType,
} from '@/app/trainer/earnings/earnings_types/TrainerEarningsTypes';
import { trainerEarningsApi } from '@/app/trainer/earnings/earnings_api/trainer_earnings_api';
import {
  EARNINGS_ITEMS_PER_PAGE,
} from '@/app/trainer/earnings/earnings_utils/TrainerEarningsSharedConstants';

export function useTrainerEarningsLogic(): TrainerEarningsContextType {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [kpis, setKpis] = useState<TrainerEarningsKPIsData | null>(null);
  const [pendingPayouts, setPendingPayouts] = useState<TrainerPendingPayout[]>([]);
  const [paginatedHistory, setPaginatedHistory] = useState<TrainerEarningsHistoryRow[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [fetchState, setFetchState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const search = searchParams.get('search') || '';
  const startDate = searchParams.get('startDate') || '';
  const endDate = searchParams.get('endDate') || '';

  const setUrlParam = useCallback((key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    if (key !== 'page') params.set('page', '1');
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [pathname, router, searchParams]);

  const setCurrentPage = useCallback((page: number) => setUrlParam('page', page.toString()), [setUrlParam]);
  const setSearch = useCallback((val: string) => setUrlParam('search', val || null), [setUrlParam]);
  const setStartDate = useCallback((val: string) => setUrlParam('startDate', val || null), [setUrlParam]);
  const setEndDate = useCallback((val: string) => setUrlParam('endDate', val || null), [setUrlParam]);

  const loadAll = useCallback(async () => {
    setFetchState('loading');
    setError('');
    try {
      const historyParams: Record<string, string> = {
        page: currentPage.toString(),
        limit: EARNINGS_ITEMS_PER_PAGE.toString(),
      };
      if (search) historyParams.search = search;
      if (startDate) historyParams.startDate = startDate;
      if (endDate) historyParams.endDate = endDate;

      const [kpisRes, pendingRes, historyRes] = await Promise.all([
        trainerEarningsApi.getKPIs(),
        trainerEarningsApi.getPending(),
        trainerEarningsApi.getHistory(historyParams),
      ]);
      setKpis(kpisRes.data || null);
      setPendingPayouts(pendingRes.data || []);
      // Backend must return { data: { rows, total, pages } }
      const histData = historyRes.data as any;
      setPaginatedHistory(histData?.rows || histData || []);
      setTotalPages(histData?.pages || Math.ceil((histData?.total || 0) / EARNINGS_ITEMS_PER_PAGE) || 1);
      
      setFetchState('success');
    } catch (e) {
      setError((e as Error).message);
      setFetchState('error');
    }
  }, [currentPage, search, startDate, endDate]);

  useEffect(() => {
    void loadAll();
  }, [loadAll]);

  return {
    kpis,
    pendingPayouts,
    paginatedHistory,
    fetchState,
    error,
    currentPage,
    setCurrentPage,
    totalPages,
    search,
    setSearch,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    loadAll,
  };
}

