// RESPONSIBILITY: Owns the backend application co-located unit-test verification.
// FLOW: Arrange isolated inputs → execute target unit → assert observable behavior and failure paths.
import { MembersFetchMemberPlansService } from '@/backend_manager/modules/backend_manager/members/services/members-fetch-member-plans.service';

describe('MembersFetchMemberPlansService', () => {
  it('returns the dependency result and invokes the intended boundary exactly once', async () => {
    const expected = { marker: 'expected-result' };
    const dependency = { findMembersList: jest.fn().mockResolvedValue(expected) };
    const service = new MembersFetchMemberPlansService(dependency as never);
    const result = await service.fetchMemberPlans({} as never);
    expect(result).toEqual(expected);
    expect(dependency.findMembersList).toHaveBeenCalledTimes(1);
    expect(dependency.findMembersList).toHaveBeenCalledWith(expect.anything());
  });

  it('propagates a downstream failure instead of converting it to a false success', async () => {
    const failure = new Error('dependency failure');
    const dependency = { findMembersList: jest.fn().mockRejectedValue(failure) };
    const service = new MembersFetchMemberPlansService(dependency as never);
    await expect(service.fetchMemberPlans({} as never)).rejects.toBe(failure);
    expect(dependency.findMembersList).toHaveBeenCalledTimes(1);
  });
});
