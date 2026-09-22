// @ts-nocheck
// RESPONSIBILITY: Co-located behavioral unit proof for PlansFreezeMembershipService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> PlansFreezeMembershipService.freezeMembership -> observable return/delegation.
import { PlansFreezeMembershipService } from '@/backend_manager/modules/manager/plans/services/plans-freeze-membership.service';

describe('PlansFreezeMembershipService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'plans' } as const;
    const dependency = { freezeMembership: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new PlansFreezeMembershipService(dependency as never);
    const result = await service.freezeMembership({} as never);
    expect(result).toEqual(expected);
    // @ts-ignore
    expect((dependency.freezeMembership as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
