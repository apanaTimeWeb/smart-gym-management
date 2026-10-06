import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { gymsApi } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_api/SuperadminGymsApi';
import { useSuperadminGymsGymMutations } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_hooks/useSuperadminGymsGymMutations';

import type { ReactNode } from 'react';



const confirm = vi.fn().mockResolvedValue(true);
vi.mock('@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_api/SuperadminGymsApi', () => ({ gymsApi: { impersonateTenant: vi.fn(), setGhostLoginCookie: vi.fn(), updateGymStatus: vi.fn() } }));
vi.mock('@/components/ui/Feedback/ConfirmProvider', () => ({ useConfirm: () => ({ confirm }) }));
vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
vi.mock('sonner', () => ({ toast: { success: vi.fn(), error: vi.fn() } }));
vi.mock('@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_store/useSuperadminGymsGymGhostLoginStore', () => ({ useSuperadminGymsGymGhostLoginStore: (selector: (state: { startGhostLogin: (input: unknown) => void }) => unknown) => selector({ startGhostLogin: vi.fn() }) }));

describe('useSuperadminGymsGymMutations', () => {
  it('confirms a tenant suspension and forwards the canonical status to the API', async () => {
    vi.mocked(gymsApi.updateGymStatus).mockResolvedValue({ success: true, message: 'Suspended', data: { id: 'gym-1' } } as never);
    const client = new QueryClient({ defaultOptions: { mutations: { retry: false } } });
    const wrapper = ({ children }: { children: ReactNode }) => <QueryClientProvider client={client}>{children}</QueryClientProvider>;
    const { result } = renderHook(() => useSuperadminGymsGymMutations([{ id: 'gym-1', name: 'Gym Alpha' }] as never), { wrapper });
    await result.current.onSuspendClick({ preventDefault: vi.fn(), stopPropagation: vi.fn() } as never, 'gym-1');
    expect(gymsApi.updateGymStatus).toHaveBeenCalledWith('gym-1', expect.any(String), expect.any(String));
  });
});
