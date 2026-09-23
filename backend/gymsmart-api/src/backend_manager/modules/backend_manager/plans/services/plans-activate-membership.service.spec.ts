// RESPONSIBILITY: Owns the backend application co-located unit-test verification.
// FLOW: Arrange isolated inputs → execute target unit → assert observable behavior and failure paths.
import { PlansActivateMembershipService } from '@/backend_manager/modules/backend_manager/plans/services/plans-activate-membership.service';

describe('PlansActivateMembershipService', () => {
  it('returns the dependency result and invokes the intended boundary exactly once', async () => {
    const expected = { marker: 'expected-result' };
    const dependency = { createPlans: jest.fn().mockResolvedValue(expected) };
    const service = new PlansActivateMembershipService(dependency as never);
    const result = await service.activateMembership({} as never, 'test-id' as never);
    expect(result).toEqual(expected);
    expect(dependency.createPlans).toHaveBeenCalledTimes(1);
    expect(dependency.createPlans).toHaveBeenCalledWith(expect.anything(), expect.anything());
  });

  it('propagates a downstream failure instead of converting it to a false success', async () => {
    const failure = new Error('dependency failure');
    const dependency = { createPlans: jest.fn().mockRejectedValue(failure) };
    const service = new PlansActivateMembershipService(dependency as never);
    await expect(service.activateMembership({} as never, 'test-id' as never)).rejects.toBe(failure);
    expect(dependency.createPlans).toHaveBeenCalledTimes(1);
  });
});
