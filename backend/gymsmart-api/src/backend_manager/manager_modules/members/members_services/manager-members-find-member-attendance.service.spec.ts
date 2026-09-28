// RESPONSIBILITY: Owns the backend application co-located unit-test verification.
// FLOW: Arrange isolated inputs → execute target unit → assert observable behavior and failure paths.
import { MembersFindMemberAttendanceService } from '@/backend_manager/manager_modules/members/members_services/manager-members-find-member-attendance.service';

describe('MembersFindMemberAttendanceService', () => {
  it('returns the dependency result and invokes the intended boundary exactly once', async () => {
    const expected = { marker: 'expected-result' };
    const dependency = { findMembersList: jest.fn().mockResolvedValue(expected) };
    const service = new MembersFindMemberAttendanceService(dependency as never);
    const result = await service.findMemberAttendance('test-id' as never, {} as never);
    expect(result).toEqual(expected);
    expect(dependency.findMembersList).toHaveBeenCalledTimes(1);
    expect(dependency.findMembersList).toHaveBeenCalledWith(expect.anything(), expect.anything());
  });

  it('propagates a downstream failure instead of converting it to a false success', async () => {
    const failure = new Error('dependency failure');
    const dependency = { findMembersList: jest.fn().mockRejectedValue(failure) };
    const service = new MembersFindMemberAttendanceService(dependency as never);
    await expect(service.findMemberAttendance('test-id' as never, {} as never)).rejects.toBe(failure);
    expect(dependency.findMembersList).toHaveBeenCalledTimes(1);
  });
});
