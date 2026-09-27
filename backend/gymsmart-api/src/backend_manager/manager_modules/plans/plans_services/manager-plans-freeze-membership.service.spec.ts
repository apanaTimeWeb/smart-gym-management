// RESPONSIBILITY: Owns the backend application co-located unit-test verification.
// FLOW: Arrange isolated inputs → execute target unit → assert observable behavior and failure paths.
import { PlansFreezeMembershipService } from '@/backend_manager/manager_modules/plans/plans_services/manager-plans-freeze-membership.service';

describe('PlansFreezeMembershipService', () => {
  it('returns the dependency result and invokes the intended boundary exactly once', async () => {
    const expected = { marker: 'expected-result' };
    const dependency = { freezeMembership: jest.fn().mockResolvedValue(expected) };
    const service = new PlansFreezeMembershipService(dependency as never);
    const result = await service.freezeMembership({} as never);
    expect(result).toEqual(expected);
    expect(dependency.freezeMembership).toHaveBeenCalledTimes(1);
    expect(dependency.freezeMembership).toHaveBeenCalledWith(expect.anything(), expect.anything());
  });

  it('propagates a downstream failure instead of converting it to a false success', async () => {
    const failure = new Error('dependency failure');
    const dependency = { freezeMembership: jest.fn().mockRejectedValue(failure) };
    const service = new PlansFreezeMembershipService(dependency as never);
    await expect(service.freezeMembership({} as never)).rejects.toBe(failure);
    expect(dependency.freezeMembership).toHaveBeenCalledTimes(1);
  });
});
