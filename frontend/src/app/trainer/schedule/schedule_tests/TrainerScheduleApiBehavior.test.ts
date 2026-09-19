import { describe, expect, it, vi } from 'vitest';
import { trainerScheduleApi } from '@/app/trainer/schedule/schedule_api/TrainerScheduleApi';
const apiFetch = vi.hoisted(() => vi.fn());
vi.mock('@/lib/api', () => ({ apiFetch }));

const LEAVE = { id: 'lr-1', trainerId: 'tr-1', startDate: '2026-09-20', endDate: '2026-09-21', reason: 'Family function', leaveType: 'Personal', status: 'PENDING', createdAt: '2026-09-17T00:00:00Z' };

describe('Trainer schedule API behavior', () => {
  it('submits leave through the module mutation and preserves the backend message', async () => {
    apiFetch.mockResolvedValueOnce({ success: true, message: 'Leave submitted', data: LEAVE });
    const result = await trainerScheduleApi.requestLeave({ startDate: '2026-09-20', endDate: '2026-09-21', reason: 'Family function', leaveType: 'Personal' });
    expect(apiFetch.mock.calls[0][1]).toMatchObject({ method: 'POST' });
    expect(result.message).toBe('Leave submitted');
    expect(result.data.id).toBe('lr-1');
  });
});
