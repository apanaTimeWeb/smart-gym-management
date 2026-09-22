// @ts-nocheck
// RESPONSIBILITY: Co-located behavioral unit proof for AttendanceFetchAttendanceRecordsService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> AttendanceFetchAttendanceRecordsService.fetchAttendanceRecords -> observable return/delegation.
import { AttendanceFetchAttendanceRecordsService } from '@/backend_manager/modules/manager/attendance/services/attendance-fetch-attendance-records.service';

describe('AttendanceFetchAttendanceRecordsService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'attendance' } as const;
    const dependency = { fetchAttendanceRecords: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new AttendanceFetchAttendanceRecordsService(dependency as never);
    const result = await service.fetchAttendanceRecords({} as never);
    expect(result).toEqual(expected);
    // @ts-ignore
    expect((dependency.fetchAttendanceRecords as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
