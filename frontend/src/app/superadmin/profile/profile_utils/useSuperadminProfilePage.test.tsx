// RESPONSIBILITY: Renders the use Superadmin Profile Page.test component and its associated UI logic.
import { renderHook, act } from '@testing-library/react';
import { useSuperadminProfilePage } from '@/app/superadmin/profile/profile_utils/useSuperadminProfilePage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
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
