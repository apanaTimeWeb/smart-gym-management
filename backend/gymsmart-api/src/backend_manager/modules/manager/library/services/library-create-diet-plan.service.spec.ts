// @ts-nocheck
// RESPONSIBILITY: Co-located behavioral unit proof for LibraryCreateDietPlanService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> LibraryCreateDietPlanService.createDietPlan -> observable return/delegation.
import { LibraryCreateDietPlanService } from '@/backend_manager/modules/manager/library/services/library-create-diet-plan.service';

describe('LibraryCreateDietPlanService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'library' } as const;
    const dependency = { createDietPlan: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new LibraryCreateDietPlanService(dependency as never);
    const result = await service.createDietPlan({} as never);
    expect(result).toEqual(expected);
    // @ts-ignore
    expect((dependency.createDietPlan as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
