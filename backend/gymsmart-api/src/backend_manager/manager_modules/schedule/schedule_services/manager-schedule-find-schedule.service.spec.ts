// RESPONSIBILITY: Owns the backend application co-located unit-test verification.
// FLOW: Arrange isolated inputs → execute target unit → assert observable behavior and failure paths.
import { ScheduleFindScheduleService } from '@/backend_manager/manager_modules/schedule/schedule_services/manager-schedule-find-schedule.service';

describe('ScheduleFindScheduleService', () => {
  it('returns the dependency result and invokes the intended boundary exactly once', async () => {
    const expected = { marker: 'expected-result' };
    const dependency = { findScheduleList: jest.fn().mockResolvedValue(expected) };
    const service = new ScheduleFindScheduleService(dependency as never);
    const result = await service.findSchedule({} as never);
    expect(result).toEqual(expected);
    expect(dependency.findScheduleList).toHaveBeenCalledTimes(1);
    expect(dependency.findScheduleList).toHaveBeenCalledWith(expect.anything());
  });

  it('propagates a downstream failure instead of converting it to a false success', async () => {
    const failure = new Error('dependency failure');
    const dependency = { findScheduleList: jest.fn().mockRejectedValue(failure) };
    const service = new ScheduleFindScheduleService(dependency as never);
    await expect(service.findSchedule({} as never)).rejects.toBe(failure);
    expect(dependency.findScheduleList).toHaveBeenCalledTimes(1);
  });
});
