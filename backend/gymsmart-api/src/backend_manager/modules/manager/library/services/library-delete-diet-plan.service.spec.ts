// @ts-nocheck
// RESPONSIBILITY: Co-located behavioral unit proof for LibraryDeleteDietPlanService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> LibraryDeleteDietPlanService.deleteDietPlan -> observable return/delegation.
import { LibraryDeleteDietPlanService } from '@/backend_manager/modules/manager/library/services/library-delete-diet-plan.service';

describe('LibraryDeleteDietPlanService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'library' } as const;
    const dependency = { deleteDietPlan: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new LibraryDeleteDietPlanService(dependency as never);
    const result = await service.deleteDietPlan({} as never);
    expect(result).toEqual(expected);
    // @ts-ignore
    expect((dependency.deleteDietPlan as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
