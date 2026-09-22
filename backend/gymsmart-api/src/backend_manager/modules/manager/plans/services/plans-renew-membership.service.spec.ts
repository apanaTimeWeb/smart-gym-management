// @ts-nocheck
// RESPONSIBILITY: Co-located behavioral unit proof for PlansRenewMembershipService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> PlansRenewMembershipService.renewMembership -> observable return/delegation.
import { PlansRenewMembershipService } from '@/backend_manager/modules/manager/plans/services/plans-renew-membership.service';

describe('PlansRenewMembershipService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'plans' } as const;
    const dependency = { renewMembership: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new PlansRenewMembershipService(dependency as never);
    const result = await service.renewMembership({} as never);
    expect(result).toEqual(expected);
    // @ts-ignore
    expect((dependency.renewMembership as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
