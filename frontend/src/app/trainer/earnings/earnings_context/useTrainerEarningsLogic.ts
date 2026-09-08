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
  MOCK_EARNINGS_KPIS,
  MOCK_PENDING_PAYOUTS,
  MOCK_EARNINGS_HISTORY,
  EARNINGS_ITEMS_PER_PAGE,
} from '@/app/trainer/earnings/earnings_utils/TrainerEarningsSharedConstants';

export function useTrainerEarningsLogic(): TrainerEarningsContextType {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [kpis, setKpis] = useState<TrainerEarningsKPIsData | null>(null);
  const [pendingPayouts, setPendingPayouts] = useState<TrainerPendingPayout[]>([]);
  const [history, setHistory] = useState<TrainerEarningsHistoryRow[]>([]);
  const [fetchState, setFetchState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const search = searchParams.get('search') || '';

  const setCurrentPage = useCallback((page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [pathname, router, searchParams]);

  const setSearch = useCallback((val: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (val) params.set('search', val);
    else params.delete('search');
    params.set('page', '1'); // reset page on search
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [pathname, router, searchParams]);

  const loadAll = useCallback(async () => {
    setFetchState('loading');
    setError('');
    try {
      // TODO: Replace with real API calls once backend is ready
      // const [kpisRes, pendingRes, historyRes] = await Promise.all([
      //   trainerEarningsApi.getKPIs(),
      //   trainerEarningsApi.getPending(),
      //   trainerEarningsApi.getHistory(),
      // ]);
      // setKpis(kpisRes.data);
      // setPendingPayouts(pendingRes.data);
      // setHistory(historyRes.data);

      await new Promise(r => setTimeout(r, 600)); // simulate network
      setKpis(MOCK_EARNINGS_KPIS);
      setPendingPayouts(MOCK_PENDING_PAYOUTS);
      setHistory(MOCK_EARNINGS_HISTORY);
      
      setFetchState('success');
    } catch (e) {
      setError((e as Error).message);
      setFetchState('error');
    }
  }, []);

  useEffect(() => {
    void loadAll();
  }, [loadAll]);

  // Client-side filtering and pagination
  const filteredHistory = history.filter(row => 
    row.description.toLowerCase().includes(search.toLowerCase()) || 
    row.type.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredHistory.length / EARNINGS_ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * EARNINGS_ITEMS_PER_PAGE;
  const paginatedHistory = filteredHistory.slice(startIndex, startIndex + EARNINGS_ITEMS_PER_PAGE);

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
    loadAll,
  };
}
