import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useTrainerScheduleMutations } from '@/app/frontend_trainer/trainer_schedule/trainer_schedule_hooks/useTrainerScheduleMutations';

const invalidateQueries = vi.fn().mockResolvedValue(undefined);
const updateAvailabilityApi = vi.fn().mockResolvedValue({ message: 'updated' });
const requestLeaveApi = vi.fn().mockResolvedValue({ message: 'requested' });

vi.mock('@tanstack/react-query', () => ({
  useQueryClient: () => ({ invalidateQueries }),
  useMutation: (options: { mutationFn: (variables: unknown) => Promise<unknown>; onSuccess?: () => void }) => ({
    mutateAsync: vi.fn(async (variables: unknown) => { const data = await options.mutationFn(variables); options.onSuccess?.(); return data; }),
    isPending: false,
  }),
}));
vi.mock('@/app/frontend_trainer/trainer_schedule/trainer_schedule_api/TrainerScheduleApi', () => ({ TrainerScheduleApi: { updateAvailability: updateAvailabilityApi, requestLeave: requestLeaveApi } }));

describe('useTrainerScheduleMutations', () => {
  beforeEach(() => vi.clearAllMocks());

  it('passes the idempotency key to availability updates and invalidates the schedule', async () => {
    const { result } = renderHook(() => useTrainerScheduleMutations());
    const data = { monday: { enabled: true, start: '06:00', end: '14:00' } } as never;
    await act(async () => { await result.current.updateAvailability({ data, idempotencyKey: 'availability-1' }); });
    expect(updateAvailabilityApi).toHaveBeenCalledWith(data, 'availability-1');
    expect(invalidateQueries).toHaveBeenCalledWith({ queryKey: ['trainer_schedule', 'schedule'] });
  });

  it('passes the idempotency key to leave requests', async () => {
    const { result } = renderHook(() => useTrainerScheduleMutations());
    const data = { startDate: '2026-10-10', endDate: '2026-10-12', type: 'LEAVE', reason: 'Personal' } as never;
    await act(async () => { await result.current.requestLeave({ data, idempotencyKey: 'leave-1' }); });
    expect(requestLeaveApi).toHaveBeenCalledWith(data, 'leave-1');
  });
});
