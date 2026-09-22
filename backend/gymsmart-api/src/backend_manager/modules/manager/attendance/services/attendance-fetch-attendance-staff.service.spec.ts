// RESPONSIBILITY: Co-located behavioral unit proof for AttendanceFetchAttendanceStaffService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> AttendanceFetchAttendanceStaffService.fetchAttendanceStaff -> observable return/delegation.
import { AttendanceFetchAttendanceStaffService } from '@/modules/manager/attendance/services/attendance-fetch-attendance-staff.service.ts';

describe('AttendanceFetchAttendanceStaffService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'attendance' } as const;
    const dependency = { fetchAttendanceStaff: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new AttendanceFetchAttendanceStaffService(dependency as never);
    const result = await service.fetchAttendanceStaff({} as never);
    expect(result).toEqual(expected);
    expect((dependency.fetchAttendanceStaff as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
