// RESPONSIBILITY: Renders the use Superadmin Profile Page.test component and its associated UI logic.
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, act } from '@testing-library/react';
import { beforeEach } from 'vitest';

import { resetSuperadminProfileMockState } from '@/app/frontend_superadmin/superadmin_profile/superadmin_profile_mocks/superadmin_profile_mocks_handlers/SuperadminProfileMockHandlers';
import { useSuperadminProfilePage } from '@/app/frontend_superadmin/superadmin_profile/superadmin_profile_hooks/useSuperadminProfilePage';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: { retry: false },
    },
});
const wrapper = ({ children }: {
    children: React.ReactNode;
}) => (<QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>);
beforeEach(() => {
  resetSuperadminProfileMockState();
});

describe('useSuperadminProfilePage hook', () => {
    it('initializes with default state', () => {
        const { result } = renderHook(() => useSuperadminProfilePage(), { wrapper });
        expect(result.current.activeTab).toBe('personal');
        expect(result.current.personalState).toBe('idle');
    });
    it('changes active tab', () => {
        const { result } = renderHook(() => useSuperadminProfilePage(), { wrapper });
        act(() => {
            result.current.setActiveTab('security');
        });
        expect(result.current.activeTab).toBe('security');
    });
});
