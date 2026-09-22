// RESPONSIBILITY: Co-located behavioral unit proof for MembersFetchMemberAttendanceService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> MembersFetchMemberAttendanceService.fetchMemberAttendance -> observable return/delegation.
import { MembersFetchMemberAttendanceService } from '@/modules/manager/members/services/members-fetch-member-attendance.service.ts';

describe('MembersFetchMemberAttendanceService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'members' } as const;
    const dependency = { fetchMemberAttendance: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new MembersFetchMemberAttendanceService(dependency as never);
    const result = await service.fetchMemberAttendance({} as never);
    expect(result).toEqual(expected);
    expect((dependency.fetchMemberAttendance as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
