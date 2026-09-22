// RESPONSIBILITY: Co-located behavioral unit proof for ScheduleCreateShiftService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> ScheduleCreateShiftService.createShift -> observable return/delegation.
import { ScheduleCreateShiftService } from '@/modules/manager/schedule/services/schedule-create-shift.service.ts';

describe('ScheduleCreateShiftService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'schedule' } as const;
    const dependency = { createShift: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new ScheduleCreateShiftService(dependency as never);
    const result = await service.createShift({} as never);
    expect(result).toEqual(expected);
    expect((dependency.createShift as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
