// RESPONSIBILITY: Owns the backend application co-located unit-test verification.
// FLOW: Arrange isolated inputs → execute target unit → assert observable behavior and failure paths.
import { MembersRenewMemberService } from '@/backend_manager/modules/backend_manager/members/services/members-renew-member.service';

describe('MembersRenewMemberService', () => {
  it('returns the dependency result and invokes the intended boundary exactly once', async () => {
    const expected = { marker: 'expected-result' };
    const dependency = { updateMembersById: jest.fn().mockResolvedValue(expected) };
    const service = new MembersRenewMemberService(dependency as never);
    const result = await service.renewMember({} as never, 'test-id' as never);
    expect(result).toEqual(expected);
    expect(dependency.updateMembersById).toHaveBeenCalledTimes(1);
    expect(dependency.updateMembersById).toHaveBeenCalledWith(expect.anything(), expect.anything());
  });

  it('propagates a downstream failure instead of converting it to a false success', async () => {
    const failure = new Error('dependency failure');
    const dependency = { updateMembersById: jest.fn().mockRejectedValue(failure) };
    const service = new MembersRenewMemberService(dependency as never);
    await expect(service.renewMember({} as never, 'test-id' as never)).rejects.toBe(failure);
    expect(dependency.updateMembersById).toHaveBeenCalledTimes(1);
  });
});
