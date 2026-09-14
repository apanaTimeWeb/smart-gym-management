'use client';
// RESPONSIBILITY: All data-fetching, mutation, and UI state logic for the Schedule module. Keeps components pure.
import { useState, useCallback, useEffect } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import type {
  TrainerScheduleSummary, ScheduleKPIData, ScheduleContextType,
  TrainerShift, ShiftDay,
} from '@/app/manager/schedule/schedule_types/ManagerScheduleTypes';
import type { ToastType } from '@/app/manager/manager_components/ManagerFeedback/ManagerToast';
import { MOCK_TRAINERS, MOCK_SCHEDULE_KPIS } from '@/app/manager/schedule/schedule_utils/ManagerScheduleSharedConstants';
import { useDebounce } from '@/app/manager/manager_utils/useDebounce';
import { useManagerScheduleMutations } from '@/app/manager/schedule/schedule_context/useManagerScheduleMutations';

export function useManagerScheduleLogic(): ScheduleContextType {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [trainers, setTrainers] = useState<TrainerScheduleSummary[]>([]);
  const [kpis, setKpis] = useState<ScheduleKPIData | null>(null);
  const [fetchState, setFetchState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);
  const [shiftModal, setShiftModal] = useState<{ open: boolean; editShift: TrainerShift | null; trainerId: string | null }>({
    open: false, editShift: null, trainerId: null,
  });

  const search = searchParams.get('search') ?? '';
  const selectedDay = (searchParams.get('day') as ShiftDay | 'All') ?? 'All';

  const setSearch = useCallback((val: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (val) params.set('search', val);
    else params.delete('search');
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [pathname, router, searchParams]);

  const setSelectedDay = useCallback((val: ShiftDay | 'All') => {
    const params = new URLSearchParams(searchParams.toString());
    if (val !== 'All') params.set('day', val);
    else params.delete('day');
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [pathname, router, searchParams]);

  const debouncedSearch = useDebounce(search, 300);

  const showToast = useCallback((msg: string, t: ToastType) => setToast({ message: msg, type: t }), []);
  const hideToast = useCallback(() => setToast(null), []);

  const loadAll = useCallback(async () => {
    setFetchState('loading');
    setError('');
    try {
      await new Promise(r => setTimeout(r, 400));
      setTrainers(MOCK_TRAINERS);
      setKpis(MOCK_SCHEDULE_KPIS);
      setFetchState('success');
    } catch (e) {
      const msg = (e as Error).message;
      setError(msg);
      showToast(msg, 'error');
      setFetchState('error');
    }
  }, [showToast]);

  useEffect(() => { void loadAll(); }, [loadAll]);

  const openAddShift = useCallback((trainerId: string) => {
    setShiftModal({ open: true, editShift: null, trainerId });
  }, []);

  const openEditShift = useCallback((shift: TrainerShift) => {
    setShiftModal({ open: true, editShift: shift, trainerId: shift.trainerId });
  }, []);

  const closeShiftModal = useCallback(() => {
    setShiftModal({ open: false, editShift: null, trainerId: null });
  }, []);

  const { saving, saveShift, deleteShift } = useManagerScheduleMutations(
    trainers,
    setTrainers,
    shiftModal,
    closeShiftModal,
    showToast
  );

  const filteredTrainers = debouncedSearch
    ? trainers.filter(t => t.trainerName.toLowerCase().includes(debouncedSearch.toLowerCase()) || t.trainerRole.toLowerCase().includes(debouncedSearch.toLowerCase()))
    : trainers;

  return {
    trainers: filteredTrainers,
    kpis,
    fetchState,
    error,
    toast,
    showToast,
    hideToast,
    loadAll,
    selectedDay,
    setSelectedDay,
    search,
    setSearch,
    shiftModal,
    openAddShift,
    openEditShift,
    closeShiftModal,
    saving,
    saveShift,
    deleteShift,
  };
}
