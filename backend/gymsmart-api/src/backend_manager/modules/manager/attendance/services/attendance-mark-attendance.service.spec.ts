// RESPONSIBILITY: Co-located behavioral unit proof for AttendanceMarkAttendanceService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> AttendanceMarkAttendanceService.markAttendance -> observable return/delegation.
import { AttendanceMarkAttendanceService } from '@/modules/manager/attendance/services/attendance-mark-attendance.service.ts';

describe('AttendanceMarkAttendanceService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'attendance' } as const;
    const dependency = { markAttendance: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new AttendanceMarkAttendanceService(dependency as never);
    const result = await service.markAttendance({} as never);
    expect(result).toEqual(expected);
    expect((dependency.markAttendance as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
