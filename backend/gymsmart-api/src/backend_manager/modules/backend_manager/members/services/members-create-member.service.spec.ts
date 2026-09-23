// RESPONSIBILITY: Owns the backend application co-located unit-test verification.
// FLOW: Arrange isolated inputs → execute target unit → assert observable behavior and failure paths.
import { MembersCreateMemberService } from '@/backend_manager/modules/backend_manager/members/services/members-create-member.service';

describe('MembersCreateMemberService', () => {
  it('returns the dependency result and invokes the intended boundary exactly once', async () => {
    const expected = { marker: 'expected-result' };
    const dependency = { createMembers: jest.fn().mockResolvedValue(expected) };
    const service = new MembersCreateMemberService(dependency as never);
    const result = await service.createMember({} as never);
    expect(result).toEqual(expected);
    expect(dependency.createMembers).toHaveBeenCalledTimes(1);
    expect(dependency.createMembers).toHaveBeenCalledWith(expect.anything());
  });

  it('propagates a downstream failure instead of converting it to a false success', async () => {
    const failure = new Error('dependency failure');
    const dependency = { createMembers: jest.fn().mockRejectedValue(failure) };
    const service = new MembersCreateMemberService(dependency as never);
    await expect(service.createMember({} as never)).rejects.toBe(failure);
    expect(dependency.createMembers).toHaveBeenCalledTimes(1);
  });
});
