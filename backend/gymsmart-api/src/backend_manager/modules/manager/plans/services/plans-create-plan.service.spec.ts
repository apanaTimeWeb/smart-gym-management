// RESPONSIBILITY: Co-located behavioral unit proof for PlansCreatePlanService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> PlansCreatePlanService.createPlan -> observable return/delegation.
import { PlansCreatePlanService } from '@/modules/manager/plans/services/plans-create-plan.service.ts';

describe('PlansCreatePlanService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'plans' } as const;
    const dependency = { createPlan: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new PlansCreatePlanService(dependency as never);
    const result = await service.createPlan({} as never);
    expect(result).toEqual(expected);
    expect((dependency.createPlan as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
