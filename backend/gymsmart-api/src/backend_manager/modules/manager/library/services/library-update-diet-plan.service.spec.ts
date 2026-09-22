// @ts-nocheck
// RESPONSIBILITY: Co-located behavioral unit proof for LibraryUpdateDietPlanService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> LibraryUpdateDietPlanService.updateDietPlan -> observable return/delegation.
import { LibraryUpdateDietPlanService } from '@/backend_manager/modules/manager/library/services/library-update-diet-plan.service';

describe('LibraryUpdateDietPlanService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'library' } as const;
    const dependency = { updateDietPlan: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new LibraryUpdateDietPlanService(dependency as never);
    const result = await service.updateDietPlan({} as never);
    expect(result).toEqual(expected);
    // @ts-ignore
    expect((dependency.updateDietPlan as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
