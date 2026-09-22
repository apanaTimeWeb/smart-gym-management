// @ts-nocheck
// RESPONSIBILITY: Co-located behavioral unit proof for AttendanceFetchAttendanceStatsService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> AttendanceFetchAttendanceStatsService.fetchAttendanceStats -> observable return/delegation.
import { AttendanceFetchAttendanceStatsService } from '@/backend_manager/modules/manager/attendance/services/attendance-fetch-attendance-stats.service';

describe('AttendanceFetchAttendanceStatsService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'attendance' } as const;
    const dependency = { fetchAttendanceStats: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new AttendanceFetchAttendanceStatsService(dependency as never);
    const result = await service.fetchAttendanceStats({} as never);
    expect(result).toEqual(expected);
    // @ts-ignore
    expect((dependency.fetchAttendanceStats as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
