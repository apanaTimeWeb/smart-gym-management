// RESPONSIBILITY: Owns the backend application co-located unit-test verification.
// FLOW: Arrange isolated inputs → execute target unit → assert observable behavior and failure paths.
import { MembersDeleteMemberService } from '@/backend_manager/modules/backend_manager/members/services/members-delete-member.service';

describe('MembersDeleteMemberService', () => {
  it('returns the dependency result and invokes the intended boundary exactly once', async () => {
    const expected = { marker: 'expected-result' };
    const dependency = { softDeleteMembersById: jest.fn().mockResolvedValue(expected) };
    const service = new MembersDeleteMemberService(dependency as never);
    const result = await service.deleteMember('test-id' as never);
    expect(result).toEqual(expected);
    expect(dependency.softDeleteMembersById).toHaveBeenCalledTimes(1);
    expect(dependency.softDeleteMembersById).toHaveBeenCalledWith(expect.anything());
  });

  it('propagates a downstream failure instead of converting it to a false success', async () => {
    const failure = new Error('dependency failure');
    const dependency = { softDeleteMembersById: jest.fn().mockRejectedValue(failure) };
    const service = new MembersDeleteMemberService(dependency as never);
    await expect(service.deleteMember('test-id' as never)).rejects.toBe(failure);
    expect(dependency.softDeleteMembersById).toHaveBeenCalledTimes(1);
  });
});
