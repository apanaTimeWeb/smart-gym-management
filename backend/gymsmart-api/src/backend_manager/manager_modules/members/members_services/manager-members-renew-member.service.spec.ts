// RESPONSIBILITY: Owns the backend application co-located unit-test verification.
// FLOW: Arrange isolated inputs → execute target unit → assert observable behavior and failure paths.
import { MembersRenewMemberService } from '@/backend_manager/manager_modules/members/members_services/manager-members-renew-member.service';

describe('MembersRenewMemberService', () => {
  it('returns the dependency result and invokes the intended boundary exactly once', async () => {
    const expected = { marker: 'expected-result' };
    const dependency = { updateMember: jest.fn().mockResolvedValue(expected) };
    const service = new MembersRenewMemberService(dependency as never);
    const result = await service.updateMember({} as never, 'test-id' as never);
    expect(result).toEqual(expected);
    expect(dependency.updateMember).toHaveBeenCalledTimes(1);
    expect(dependency.updateMember).toHaveBeenCalledWith(expect.anything(), expect.anything());
  });

  it('propagates a downstream failure instead of converting it to a false success', async () => {
    const failure = new Error('dependency failure');
    const dependency = { updateMember: jest.fn().mockRejectedValue(failure) };
    const service = new MembersRenewMemberService(dependency as never);
    await expect(service.updateMember({} as never, 'test-id' as never)).rejects.toBe(failure);
    expect(dependency.updateMember).toHaveBeenCalledTimes(1);
  });
});
