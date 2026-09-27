// RESPONSIBILITY: Owns the backend application co-located unit-test verification.
// FLOW: Arrange isolated inputs → execute target unit → assert observable behavior and failure paths.
import { ScheduleDeleteShiftService } from '@/backend_manager/manager_modules/schedule/schedule_services/manager-schedule-delete-shift.service';

describe('ScheduleDeleteShiftService', () => {
  it('returns the dependency result and invokes the intended boundary exactly once', async () => {
    const expected = { marker: 'expected-result' };
    const dependency = { deleteShift: jest.fn().mockResolvedValue(expected) };
    const service = new ScheduleDeleteShiftService(dependency as never);
    const result = await service.deleteShift('test-id' as never);
    expect(result).toEqual(expected);
    expect(dependency.deleteShift).toHaveBeenCalledTimes(1);
    expect(dependency.deleteShift).toHaveBeenCalledWith(expect.anything());
  });

  it('propagates a downstream failure instead of converting it to a false success', async () => {
    const failure = new Error('dependency failure');
    const dependency = { deleteShift: jest.fn().mockRejectedValue(failure) };
    const service = new ScheduleDeleteShiftService(dependency as never);
    await expect(service.deleteShift('test-id' as never)).rejects.toBe(failure);
    expect(dependency.deleteShift).toHaveBeenCalledTimes(1);
  });
});
