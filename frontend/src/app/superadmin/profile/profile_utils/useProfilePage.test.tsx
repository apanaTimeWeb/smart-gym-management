import { renderHook, act } from '@testing-library/react';
import { useProfilePage } from '@/app/superadmin/profile/profile_utils/useProfilePage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
  },
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

describe('useProfilePage hook', () => {
  it('initializes with default state', () => {
    const { result } = renderHook(() => useProfilePage(), { wrapper });

    expect(result.current.activeTab).toBe('personal');
    expect(result.current.personalState).toBe('idle');
  });

  it('changes active tab', () => {
    const { result } = renderHook(() => useProfilePage(), { wrapper });

    act(() => {
      result.current.setActiveTab('security');
    });

    expect(result.current.activeTab).toBe('security');
  });
});
