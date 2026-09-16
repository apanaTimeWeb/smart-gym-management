// RESPONSIBILITY: Custom hook managing Trainer Sessions URL-based filters.
// DATA FLOW: URL search params <-> useTrainerSessionsFilters <-> useTrainerSessionsQuery
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useCallback } from 'react';
import { type SessionFilter, SessionFilterSchema } from '@/app/trainer/sessions/sessions_types/TrainerSessionsTypes';

export function useTrainerSessionsFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const rawFilter = searchParams.get('filter') ?? 'All';
  const parsedFilter = SessionFilterSchema.safeParse(rawFilter);
  const filter = parsedFilter.success ? parsedFilter.data : 'All';

  const date = searchParams.get('date') ?? new Date().toISOString().split('T')[0] ?? '';

  const setFilter = useCallback((newFilter: SessionFilter) => {
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
