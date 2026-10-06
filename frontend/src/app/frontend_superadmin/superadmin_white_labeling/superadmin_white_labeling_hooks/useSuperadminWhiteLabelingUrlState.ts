// DATA FLOW: Feature API/query state → custom hook → owning component/store → UI result.
'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import type { SuperadminWhiteLabelingStatusFilter } from '@/app/frontend_superadmin/superadmin_white_labeling/superadmin_white_labeling_constants/SuperadminWhiteLabelingConstants';

/**
 * @description Owns canonical URL synchronization for white-labeling list search and status filters.
 * @dependencies Uses only Next.js navigation primitives and the module status filter type.
 * @edge-case Removes default values from the URL so equivalent states do not create duplicate query identities.
 */
export function useSuperadminWhiteLabelingUrlState() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.get('search') ?? '';
  const rawStatus = searchParams.get('status') ?? 'all';
  const status: SuperadminWhiteLabelingStatusFilter = rawStatus === 'pending' || rawStatus === 'active' || rawStatus === 'failed' ? rawStatus : 'all';

  const setState = (next: { search?: string; status?: SuperadminWhiteLabelingStatusFilter }) => {
    const params = new URLSearchParams(searchParams.toString());
    const nextSearch = next.search ?? search;
    const nextStatus = next.status ?? status;
    nextSearch ? params.set('search', nextSearch) : params.delete('search');
    nextStatus !== 'all' ? params.set('status', nextStatus) : params.delete('status');
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  return { search, status, setState };
}
