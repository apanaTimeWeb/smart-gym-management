// RESPONSIBILITY: Owns the backend application co-located unit-test verification.
// FLOW: Arrange isolated inputs → execute target unit → assert observable behavior and failure paths.
import { ScheduleUpdateShiftService } from '@/backend_manager/modules/backend_manager/schedule/services/schedule-update-shift.service';

describe('ScheduleUpdateShiftService', () => {
  it('returns the dependency result and invokes the intended boundary exactly once', async () => {
    const expected = { marker: 'expected-result' };
    const dependency = { updateScheduleById: jest.fn().mockResolvedValue(expected) };
    const service = new ScheduleUpdateShiftService(dependency as never);
    const result = await service.updateShift({} as never, 'test-id' as never);
    expect(result).toEqual(expected);
    expect(dependency.updateScheduleById).toHaveBeenCalledTimes(1);
    expect(dependency.updateScheduleById).toHaveBeenCalledWith(expect.anything(), expect.anything());
  });

  it('propagates a downstream failure instead of converting it to a false success', async () => {
    const failure = new Error('dependency failure');
    const dependency = { updateScheduleById: jest.fn().mockRejectedValue(failure) };
    const service = new ScheduleUpdateShiftService(dependency as never);
    await expect(service.updateShift({} as never, 'test-id' as never)).rejects.toBe(failure);
    expect(dependency.updateScheduleById).toHaveBeenCalledTimes(1);
  });
});
