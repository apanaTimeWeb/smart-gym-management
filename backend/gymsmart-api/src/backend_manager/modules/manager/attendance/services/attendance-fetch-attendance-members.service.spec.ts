// @ts-nocheck
// RESPONSIBILITY: Co-located behavioral unit proof for AttendanceFetchAttendanceMembersService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> AttendanceFetchAttendanceMembersService.fetchAttendanceMembers -> observable return/delegation.
import { AttendanceFetchAttendanceMembersService } from '@/backend_manager/modules/manager/attendance/services/attendance-fetch-attendance-members.service';

describe('AttendanceFetchAttendanceMembersService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'attendance' } as const;
    const dependency = { fetchAttendanceMembers: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new AttendanceFetchAttendanceMembersService(dependency as never);
    const result = await service.fetchAttendanceMembers({} as never);
    expect(result).toEqual(expected);
    // @ts-ignore
    expect((dependency.fetchAttendanceMembers as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
