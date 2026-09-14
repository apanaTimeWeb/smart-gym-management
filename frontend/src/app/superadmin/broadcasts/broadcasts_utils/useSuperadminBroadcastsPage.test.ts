import { renderHook, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { useSuperadminBroadcastsPage } from '@/app/superadmin/broadcasts/broadcasts_utils/useSuperadminBroadcastsPage';
import { broadcastsApi } from '@/app/superadmin/broadcasts/superadmin_broadcasts_api/superadmin_broadcasts_api';
import toast from 'react-hot-toast';

vi.mock('@/app/superadmin/broadcasts/superadmin_broadcasts_api/superadmin_broadcasts_api');
vi.mock('react-hot-toast');

describe('useSuperadminBroadcastsPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('fetches broadcasts successfully', async () => {
    const mockData = { data: { broadcasts: [{ id: 'b1', title: 'Test Broadcast' }] } };
    vi.mocked(broadcastsApi.getBroadcasts).mockResolvedValue(mockData as never);
    
    const { result } = renderHook(() => useSuperadminBroadcastsPage());
    
    await waitFor(() => {
      expect(result.current.fetchState).toBe('success');
    });
    
    expect(result.current.broadcasts).toEqual(mockData.data.broadcasts);
  });
});
