// @ts-nocheck
// RESPONSIBILITY: Co-located behavioral unit proof for PlansFetchPlansService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> PlansFetchPlansService.fetchPlans -> observable return/delegation.
import { PlansFetchPlansService } from '@/backend_manager/modules/manager/plans/services/plans-fetch-plans.service';

describe('PlansFetchPlansService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'plans' } as const;
    const dependency = { fetchPlans: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new PlansFetchPlansService(dependency as never);
    const result = await service.fetchPlans({} as never);
    expect(result).toEqual(expected);
    // @ts-ignore
    expect((dependency.fetchPlans as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
