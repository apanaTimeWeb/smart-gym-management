"use client";
// RESPONSIBILITY: Custom hook managing Trainer Sessions URL-based filters.
// DATA FLOW: URL search params <-> useTrainerSessionsFilters <-> useTrainerSessionsQuery
import { useCallback } from 'react';

import { format } from 'date-fns';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';

import { TrainerSessionsSessionFilterSchema } from '@/app/frontend_trainer/trainer_sessions/trainer_sessions_schemas/TrainerSessionsDomainSchemas';

import type { TrainerSessionsSessionFilter } from '@/app/frontend_trainer/trainer_sessions/trainer_sessions_types/TrainerSessionsTypes';





;

/**
 * @description Custom hook managing Trainer Sessions URL-based filters.
 * @dependencies URL search params <-> useTrainerSessionsFilters <-> useTrainerSessionsQuery
 * @edge-case Preserves documented loading, empty, error, accessibility, and recovery behavior without introducing undocumented business fallbacks.
 */
/**
 * @description Manages TrainerSessionsFilters state and data flow for the sessions feature while keeping server data in TanStack Query and UI-only state at the module boundary.
 * @dependencies Uses only documented sessions module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, retry, URL-state, and cleanup behavior on repeated interaction.
 */
export function useTrainerSessionsFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const rawFilter = searchParams.get('filter') ?? 'All';
  const parsedFilter = TrainerSessionsSessionFilterSchema.safeParse(rawFilter);
  const filter = parsedFilter.success ? parsedFilter.data : 'All';

  const date = searchParams.get('date') ?? format(new Date(), 'yyyy-MM-dd');

  const setFilter = useCallback((newFilter: TrainerSessionsSessionFilter) => {
    const params = new URLSearchParams(searchParams.toString());
    if (newFilter && newFilter !== 'All') {
      params.set('filter', newFilter);
    } else {
      params.delete('filter');
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }, [searchParams, router, pathname]);

  const setDate = useCallback((newDate: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (newDate) {
      params.set('date', newDate);
    } else {
      params.delete('date');
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }, [searchParams, router, pathname]);

  return { filter, setFilter, date, setDate };
}
