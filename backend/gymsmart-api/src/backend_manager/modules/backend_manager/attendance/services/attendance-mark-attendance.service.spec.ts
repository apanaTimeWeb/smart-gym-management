// RESPONSIBILITY: Owns the backend application co-located unit-test verification.
// FLOW: Arrange isolated inputs → execute target unit → assert observable behavior and failure paths.
import { AttendanceMarkAttendanceService } from '@/backend_manager/modules/backend_manager/attendance/services/attendance-mark-attendance.service';

describe('AttendanceMarkAttendanceService', () => {
  it('returns the dependency result and invokes the intended boundary exactly once', async () => {
    const expected = { marker: 'expected-result' };
    const dependency = { createAttendance: jest.fn().mockResolvedValue(expected) };
    const service = new AttendanceMarkAttendanceService(dependency as never);
    const result = await service.markAttendance({} as never, 'test-id' as never);
    expect(result).toEqual(expected);
    expect(dependency.createAttendance).toHaveBeenCalledTimes(1);
    expect(dependency.createAttendance).toHaveBeenCalledWith(expect.anything(), expect.anything());
  });

  it('propagates a downstream failure instead of converting it to a false success', async () => {
    const failure = new Error('dependency failure');
    const dependency = { createAttendance: jest.fn().mockRejectedValue(failure) };
    const service = new AttendanceMarkAttendanceService(dependency as never);
    await expect(service.markAttendance({} as never, 'test-id' as never)).rejects.toBe(failure);
    expect(dependency.createAttendance).toHaveBeenCalledTimes(1);
  });
});
