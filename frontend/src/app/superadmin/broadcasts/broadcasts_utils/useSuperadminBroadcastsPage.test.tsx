import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { useSuperadminBroadcastsPage } from '@/app/superadmin/broadcasts/broadcasts_utils/useSuperadminBroadcastsPage';
import { broadcastsApi } from '@/app/superadmin/broadcasts/superadmin_broadcasts_api/superadmin_broadcasts_api';
import { gymsApi } from '@/app/superadmin/gyms/superadmin_gyms_api/superadmin_gyms_api';

vi.mock('@/app/superadmin/broadcasts/superadmin_broadcasts_api/superadmin_broadcasts_api');
vi.mock('@/app/superadmin/gyms/superadmin_gyms_api/superadmin_gyms_api');
vi.mock('react-hot-toast');

describe('useSuperadminBroadcastsPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // gymsApi is also called — stub it to avoid hanging
    vi.mocked(gymsApi.fetchGyms).mockResolvedValue({ success: true, message: 'ok', data: [] } as never);
  });

  it('fetches broadcasts successfully', async () => {
    const mockBroadcasts = [{ id: 'b1', title: 'Test Broadcast', content: 'hello', status: 'SENT', targetGymIds: [], scheduledDate: null, sentDate: null }];
    // The API returns { data: Broadcast[] }
    vi.mocked(broadcastsApi.fetchBroadcasts).mockResolvedValue({ success: true, message: 'ok', data: mockBroadcasts } as never);

    const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
    const { result } = renderHook(() => useSuperadminBroadcastsPage(), {
      wrapper: ({ children }) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>,
    });

    await waitFor(() => {
      expect(result.current.fetchState).toBe('success');
    });

    expect(result.current.broadcasts).toEqual(mockBroadcasts);
  });
});
