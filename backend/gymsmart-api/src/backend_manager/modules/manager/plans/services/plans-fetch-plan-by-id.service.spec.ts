// @ts-nocheck
// RESPONSIBILITY: Co-located behavioral unit proof for PlansFetchPlanByIdService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> PlansFetchPlanByIdService.fetchPlanById -> observable return/delegation.
import { PlansFetchPlanByIdService } from '@/backend_manager/modules/manager/plans/services/plans-fetch-plan-by-id.service';

describe('PlansFetchPlanByIdService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'plans' } as const;
    const dependency = { fetchPlanById: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new PlansFetchPlanByIdService(dependency as never);
    const result = await service.fetchPlanById({} as never);
    expect(result).toEqual(expected);
    // @ts-ignore
    expect((dependency.fetchPlanById as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
