// @ts-nocheck
// RESPONSIBILITY: Co-located behavioral unit proof for PlansActivateMembershipService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> PlansActivateMembershipService.activateMembership -> observable return/delegation.
import { PlansActivateMembershipService } from '@/backend_manager/modules/manager/plans/services/plans-activate-membership.service';

describe('PlansActivateMembershipService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'plans' } as const;
    const dependency = { activateMembership: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new PlansActivateMembershipService(dependency as never);
    const result = await service.activateMembership({} as never);
    expect(result).toEqual(expected);
    // @ts-ignore
    expect((dependency.activateMembership as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
