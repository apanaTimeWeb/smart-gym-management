import { createElement } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, act, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { gymsApi } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_api/SuperadminGymsApi';
import { useSuperadminGymsAddGymFormSubmit } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_hooks/useSuperadminGymsAddGymFormSubmit';

import type { ReactNode } from 'react';



const confirm = vi.fn().mockResolvedValue(true);
const push = vi.fn();
vi.mock('@/components/ui/Feedback/ConfirmProvider', () => ({ useConfirm: () => ({ confirm }) }));
vi.mock('next/navigation', () => ({ useRouter: () => ({ push }) }));
vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
vi.mock('sonner', () => ({ toast: { success: vi.fn(), error: vi.fn() } }));
vi.mock('@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_api/SuperadminGymsApi', () => ({ gymsApi: { provisionGym: vi.fn() } }));

describe('useSuperadminGymsAddGymFormSubmit', () => {
  it('requires confirmation and provisions the gym through the feature API before navigating', async () => {
    vi.mocked(gymsApi.provisionGym).mockResolvedValue({ success: true, message: 'Provisioned', data: { id: 'gym-1', name: 'Gym Alpha' } } as never);
    const client = new QueryClient({ defaultOptions: { mutations: { retry: false } } });
    const wrapper = ({ children }: { children: ReactNode }) => createElement(QueryClientProvider, { client }, children);
    const { result } = renderHook(() => useSuperadminGymsAddGymFormSubmit(), { wrapper });
    const form = { gymName: 'Gym Alpha', ownerName: 'Owner', adminEmail: 'owner@example.com', phone: '9876543210', plan: 'pro', temporaryPassword: 'Password123' } as never;
    await act(async () => { await result.current.onSubmit(form); });
    await waitFor(() => expect(gymsApi.provisionGym).toHaveBeenCalledTimes(1));
    expect(confirm).toHaveBeenCalledTimes(1);
    expect(push).toHaveBeenCalled();
  });
});
