// RESPONSIBILITY: Owns the backend application co-located unit-test verification.
// FLOW: Arrange isolated inputs → execute target unit → assert observable behavior and failure paths.
import { AttendanceMarkAttendanceService } from '@/backend_manager/manager_modules/attendance/attendance_services/manager-attendance-mark-attendance.service';

describe('AttendanceMarkAttendanceService', () => {
  it('returns the dependency result and invokes the intended boundary exactly once', async () => {
    const expected = { marker: 'expected-result' };
    const dependency = { markAttendance: jest.fn().mockResolvedValue(expected) };
    const service = new AttendanceMarkAttendanceService(dependency as never);
    const result = await service.markAttendance({} as never, 'test-id' as never);
    expect(result).toEqual(expected);
    expect(dependency.markAttendance).toHaveBeenCalledTimes(1);
    expect(dependency.markAttendance).toHaveBeenCalledWith(expect.anything(), expect.anything());
  });

  it('propagates a downstream failure instead of converting it to a false success', async () => {
    const failure = new Error('dependency failure');
    const dependency = { markAttendance: jest.fn().mockRejectedValue(failure) };
    const service = new AttendanceMarkAttendanceService(dependency as never);
    await expect(service.markAttendance({} as never, 'test-id' as never)).rejects.toBe(failure);
    expect(dependency.markAttendance).toHaveBeenCalledTimes(1);
  });
});
