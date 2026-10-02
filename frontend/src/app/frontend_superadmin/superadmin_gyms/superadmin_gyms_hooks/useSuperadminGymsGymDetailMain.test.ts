import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useSuperadminGymsGymDetailMain } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_hooks/useSuperadminGymsGymDetailMain';



const push = vi.fn();
const startGhostLogin = vi.fn().mockResolvedValue(undefined);
vi.mock('next/navigation', () => ({ useRouter: () => ({ push }), usePathname: () => '' }));
vi.mock('next-intl', () => ({ useLocale: () => 'en' }));
vi.mock('@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_hooks/useSuperadminGymsGymDetail', () => ({ useSuperadminGymsGymDetail: () => ({ data: { data: { gymId: 'GYM-1', gymName: 'Alpha Gym', plan: 'PRO', adminEmail: 'admin@example.com', status: 'ACTIVE' } }, isPending: false }) }));
vi.mock('@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_hooks/useSuperadminGymsGymDetailActions', () => ({ useSuperadminGymsGymDetailActions: () => ({ startGhostLogin, isStartingGhostLogin: false }) }));

describe('useSuperadminGymsGymDetailMain', () => {
  it('preserves resource identity and delegates navigation and ghost login', async () => {
    const { result } = renderHook(() => useSuperadminGymsGymDetailMain('GYM-1'));
    expect(result.current.gym?.gymId).toBe('GYM-1');
    act(() => result.current.goBackToGyms());
    expect(push).toHaveBeenCalled();
    await act(async () => { await result.current.handleGhostLogin(); });
    expect(startGhostLogin).toHaveBeenCalledWith(expect.objectContaining({ id: 'GYM-1' }));
  });
});
