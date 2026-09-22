// RESPONSIBILITY: Co-located behavioral unit proof for ScheduleDeleteShiftService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> ScheduleDeleteShiftService.deleteShift -> observable return/delegation.
import { ScheduleDeleteShiftService } from '@/modules/manager/schedule/services/schedule-delete-shift.service.ts';

describe('ScheduleDeleteShiftService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'schedule' } as const;
    const dependency = { deleteShift: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new ScheduleDeleteShiftService(dependency as never);
    const result = await service.deleteShift({} as never);
    expect(result).toEqual(expected);
    expect((dependency.deleteShift as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
