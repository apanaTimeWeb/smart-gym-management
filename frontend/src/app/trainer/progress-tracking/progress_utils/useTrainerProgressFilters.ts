import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useCallback } from 'react';

export function useTrainerProgressFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const selectedMemberId = searchParams.get('memberId') ?? '';
  const activeTab = (searchParams.get('tab') ?? 'individual') as 'individual' | 'compare';

  const setSelectedMemberId = useCallback((id: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (id) params.set('memberId', id);
    else params.delete('memberId');
    router.push(`${pathname}?${params.toString()}`);
  }, [searchParams, pathname, router]);

  const setActiveTab = useCallback((tab: 'individual' | 'compare') => {
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
