// RESPONSIBILITY: Owns the backend application co-located unit-test verification.
// FLOW: Arrange isolated inputs → execute target unit → assert observable behavior and failure paths.
import { ScheduleCreateShiftService } from '@/backend_manager/manager_modules/schedule/schedule_services/manager-schedule-create-shift.service';

describe('ScheduleCreateShiftService', () => {
  it('returns the dependency result and invokes the intended boundary exactly once', async () => {
    const expected = { marker: 'expected-result' };
    const dependency = { createShift: jest.fn().mockResolvedValue(expected) };
    const service = new ScheduleCreateShiftService(dependency as never);
    const result = await service.createShift({} as never);
    expect(result).toEqual(expected);
    expect(dependency.createShift).toHaveBeenCalledTimes(1);
    expect(dependency.createShift).toHaveBeenCalledWith(expect.anything());
  });

  it('propagates a downstream failure instead of converting it to a false success', async () => {
    const failure = new Error('dependency failure');
    const dependency = { createShift: jest.fn().mockRejectedValue(failure) };
    const service = new ScheduleCreateShiftService(dependency as never);
    await expect(service.createShift({} as never)).rejects.toBe(failure);
    expect(dependency.createShift).toHaveBeenCalledTimes(1);
  });
});
