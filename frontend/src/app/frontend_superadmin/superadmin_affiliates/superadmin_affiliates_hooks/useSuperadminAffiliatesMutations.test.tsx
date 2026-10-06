import { renderHook, act } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useSuperadminAffiliatesMutations } from '@/app/frontend_superadmin/superadmin_affiliates/superadmin_affiliates_hooks/useSuperadminAffiliatesMutations';



const mutate = vi.fn(async <T,>(execute: () => Promise<unknown>, options: { onSuccess?: (value: unknown) => void }) => {
  const result = await execute();
  options.onSuccess?.(result);
  return result as T;
});
const confirm = vi.fn().mockResolvedValue(true);
vi.mock('@/app/frontend_superadmin/superadmin_affiliates/superadmin_affiliates_hooks/useSuperadminAffiliatesMutation', () => ({ useSuperadminAffiliatesMutation: () => ({ mutate, isMutating: false }) }));
vi.mock('@/components/ui/Feedback/ConfirmProvider', () => ({ useConfirm: () => ({ confirm }) }));
vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
vi.mock('@/app/frontend_superadmin/superadmin_affiliates/superadmin_affiliates_api/SuperadminAffiliatesApi', () => ({ affiliatesApi: { createAffiliate: vi.fn(), updateAffiliate: vi.fn(), updateAffiliateStatus: vi.fn(), deleteAffiliate: vi.fn(), payAffiliateCommission: vi.fn() } }));

describe('useSuperadminAffiliatesMutations', () => {
  it('deletes only the confirmed affiliate from the caller-owned collection', async () => {
    const updateCached = vi.fn((updater: (items: Array<{ id: string }>) => Array<{ id: string }>) => updater([{ id: 'a-1' }, { id: 'a-2' }]));
    const { result } = renderHook(() => useSuperadminAffiliatesMutations(updateCached as never, vi.fn(), vi.fn(), { reset: vi.fn() } as never, null));
    await act(async () => { await result.current.handleDeleteAffiliate('a-1'); });
    expect(confirm).toHaveBeenCalledTimes(1);
    expect(updateCached).toHaveBeenCalledTimes(1);
    const updated = (updateCached as typeof vi.fn).mock.results[0]?.value;
    expect(updated).toEqual([{ id: 'a-2' }]);
  });
});
