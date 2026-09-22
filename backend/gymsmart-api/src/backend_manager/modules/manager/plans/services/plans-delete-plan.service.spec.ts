// RESPONSIBILITY: Co-located behavioral unit proof for PlansDeletePlanService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> PlansDeletePlanService.deletePlan -> observable return/delegation.
import { PlansDeletePlanService } from '@/modules/manager/plans/services/plans-delete-plan.service.ts';

describe('PlansDeletePlanService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'plans' } as const;
    const dependency = { deletePlan: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new PlansDeletePlanService(dependency as never);
    const result = await service.deletePlan({} as never);
    expect(result).toEqual(expected);
    expect((dependency.deletePlan as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
