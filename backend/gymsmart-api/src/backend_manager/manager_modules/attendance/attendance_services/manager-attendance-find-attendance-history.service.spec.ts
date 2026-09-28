// RESPONSIBILITY: Owns the backend application co-located unit-test verification.
// FLOW: Arrange isolated inputs → execute target unit → assert observable behavior and failure paths.
import { ManagerAttendanceFindAttendanceHistoryService } from '@/backend_manager/manager_modules/attendance/attendance_services/manager-attendance-find-attendance-history.service';

describe('ManagerAttendanceFindAttendanceHistoryService', () => {
  it('returns the dependency result and invokes the intended boundary exactly once', async () => {
    const expected = { marker: 'expected-result' };
    const dependency = { findAttendanceList: jest.fn().mockResolvedValue(expected) };
    const service = new ManagerAttendanceFindAttendanceHistoryService(dependency as never);
    const result = await service.findAttendanceHistory({} as never);
    expect(result).toEqual(expected);
    expect(dependency.findAttendanceList).toHaveBeenCalledTimes(1);
    expect(dependency.findAttendanceList).toHaveBeenCalledWith(expect.anything());
  });

  it('propagates a downstream failure instead of converting it to a false success', async () => {
    const failure = new Error('dependency failure');
    const dependency = { findAttendanceList: jest.fn().mockRejectedValue(failure) };
    const service = new ManagerAttendanceFindAttendanceHistoryService(dependency as never);
    await expect(service.findAttendanceHistory({} as never)).rejects.toBe(failure);
    expect(dependency.findAttendanceList).toHaveBeenCalledTimes(1);
  });
});
