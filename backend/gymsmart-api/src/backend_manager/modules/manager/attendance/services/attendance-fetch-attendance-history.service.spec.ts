// @ts-nocheck
// RESPONSIBILITY: Co-located behavioral unit proof for AttendanceFetchAttendanceHistoryService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> AttendanceFetchAttendanceHistoryService.fetchAttendanceHistory -> observable return/delegation.
import { AttendanceFetchAttendanceHistoryService } from '@/backend_manager/modules/manager/attendance/services/attendance-fetch-attendance-history.service';

describe('AttendanceFetchAttendanceHistoryService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'attendance' } as const;
    const dependency = { fetchAttendanceHistory: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new AttendanceFetchAttendanceHistoryService(dependency as never);
    const result = await service.fetchAttendanceHistory({} as never);
    expect(result).toEqual(expected);
    // @ts-ignore
    expect((dependency.fetchAttendanceHistory as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
