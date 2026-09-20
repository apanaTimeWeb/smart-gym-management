import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useCallback } from 'react';
import { PROGRESS_TAB_IDS, type ProgressTab } from '@/app/trainer/progress-tracking/progress_types/TrainerProgressTabTypes';

export function useTrainerProgressFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const selectedMemberId = searchParams.get('memberId') ?? '';
  const requestedTab = searchParams.get('tab');
  const activeTab: ProgressTab = requestedTab && PROGRESS_TAB_IDS.includes(requestedTab as ProgressTab) ? requestedTab as ProgressTab : 'individual';

  const setSelectedMemberId = useCallback((id: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (id) params.set('memberId', id);
    else params.delete('memberId');
    router.push(`${pathname}?${params.toString()}`);
  }, [searchParams, pathname, router]);

  const setActiveTab = useCallback((tab: ProgressTab) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', tab);
    router.push(`${pathname}?${params.toString()}`);
  }, [searchParams, pathname, router]);

  return {
    selectedMemberId,
    setSelectedMemberId,
    activeTab,
    setActiveTab,
  };
}
