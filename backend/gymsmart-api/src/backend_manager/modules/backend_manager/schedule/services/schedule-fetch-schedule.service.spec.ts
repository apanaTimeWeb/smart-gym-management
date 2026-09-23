// RESPONSIBILITY: Owns the backend application co-located unit-test verification.
// FLOW: Arrange isolated inputs → execute target unit → assert observable behavior and failure paths.
import { ScheduleFetchScheduleService } from '@/backend_manager/modules/backend_manager/schedule/services/schedule-fetch-schedule.service';

describe('ScheduleFetchScheduleService', () => {
  it('returns the dependency result and invokes the intended boundary exactly once', async () => {
    const expected = { marker: 'expected-result' };
    const dependency = { findScheduleList: jest.fn().mockResolvedValue(expected) };
    const service = new ScheduleFetchScheduleService(dependency as never);
    const result = await service.fetchSchedule({} as never);
    expect(result).toEqual(expected);
    expect(dependency.findScheduleList).toHaveBeenCalledTimes(1);
    expect(dependency.findScheduleList).toHaveBeenCalledWith(expect.anything());
  });

  it('propagates a downstream failure instead of converting it to a false success', async () => {
    const failure = new Error('dependency failure');
    const dependency = { findScheduleList: jest.fn().mockRejectedValue(failure) };
    const service = new ScheduleFetchScheduleService(dependency as never);
    await expect(service.fetchSchedule({} as never)).rejects.toBe(failure);
    expect(dependency.findScheduleList).toHaveBeenCalledTimes(1);
  });
});
