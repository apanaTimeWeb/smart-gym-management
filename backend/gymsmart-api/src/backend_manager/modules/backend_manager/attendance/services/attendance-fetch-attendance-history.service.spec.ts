// RESPONSIBILITY: Owns the backend application co-located unit-test verification.
// FLOW: Arrange isolated inputs → execute target unit → assert observable behavior and failure paths.
import { AttendanceFetchAttendanceHistoryService } from '@/backend_manager/modules/backend_manager/attendance/services/attendance-fetch-attendance-history.service';

describe('AttendanceFetchAttendanceHistoryService', () => {
  it('returns the dependency result and invokes the intended boundary exactly once', async () => {
    const expected = { marker: 'expected-result' };
    const dependency = { findAttendanceList: jest.fn().mockResolvedValue(expected) };
    const service = new AttendanceFetchAttendanceHistoryService(dependency as never);
    const result = await service.fetchAttendanceHistory({} as never);
    expect(result).toEqual(expected);
    expect(dependency.findAttendanceList).toHaveBeenCalledTimes(1);
    expect(dependency.findAttendanceList).toHaveBeenCalledWith(expect.anything());
  });

  it('propagates a downstream failure instead of converting it to a false success', async () => {
    const failure = new Error('dependency failure');
    const dependency = { findAttendanceList: jest.fn().mockRejectedValue(failure) };
    const service = new AttendanceFetchAttendanceHistoryService(dependency as never);
    await expect(service.fetchAttendanceHistory({} as never)).rejects.toBe(failure);
    expect(dependency.findAttendanceList).toHaveBeenCalledTimes(1);
  });
});
