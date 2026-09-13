import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/app/superadmin/superadmin_types/superadmin_types';
import { SuperadminUrlConfig } from '@/app/superadmin/superadmin_url_config';
import type { Broadcast } from '@/app/superadmin/broadcasts/superadmin_broadcasts_types/superadmin_broadcasts_types';

import { MOCK_SUPERADMIN_BROADCASTS } from '@/app/superadmin/broadcasts/superadmin_broadcasts_api/SuperadminBroadcastsMockData';

let mockBroadcasts = [...MOCK_SUPERADMIN_BROADCASTS];

export const broadcastsApi = {
  fetchBroadcasts: async (params?: Record<string, string>) => {
    await new Promise(r => setTimeout(r, 400));
    return { success: true, message: 'Success', data: mockBroadcasts };
  },
  createBroadcast: async (body: Partial<Broadcast>) => {
    await new Promise(r => setTimeout(r, 500));
    const newBroadcast = { ...body, id: `b${Date.now()}` } as Broadcast;
    mockBroadcasts = [newBroadcast, ...mockBroadcasts];
    return { success: true, message: 'Created', data: newBroadcast };
  },
  updateBroadcast: async (id: string, body: Partial<Broadcast>) => {
    await new Promise(r => setTimeout(r, 500));
    mockBroadcasts = mockBroadcasts.map(b => b.id === id ? { ...b, ...body } : b);
    return { success: true, message: 'Updated', data: mockBroadcasts.find(b => b.id === id) as Broadcast };
  },
  deleteBroadcast: async (id: string) => {
    await new Promise(r => setTimeout(r, 400));
    mockBroadcasts = mockBroadcasts.filter(b => b.id !== id);
    return { success: true, message: 'Deleted', data: undefined };
  },
  send: async (id: string) => {
    await new Promise(r => setTimeout(r, 600));
    mockBroadcasts = mockBroadcasts.map(b => b.id === id ? { ...b, status: 'SENT', sentDate: new Date().toISOString() } : b);
    return { success: true, message: 'Sent', data: undefined };
  },
  fetchRecipientCount: async () => {
    await new Promise(r => setTimeout(r, 200));
    return { success: true, message: 'Success', data: { count: 125 } };
  },
};
