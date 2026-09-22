// RESPONSIBILITY: Co-located behavioral unit proof for PlansUpdatePlanService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> PlansUpdatePlanService.updatePlan -> observable return/delegation.
import { PlansUpdatePlanService } from '@/modules/manager/plans/services/plans-update-plan.service.ts';

describe('PlansUpdatePlanService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'plans' } as const;
    const dependency = { updatePlan: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new PlansUpdatePlanService(dependency as never);
    const result = await service.updatePlan({} as never);
    expect(result).toEqual(expected);
    expect((dependency.updatePlan as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
