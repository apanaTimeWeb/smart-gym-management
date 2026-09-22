// RESPONSIBILITY: Co-located behavioral unit proof for ScheduleFetchScheduleService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> ScheduleFetchScheduleService.fetchSchedule -> observable return/delegation.
import { ScheduleFetchScheduleService } from '@/modules/manager/schedule/services/schedule-fetch-schedule.service.ts';

describe('ScheduleFetchScheduleService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'schedule' } as const;
    const dependency = { fetchSchedule: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new ScheduleFetchScheduleService(dependency as never);
    const result = await service.fetchSchedule({} as never);
    expect(result).toEqual(expected);
    expect((dependency.fetchSchedule as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
