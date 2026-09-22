// @ts-nocheck
// RESPONSIBILITY: Co-located behavioral unit proof for ScheduleUpdateShiftService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> ScheduleUpdateShiftService.updateShift -> observable return/delegation.
import { ScheduleUpdateShiftService } from '@/backend_manager/modules/manager/schedule/services/schedule-update-shift.service';

describe('ScheduleUpdateShiftService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'schedule' } as const;
    const dependency = { updateShift: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new ScheduleUpdateShiftService(dependency as never);
    const result = await service.updateShift({} as never);
    expect(result).toEqual(expected);
    // @ts-ignore
    expect((dependency.updateShift as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
