// RESPONSIBILITY: Owns the backend application co-located unit-test verification.
// FLOW: Arrange isolated inputs → execute target unit → assert observable behavior and failure paths.
import { MembersFetchMemberByIdService } from '@/backend_manager/modules/backend_manager/members/services/members-fetch-member-by-id.service';

describe('MembersFetchMemberByIdService', () => {
  it('returns the dependency result and invokes the intended boundary exactly once', async () => {
    const expected = { marker: 'expected-result' };
    const dependency = { findMembersByIdOrThrow: jest.fn().mockResolvedValue(expected) };
    const service = new MembersFetchMemberByIdService(dependency as never);
    const result = await service.fetchMemberById('test-id' as never, {} as never);
    expect(result).toEqual(expected);
    expect(dependency.findMembersByIdOrThrow).toHaveBeenCalledTimes(1);
    expect(dependency.findMembersByIdOrThrow).toHaveBeenCalledWith(expect.anything(), expect.anything());
  });

  it('propagates a downstream failure instead of converting it to a false success', async () => {
    const failure = new Error('dependency failure');
    const dependency = { findMembersByIdOrThrow: jest.fn().mockRejectedValue(failure) };
    const service = new MembersFetchMemberByIdService(dependency as never);
    await expect(service.fetchMemberById('test-id' as never, {} as never)).rejects.toBe(failure);
    expect(dependency.findMembersByIdOrThrow).toHaveBeenCalledTimes(1);
  });
});
